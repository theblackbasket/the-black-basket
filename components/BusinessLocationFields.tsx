"use client";

import { useState } from "react";

export default function BusinessLocationFields() {
  const [shoppingType, setShoppingType] = useState("");

  const needsLocation =
    shoppingType === "in_person" || shoppingType === "both";

  return (
    <div className="grid gap-5 rounded-3xl bg-[#F7F0E6] p-5">
      <div>
        <h3 className="mb-1 text-lg font-bold">Location</h3>

        <p className="text-sm text-black/60">
          Tell shoppers how they can buy from or visit this business.
        </p>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-semibold">
          How can customers shop with this business? *
        </span>

        <select
          name="shopping_type"
          required
          value={shoppingType}
          onChange={(event) => setShoppingType(event.target.value)}
          className="rounded-2xl border border-[#E7DCCB] bg-white px-4 py-3 outline-none focus:border-[#e4b32c]"
        >
          <option value="">Select one</option>
          <option value="online">Online only</option>
          <option value="in_person">In person only</option>
          <option value="both">Both online and in person</option>
        </select>
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-semibold">
          City, state{" "}
          {!needsLocation && (
            <span className="font-normal text-black/50">
              (not needed for online-only businesses)
            </span>
          )}
        </span>

        <input
          name="location"
          disabled={!needsLocation}
          required={needsLocation}
          className={`rounded-2xl border border-[#E7DCCB] px-4 py-3 outline-none focus:border-[#e4b32c] ${
            !needsLocation
              ? "cursor-not-allowed bg-black/5 text-black/40"
              : "bg-white"
          }`}
          placeholder={
            needsLocation
              ? "Example: Fairfield, CA"
              : "Select in person or both to add a location"
          }
        />

        <span className="text-xs text-black/50">
          Required for in-person businesses. Online-only businesses can leave
          this blank.
        </span>
      </label>
    </div>
  );
}