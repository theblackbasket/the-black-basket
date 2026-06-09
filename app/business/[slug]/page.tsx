import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase";

export default async function BusinessProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: business, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (error || !business) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFFDF8] px-6 text-[#0B0B0A]">
        <div className="max-w-md rounded-3xl border border-[#E7DCCB] bg-white p-10 text-center">
          <h1 className="mb-3 text-3xl font-bold">Business not found</h1>

          <p className="mb-6 text-black/60">
            This business may not exist, or it may not be approved yet.
          </p>

          <a
            href="/search"
            className="inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Search
          </a>
        </div>
      </main>
    );
  }

  const businessBasics = [
    business.small_business && "🌱 Small Business",
    business.online && "🛍️ Online Store",
    business.physical_store && "🏬 Physical Storefront",
    business.women_owned && "Women-owned",
    business.family_owned && "Family-owned",
    business.handmade && "Handmade",
    business.vegan && "Vegan",
    business.cruelty_free && "Cruelty-free",
    business.eco_friendly && "Eco-friendly",
    business.lgbtq_inclusive && "LGBTQ+ owned",
    business.faith_based && "Faith-based",
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-[#FFFDF8] text-[#0B0B0A]">
      <header className="border-b border-[#E7DCCB] bg-[#0B0B0A] px-6 py-5 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <Logo />
          </a>

          <a href="/search" className="text-sm">
            Search
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <a href="/search" className="mb-8 inline-block text-sm text-black/60">
          ← Back to results
        </a>

        <div className="overflow-hidden rounded-[2rem] border border-[#E7DCCB] bg-white shadow-sm">
          {business.cover_image_url ? (
  <img
    src={business.cover_image_url}
    alt={`${business.business_name} cover image`}
    className="h-48 w-full object-cover"
  />
) : (
  <div className="h-48 bg-[#0B0B0A]"></div>
)}

          <div className="p-8">
          <div className="-mt-24 mb-6 flex h-36 w-36 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-[#F7F0E6] text-center text-3xl font-bold text-[#4A2A13] shadow-sm">
  {business.logo_url ? (
    <img
      src={business.logo_url}
      alt={`${business.business_name} logo`}
      className="h-full w-full object-cover"
    />
  ) : (
    business.business_name.split(" ")[0]
  )}
</div>

            <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h1 className="line-clamp-2 max-w-3xl text-4xl font-bold">
                    {business.business_name}
                  </h1>

                  {business.verified_black_owned && (
                    <span className="rounded-full bg-[#F7F0E6] px-3 py-1 text-sm font-semibold text-[#4A2A13]">
                      ✓ Verified Black-Owned
                    </span>
                  )}
                </div>

                <p className="mb-3 text-lg font-medium">
                  {business.category}
                </p>

                <p className="mb-4 max-w-2xl text-black/70">
                  {business.description}
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-black/60">
                  <span>📍 {business.location || "Online"}</span>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-3">
                <button className="rounded-full border border-[#E7DCCB] px-5 py-3">
                  ♡ Save
                </button>

                {business.website ? (
                  <a
                    href={business.website}
                    target="_blank"
                    className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
                  >
                    Visit Website
                  </a>
                ) : (
                  <button className="rounded-full bg-black/40 px-6 py-3 text-sm font-semibold text-white">
                    No Website Listed
                  </button>
                )}
              </div>
            </div>

            <div className="mb-8 rounded-3xl bg-[#F7F0E6] p-6">
              <h2 className="mb-3 text-2xl font-bold">About</h2>

              <p className="max-w-3xl text-black/70">
                {business.description}
              </p>
            </div>

            {businessBasics.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">Business basics</h2>

                <div className="flex flex-wrap gap-3">
                  {businessBasics.map((badge) => (
                    <span
                      key={badge as string}
                      className="rounded-full bg-[#F7F0E6] px-4 py-2 text-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {business.tags && business.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">What they sell</h2>

                <div className="flex flex-wrap gap-3">
                  {business.tags.map((tag: string) => (
                    <a
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="rounded-full bg-[#F7F0E6] px-4 py-2 text-sm transition hover:bg-[#E7DCCB]"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-3xl border border-[#E7DCCB] p-6">
              <h2 className="mb-3 text-2xl font-bold">Verification</h2>

              {business.verified_black_owned ? (
                <p className="text-black/70">
                  This business has been reviewed and marked as Verified
                  Black-Owned by The Black Basket.
                </p>
              ) : (
                <p className="text-black/70">
                  This business is approved for the directory, but the
                  Black-owned verification badge has not been added yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
