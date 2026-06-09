"use client";

import { useEffect, useState } from "react";

export default function BusinessImagePreview() {
  const [logoPreview, setLogoPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const logoInput = document.querySelector<HTMLInputElement>(
      'input[name="logo_image"]'
    );
    const coverInput = document.querySelector<HTMLInputElement>(
      'input[name="cover_image"]'
    );
    const nameInput = document.querySelector<HTMLInputElement>(
      'input[name="business_name"]'
    );
    const categoryInput = document.querySelector<HTMLSelectElement>(
      'select[name="category"]'
    );
    const locationInput = document.querySelector<HTMLInputElement>(
      'input[name="location"]'
    );
    const descriptionInput = document.querySelector<HTMLTextAreaElement>(
      'textarea[name="description"]'
    );

    function updateLogo() {
      const file = logoInput?.files?.[0];
      setLogoPreview(file ? URL.createObjectURL(file) : "");
    }

    function updateCover() {
      const file = coverInput?.files?.[0];
      setCoverPreview(file ? URL.createObjectURL(file) : "");
    }

    function updateText() {
      setBusinessName(nameInput?.value || "");
      setCategory(categoryInput?.value || "");
      setLocation(locationInput?.value || "");
      setDescription(descriptionInput?.value || "");
    }

    logoInput?.addEventListener("change", updateLogo);
    coverInput?.addEventListener("change", updateCover);
    nameInput?.addEventListener("input", updateText);
    categoryInput?.addEventListener("change", updateText);
    locationInput?.addEventListener("input", updateText);
    descriptionInput?.addEventListener("input", updateText);

    updateText();

    return () => {
      logoInput?.removeEventListener("change", updateLogo);
      coverInput?.removeEventListener("change", updateCover);
      nameInput?.removeEventListener("input", updateText);
      categoryInput?.removeEventListener("change", updateText);
      locationInput?.removeEventListener("input", updateText);
      descriptionInput?.removeEventListener("input", updateText);
    };
  }, []);

  return (
    <div className="mt-6 rounded-3xl border border-[#E7DCCB] bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#e4b32c]">
          Mock profile preview
        </p>

        <p className="text-sm text-black/60">
          This shows how the business images and profile details may appear.
        </p>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-[#E7DCCB] bg-white">
        {coverPreview ? (
          <img
            src={coverPreview}
            alt="Cover preview"
            className="h-44 w-full object-cover"
          />
        ) : (
          <div className="flex h-44 w-full items-center justify-center bg-[#0B0B0A] text-sm text-white/50">
            Cover image preview
          </div>
        )}

        <div className="p-5">
          <div className="-mt-16 mb-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-[#F7F0E6] text-center text-base font-bold text-[#4A2A13] shadow-sm">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo preview"
                className="h-full w-full object-cover"
              />
            ) : (
              "Logo"
            )}
          </div>

          <h4 className="mb-2 break-words text-2xl font-bold">
            {businessName || "Business Name"}
          </h4>

          <p className="mb-4 text-sm text-black/60">
            {category || "Category"} • {location || "Location or Online"}
          </p>

          <p className="mb-5 line-clamp-4 text-sm leading-6 text-black/70">
            {description ||
              "Your business description will appear here on the public profile."}
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#F7F0E6] px-3 py-1 text-xs">
              Online Store
            </span>

            <span className="rounded-full bg-[#F7F0E6] px-3 py-1 text-xs">
              Small Business
            </span>

            <span className="rounded-full bg-[#F7F0E6] px-3 py-1 text-xs">
              Verified Black-Owned
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-black/50">
        This is only a sample preview. Final listings may look slightly
        different after review.
      </p>
    </div>
  );
}

