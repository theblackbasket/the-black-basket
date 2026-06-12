"use client";

import { ChangeEvent, useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_TOTAL_SIZE = 10 * 1024 * 1024;

export default function BusinessImageFields() {
  const [logoSize, setLogoSize] = useState(0);
  const [coverSize, setCoverSize] = useState(0);
  const [logoError, setLogoError] = useState("");
  const [coverError, setCoverError] = useState("");
  const [totalError, setTotalError] = useState("");

  function validateFile(
    event: ChangeEvent<HTMLInputElement>,
    type: "logo" | "cover"
  ) {
    const input = event.target;
    const file = input.files?.[0];

    if (!file) {
      if (type === "logo") {
        setLogoSize(0);
        setLogoError("");
      } else {
        setCoverSize(0);
        setCoverError("");
      }

      setTotalError("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      input.value = "";

      if (type === "logo") {
        setLogoSize(0);
        setLogoError("Please choose an image file.");
      } else {
        setCoverSize(0);
        setCoverError("Please choose an image file.");
      }

      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      input.value = "";

      if (type === "logo") {
        setLogoSize(0);
        setLogoError("Logo image is too large. Please choose an image under 5MB.");
      } else {
        setCoverSize(0);
        setCoverError(
          "Cover image is too large. Please choose an image under 5MB."
        );
      }

      return;
    }

    const nextLogoSize = type === "logo" ? file.size : logoSize;
    const nextCoverSize = type === "cover" ? file.size : coverSize;
    const combinedSize = nextLogoSize + nextCoverSize;

    if (combinedSize > MAX_TOTAL_SIZE) {
      input.value = "";
      setTotalError(
        "The logo and cover image are too large together. Please choose smaller images."
      );

      if (type === "logo") {
        setLogoSize(0);
      } else {
        setCoverSize(0);
      }

      return;
    }

    setTotalError("");

    if (type === "logo") {
      setLogoSize(file.size);
      setLogoError("");
    } else {
      setCoverSize(file.size);
      setCoverError("");
    }
  }

  return (
    <div className="mb-6 grid gap-4 rounded-3xl bg-[#F7F0E6] p-5">
      <div>
        <h3 className="mb-1 text-lg font-bold">Business images</h3>

        <p className="text-sm text-black/60">
          Optional, but recommended. These help your listing look more complete.
        </p>
      </div>

      {totalError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {totalError}
        </div>
      )}

      <label className="grid gap-2">
        <span className="text-sm font-semibold">
          Logo image{" "}
          <span className="font-normal text-black/50">(optional)</span>
        </span>

        <input
          name="logo_image"
          type="file"
          accept="image/*"
          onChange={(event) => validateFile(event, "logo")}
          className="rounded-2xl border border-[#E7DCCB] bg-white px-4 py-3 text-sm outline-none focus:border-[#e4b32c]"
        />

        <span className="text-xs text-black/50">
          Square image recommended, like 800 × 800. Max 5MB.
        </span>

        {logoError && (
          <span className="text-sm font-semibold text-red-700">
            {logoError}
          </span>
        )}
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-semibold">
          Cover image{" "}
          <span className="font-normal text-black/50">(optional)</span>
        </span>

        <input
          name="cover_image"
          type="file"
          accept="image/*"
          onChange={(event) => validateFile(event, "cover")}
          className="rounded-2xl border border-[#E7DCCB] bg-white px-4 py-3 text-sm outline-none focus:border-[#e4b32c]"
        />

        <span className="text-xs text-black/50">
          Wide banner image recommended, like 1600 × 600. Max 5MB.
        </span>

        {coverError && (
          <span className="text-sm font-semibold text-red-700">
            {coverError}
          </span>
        )}
      </label>
    </div>
  );
}