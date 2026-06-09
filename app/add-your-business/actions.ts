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

  const online = formData.get("online") === "on";
  const physicalStore = formData.get("physical_store") === "on";
  const smallBusiness = formData.get("small_business") === "on";

  const blackOwnedConfirmation =
    formData.get("black_owned_confirmation") === "on";

  const submissionAgreement =
    formData.get("submission_agreement") === "on";

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
    throw new Error(
      "Business name, owner name, owner email, category, and description are required."
    );
  }

  if (!location && !online) {
    throw new Error(
      "Please add a location, service area, or mark the business as having an online store."
    );
  }

  if (!blackOwnedConfirmation) {
    throw new Error(
      "You must confirm that this business is majority Black-owned."
    );
  }

  if (!submissionAgreement) {
    throw new Error(
      "You must agree to the Submission Guidelines before submitting."
    );
  }

  const logoUrl = await uploadBusinessImage({
    file: logoFile,
    slug,
    type: "logo",
  });

  const coverImageUrl = await uploadBusinessImage({
    file: coverFile,
    slug,
    type: "cover",
  });

  const { error } = await supabase.from("businesses").insert({
    business_name: businessName,
    slug,
    owner_name: ownerName,
    owner_email: ownerEmail,
    website,
    instagram,
    category,
    location,
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
    throw new Error(error.message);
  }

  redirect("/add-your-business/thank-you");
}