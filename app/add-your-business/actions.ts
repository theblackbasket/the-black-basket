"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getFileExtension(file: File) {
  const nameParts = file.name.split(".");
  return nameParts.length > 1 ? nameParts.pop() : "png";
}

function returnToFormWithError(message: string) {
  redirect(`/add-your-business?error=${encodeURIComponent(message)}`);
}

async function geocodeServiceArea(serviceArea: string) {
  const token = process.env.MAPBOX_ACCESS_TOKEN;

  if (!token) {
    throw new Error("Missing MAPBOX_ACCESS_TOKEN.");
  }

  const cleanedServiceArea = serviceArea.toLowerCase().trim();

  const url = new URL(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      serviceArea
    )}.json`
  );

  url.searchParams.set("access_token", token);
  url.searchParams.set("country", "us");
  url.searchParams.set("limit", "1");
  url.searchParams.set("types", "place,postcode,locality,address");
  url.searchParams.set("autocomplete", "false");
  url.searchParams.set("fuzzyMatch", "false");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Could not check this service area. Please try again.");
  }

  const data = await response.json();
  const result = data.features?.[0];

  if (!result || !Array.isArray(result.center)) {
    throw new Error(
      "We could not find that service area. Please enter a real city, state, or ZIP code."
    );
  }

  const relevance = typeof result.relevance === "number" ? result.relevance : 0;
  const placeType = Array.isArray(result.place_type) ? result.place_type : [];
  const placeName = String(result.place_name || "").toLowerCase();
  const resultText = String(result.text || "").toLowerCase();

  const acceptableTypes = ["place", "postcode", "locality", "address"];

  const hasAcceptableType = placeType.some((type: string) =>
    acceptableTypes.includes(type)
  );

  const contextText = Array.isArray(result.context)
    ? result.context
        .map((item: { text?: string; short_code?: string }) =>
          `${item.text || ""} ${item.short_code || ""}`.toLowerCase()
        )
        .join(" ")
    : "";

  const isInUnitedStates =
    placeName.includes("united states") ||
    contextText.includes("united states") ||
    contextText.includes("us");

  const typedWords = cleanedServiceArea
    .split(/[\s,]+/)
    .map((word) => word.trim())
    .filter((word) => word.length >= 2);

  const matchedTypedWords = typedWords.filter(
    (word) =>
      placeName.includes(word) ||
      resultText.includes(word) ||
      contextText.includes(word)
  );

  const enoughTypedWordsMatched =
    typedWords.length <= 1
      ? matchedTypedWords.length === typedWords.length
      : matchedTypedWords.length >= Math.ceil(typedWords.length / 2);

  if (
    relevance < 0.85 ||
    !hasAcceptableType ||
    !isInUnitedStates ||
    !enoughTypedWordsMatched
  ) {
    throw new Error(
      "We could not confidently verify that service area. Please enter a real city/state or ZIP code, like Fairfield, CA or 94533."
    );
  }

  const [longitude, latitude] = result.center;

  return {
    latitude,
    longitude,
    geocodedAddress: result.place_name || serviceArea,
  };
}

async function uploadBusinessImage({
  file,
  slug,
  type,
}: {
  file: File | null;
  slug: string;
  type: "logo" | "cover";
}) {
  if (!file || file.size === 0) {
    return "";
  }

  const maxSize = 5 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error("Images must be 5MB or smaller.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }

  const extension = getFileExtension(file);
  const filePath = `${slug}/${type}-${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("business-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage
    .from("business-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function submitBusiness(formData: FormData) {
  const businessName = formData.get("business_name")?.toString().trim() || "";
  const ownerName = formData.get("owner_name")?.toString().trim() || "";
  const ownerEmail = formData.get("owner_email")?.toString().trim() || "";
  const website = formData.get("website")?.toString().trim() || "";
  const instagram = formData.get("instagram")?.toString().trim() || "";
  const category = formData.get("category")?.toString().trim() || "";
  const location = formData.get("location")?.toString().trim() || "";
  const description = formData.get("description")?.toString().trim() || "";
  const keywords = formData.get("tags")?.toString().trim() || "";

  const verificationNotes =
    formData.get("verification_notes")?.toString().trim() || "";
  const verificationLink =
    formData.get("verification_link")?.toString().trim() || "";

const shoppingType = formData.get("shopping_type")?.toString() || "";

const online = shoppingType === "online" || shoppingType === "both";
const physicalStore = shoppingType === "in_person" || shoppingType === "both";

const smallBusiness = formData.get("small_business") === "on";

  const blackOwnedConfirmation =
    formData.get("black_owned_confirmation") === "on";

  const submissionAgreement = formData.get("submission_agreement") === "on";

  const womenOwned = formData.get("women_owned") === "on";
  const familyOwned = formData.get("family_owned") === "on";
  const vegan = formData.get("vegan") === "on";
  const handmade = formData.get("handmade") === "on";
  const ecoFriendly = formData.get("eco_friendly") === "on";
  const crueltyFree = formData.get("cruelty_free") === "on";
  const lgbtqInclusive = formData.get("lgbtq_inclusive") === "on";
  const faithBased = formData.get("faith_based") === "on";

  const logoFile = formData.get("logo_image") as File | null;
  const coverFile = formData.get("cover_image") as File | null;

  const tags = keywords
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const baseSlug = createSlug(businessName);
  const slug = `${baseSlug}-${Date.now()}`;

  if (!businessName || !ownerName || !ownerEmail || !category || !description) {
    returnToFormWithError(
      "Business name, owner name, owner email, category, and description are required."
    );
  }

 if (!shoppingType) {
  returnToFormWithError(
    "Please select whether this business is online only, in person only, or both."
  );
}

  if (physicalStore && !location) {
    returnToFormWithError(
      "Please add a real service area for in-person businesses, such as city, state, or ZIP code."
    );
  }

  if (!blackOwnedConfirmation) {
    returnToFormWithError(
      "You must confirm that this business is majority Black-owned."
    );
  }

  if (!submissionAgreement) {
    returnToFormWithError(
      "You must agree to the Submission Guidelines before submitting."
    );
  }

  let latitude = null;
  let longitude = null;
  let geocodedAddress = "";
  let geocodingStatus = "not_needed";

  if (physicalStore) {
    try {
      const geocoded = await geocodeServiceArea(location);

      latitude = geocoded.latitude;
      longitude = geocoded.longitude;
      geocodedAddress = geocoded.geocodedAddress;
      geocodingStatus = "geocoded";
    } catch {
      returnToFormWithError(
        "That location could not be verified. Please enter a real city/state or ZIP code, like Fairfield, CA or 94533."
      );
    }
  }

  let logoUrl = "";
  let coverImageUrl = "";

  try {
    logoUrl = await uploadBusinessImage({
      file: logoFile,
      slug,
      type: "logo",
    });

    coverImageUrl = await uploadBusinessImage({
      file: coverFile,
      slug,
      type: "cover",
    });
  } catch {
    returnToFormWithError(
      "There was a problem uploading your images. Please make sure they are image files under 5MB."
    );
  }

  const { error } = await supabase.from("businesses").insert({
    business_name: businessName,
    slug,
    owner_name: ownerName,
    owner_email: ownerEmail,
    website,
    instagram,
    category,

    location: location || "Online",
    service_area: location || "Online",
    latitude,
    longitude,
    geocoded_address: geocodedAddress,
    geocoding_status: geocodingStatus,

    description,
    tags,

    online,
    physical_store: physicalStore,
    small_business: smallBusiness,
    black_owned_confirmation: blackOwnedConfirmation,

    women_owned: womenOwned,
    family_owned: familyOwned,
    vegan,
    handmade,
    eco_friendly: ecoFriendly,
    cruelty_free: crueltyFree,
    lgbtq_inclusive: lgbtqInclusive,
    faith_based: faithBased,

    logo_url: logoUrl,
    cover_image_url: coverImageUrl,

    verification_notes: verificationNotes,
    verification_link: verificationLink,
    status: "pending",
  });

  if (error) {
    returnToFormWithError(
      "There was a problem saving this submission. Please try again."
    );
  }

  redirect("/add-your-business/thank-you");
}