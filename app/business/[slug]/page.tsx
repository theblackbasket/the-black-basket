import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
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
    business.physical_store && "🏬 In-person",
    business.women_owned && "Women-owned",
    business.family_owned && "Family-owned",
    business.handmade && "Handmade",
    business.vegan && "Vegan",
    business.cruelty_free && "Cruelty-free",
    business.eco_friendly && "Eco-friendly",
    business.lgbtq_inclusive && "LGBTQ+ owned",
    business.faith_based && "Faith-based",
  ].filter(Boolean);

  const businessTags = Array.isArray(business.tags) ? business.tags : [];

  const claimSubject = encodeURIComponent(
    `Claim This Business - ${business.business_name}`
  );

  const claimBody = encodeURIComponent(
    `Hi The Black Basket,

I own or represent ${business.business_name} and would like to claim or update this listing.

Business name: ${business.business_name}
Listing slug: ${business.slug}

My name:
My role:
Best contact email:
What I want updated:
`
  );

  return (
    <main className="min-h-screen bg-[#FFFDF8] text-[#0B0B0A]">
      <header className="border-b border-[#E7DCCB] bg-[#0B0B0A] px-6 py-5 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <Logo />
          </a>

          <nav className="hidden gap-8 text-sm md:flex">
            <a href="/" className="hover:text-[#e4b32c]">
              Home
            </a>

            <a href="/search" className="hover:text-[#e4b32c]">
              Search
            </a>

            <a href="/about" className="hover:text-[#e4b32c]">
              About
            </a>

            <a href="/blog" className="hover:text-[#e4b32c]">
              Blog
            </a>

            <a href="/add-your-business" className="hover:text-[#e4b32c]">
              Add Your Business
            </a>

            <a href="/contact" className="hover:text-[#e4b32c]">
              Contact
            </a>
          </nav>
        </div>

        <nav className="mx-auto mt-4 flex max-w-6xl flex-wrap gap-4 text-sm md:hidden">
          <a href="/" className="hover:text-[#e4b32c]">
            Home
          </a>

          <a href="/search" className="hover:text-[#e4b32c]">
            Search
          </a>

          <a href="/about" className="hover:text-[#e4b32c]">
            About
          </a>

          <a href="/blog" className="hover:text-[#e4b32c]">
            Blog
          </a>

          <a href="/add-your-business" className="hover:text-[#e4b32c]">
            Add Business
          </a>

          <a href="/contact" className="hover:text-[#e4b32c]">
            Contact
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <a href="/search" className="mb-8 inline-block text-sm text-black/60">
          ← Back to results
        </a>

        <article className="overflow-hidden rounded-[2rem] border border-[#E7DCCB] bg-white shadow-sm">
          {business.cover_image_url ? (
            <img
              src={business.cover_image_url}
              alt={`${business.business_name} cover image`}
              className="h-48 w-full object-cover md:h-64"
            />
          ) : (
            <div className="h-48 bg-[#0B0B0A] md:h-64" />
          )}

          <div className="p-6 md:p-8">
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
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h1 className="max-w-3xl break-words text-4xl font-bold">
                    {business.business_name}
                  </h1>

                  {business.verified_black_owned && (
                    <span className="rounded-full bg-[#F7F0E6] px-3 py-1 text-sm font-semibold text-[#4A2A13]">
                      ✓ Verified Black-Owned
                    </span>
                  )}
                </div>

                <p className="mb-3 text-lg font-medium text-black/80">
                  {business.category} • {business.location || "Online"}
                </p>

                {business.owner_name && (
                  <p className="text-sm text-black/60">
                    Owner:{" "}
                    {business.verification_link ? (
                      <a
                        href={business.verification_link}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-[#e4b32c] underline-offset-4 hover:underline"
                      >
                        {business.owner_name}
                      </a>
                    ) : (
                      <span className="font-semibold text-black">
                        {business.owner_name}
                      </span>
                    )}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 flex-wrap gap-3">
                <button className="rounded-full border border-[#E7DCCB] px-5 py-3">
                  ♡ Save
                </button>

                {business.website ? (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noreferrer"
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

            <section className="mb-8 rounded-3xl bg-[#F7F0E6] p-6">
              <h2 className="mb-3 text-2xl font-bold">Description</h2>

              <p className="max-w-3xl leading-7 text-black/70">
                {business.description}
              </p>
            </section>

            {businessBasics.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">Basics</h2>

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
              </section>
            )}

            <section className="mb-8 rounded-3xl border border-[#E7DCCB] p-6">
              <h2 className="mb-3 text-2xl font-bold">Product Listing</h2>

              <p className="mb-4 text-black/70">
                Product and service listings will be added here soon. For now,
                visit the business website or social media to shop, book, or
                learn more.
              </p>

              <div className="flex flex-wrap gap-3">
                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"
                  >
                    Shop or Book
                  </a>
                )}

                {business.instagram && (
                  <a
                    href={
                      business.instagram.startsWith("http")
                        ? business.instagram
                        : `https://www.instagram.com/${business.instagram.replace(
                            "@",
                            ""
                          )}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[#E7DCCB] px-5 py-3 text-sm font-semibold"
                  >
                    View Social
                  </a>
                )}
              </div>
            </section>

            {businessTags.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">Business Tags</h2>

                <div className="flex flex-wrap gap-3">
                  {businessTags.map((tag: string) => (
                    <a
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="rounded-full bg-[#F7F0E6] px-4 py-2 text-sm transition hover:bg-[#E7DCCB]"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-3xl border border-[#E7DCCB] p-6">
              <h2 className="mb-3 text-2xl font-bold">
                Verification + Claim This Business
              </h2>

              {business.verified_black_owned ? (
                <p className="mb-4 text-black/70">
                  This business has been reviewed and marked as Verified
                  Black-Owned by The Black Basket.
                </p>
              ) : (
                <p className="mb-4 text-black/70">
                  This business is approved for the directory, but the
                  Verified Black-Owned badge has not been added yet.
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                {business.verification_link && (
                  <a
                    href={business.verification_link}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[#E7DCCB] px-5 py-3 text-sm font-semibold hover:border-[#e4b32c] hover:text-[#e4b32c]"
                  >
                    View Verification Source
                  </a>
                )}

                <a
                  href={`mailto:theblackbasket619@gmail.com?subject=${claimSubject}&body=${claimBody}`}
                  className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"
                >
                  Claim This Business
                </a>
              </div>
            </section>
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}