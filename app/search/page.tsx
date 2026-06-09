import type { ReactNode } from "react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type SearchParams = {
  q?: string;
  online?: string;
  physical?: string;
  small?: string;
  women?: string;
  family?: string;
  handmade?: string;
  vegan?: string;
  crueltyFree?: string;
  ecoFriendly?: string;
  lgbtq?: string;
  faith?: string;
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const query = params.q || "everything";

  const filters = {
    online: params.online === "true",
    physical: params.physical === "true",
    small: params.small === "true",
    women: params.women === "true",
    family: params.family === "true",
    handmade: params.handmade === "true",
    vegan: params.vegan === "true",
    crueltyFree: params.crueltyFree === "true",
    ecoFriendly: params.ecoFriendly === "true",
    lgbtq: params.lgbtq === "true",
    faith: params.faith === "true",
  };

  let supabaseQuery = supabase
    .from("businesses")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (filters.online) supabaseQuery = supabaseQuery.eq("online", true);
  if (filters.physical) supabaseQuery = supabaseQuery.eq("physical_store", true);
  if (filters.small) supabaseQuery = supabaseQuery.eq("small_business", true);
  if (filters.women) supabaseQuery = supabaseQuery.eq("women_owned", true);
  if (filters.family) supabaseQuery = supabaseQuery.eq("family_owned", true);
  if (filters.handmade) supabaseQuery = supabaseQuery.eq("handmade", true);
  if (filters.vegan) supabaseQuery = supabaseQuery.eq("vegan", true);
  if (filters.crueltyFree) supabaseQuery = supabaseQuery.eq("cruelty_free", true);
  if (filters.ecoFriendly) supabaseQuery = supabaseQuery.eq("eco_friendly", true);
  if (filters.lgbtq) supabaseQuery = supabaseQuery.eq("lgbtq_inclusive", true);
  if (filters.faith) supabaseQuery = supabaseQuery.eq("faith_based", true);

  const { data: businesses, error } = await supabaseQuery;

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFFDF8] px-6 text-[#0B0B0A]">
        <div className="max-w-lg rounded-3xl border border-[#E7DCCB] bg-white p-8 text-center">
          <h1 className="mb-3 text-3xl font-bold">Something went wrong</h1>
          <p className="text-black/60">{error.message}</p>
        </div>
      </main>
    );
  }

 function getSearchVariations(term: string) {
  const cleaned = term.toLowerCase().trim();

  const variations = new Set<string>();
  variations.add(cleaned);

  if (cleaned.endsWith("s")) {
    variations.add(cleaned.slice(0, -1));
  } else {
    variations.add(`${cleaned}s`);
  }

  if (cleaned.endsWith("ies")) {
    variations.add(`${cleaned.slice(0, -3)}y`);
  } else if (cleaned.endsWith("y")) {
    variations.add(`${cleaned.slice(0, -1)}ies`);
  }

  return Array.from(variations).filter(Boolean);
}

const searchTerms = getSearchVariations(query);

const visibleBusinesses = (businesses || []).filter((business) => {
  if (query === "everything") {
    return true;
  }

  const searchableText = [
    business.business_name,
    business.category,
    business.description,
    business.location,
    ...(business.tags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchTerms.some((term) => searchableText.includes(term));
});

  function makeFilterLink(key: keyof SearchParams) {
    const urlParams = new URLSearchParams();

    if (query !== "everything") {
      urlParams.set("q", query);
    }

    for (const [filterKey, active] of Object.entries(params)) {
      if (filterKey !== key && active === "true") {
        urlParams.set(filterKey, "true");
      }
    }

    if (params[key] !== "true") {
      urlParams.set(key, "true");
    }

    const queryString = urlParams.toString();
    return queryString ? `/search?${queryString}` : "/search";
  }

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <main className="min-h-screen bg-[#FFFDF8] text-[#0B0B0A]">
      <header className="border-b border-[#E7DCCB] bg-[#0B0B0A] px-6 py-5 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <Logo />
          </a>

          <form
            action="/search"
            className="hidden flex-1 overflow-hidden rounded-full bg-white p-2 md:flex"
          >
            <input
              name="q"
              className="flex-1 px-5 text-black outline-none"
              placeholder="What are you looking for?"
              defaultValue={query === "everything" ? "" : query}
            />

            <button className="rounded-full bg-[#C6922E] px-5 py-2 font-semibold text-white">
              Search
            </button>
          </form>

          <a href="/add-your-business" className="shrink-0 text-sm">
            Add Business
          </a>
        </div>

        <nav className="mx-auto mt-4 flex max-w-6xl flex-wrap gap-4 text-sm md:hidden">
          <a href="/" className="hover:text-[#C6922E]">
            Home
          </a>

          <a href="/search" className="text-[#C6922E]">
            Search
          </a>

          <a href="/about" className="hover:text-[#C6922E]">
            About
          </a>

          <a href="/add-your-business" className="hover:text-[#C6922E]">
            Add Business
          </a>

          <a href="/contact" className="hover:text-[#C6922E]">
            Contact
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <form
          action="/search"
          className="mb-6 flex overflow-hidden rounded-full border border-[#E7DCCB] bg-white p-2 md:hidden"
        >
          <input
            name="q"
            className="min-w-0 flex-1 px-4 text-black outline-none"
            placeholder="Search..."
            defaultValue={query === "everything" ? "" : query}
          />

          <button className="rounded-full bg-[#C6922E] px-4 py-2 text-sm font-semibold text-white">
            Go
          </button>
        </form>

        <h1 className="mb-2 break-words text-4xl font-bold">
          Results for “{query === "everything" ? "all businesses" : query}”
        </h1>

        <p className="mb-6 text-sm text-black/60">
          {visibleBusinesses.length} result
          {visibleBusinesses.length === 1 ? "" : "s"}
        </p>

        <div className="mb-8 rounded-[2rem] border border-[#E7DCCB] bg-white p-5">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">Refine results</h2>
              <p className="text-sm text-black/60">
                Filter by shopping type and business basics.
              </p>
            </div>

            {hasActiveFilters && (
              <a
                href={
                  query === "everything"
                    ? "/search"
                    : `/search?q=${encodeURIComponent(query)}`
                }
                className="w-fit rounded-full border border-[#E7DCCB] px-4 py-2 text-sm"
              >
                Clear filters
              </a>
            )}
          </div>

          <div className="mb-4">
            <p className="mb-3 text-sm font-semibold">Shopping type</p>

            <div className="flex flex-wrap gap-3">
              <FilterChip active={filters.online} href={makeFilterLink("online")}>
                Online Store
              </FilterChip>

              <FilterChip active={filters.physical} href={makeFilterLink("physical")}>
                Storefront
              </FilterChip>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold">Business basics</p>

            <div className="flex flex-wrap gap-3">
              <FilterChip active={filters.small} href={makeFilterLink("small")}>
                Small Business
              </FilterChip>

              <FilterChip active={filters.women} href={makeFilterLink("women")}>
                Women-owned
              </FilterChip>

              <FilterChip active={filters.family} href={makeFilterLink("family")}>
                Family-owned
              </FilterChip>

              <FilterChip active={filters.handmade} href={makeFilterLink("handmade")}>
                Handmade
              </FilterChip>

              <FilterChip active={filters.vegan} href={makeFilterLink("vegan")}>
                Vegan
              </FilterChip>

              <FilterChip
                active={filters.crueltyFree}
                href={makeFilterLink("crueltyFree")}
              >
                Cruelty-free
              </FilterChip>

              <FilterChip
                active={filters.ecoFriendly}
                href={makeFilterLink("ecoFriendly")}
              >
                Eco-friendly
              </FilterChip>

              <FilterChip active={filters.lgbtq} href={makeFilterLink("lgbtq")}>
                LGBTQ+ Owned
              </FilterChip>

              <FilterChip active={filters.faith} href={makeFilterLink("faith")}>
                Faith-based
              </FilterChip>
            </div>
          </div>
        </div>

        {visibleBusinesses.length > 0 ? (
          <div className="space-y-6">
            {visibleBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                name={business.business_name}
                slug={business.slug}
                logoUrl={business.logo_url}
                category={business.category}
                description={business.description}
                location={business.location || "Online"}
                online={business.online}
                physicalStore={business.physical_store}
                smallBusiness={business.small_business}
                womenOwned={business.women_owned}
                familyOwned={business.family_owned}
                handmade={business.handmade}
                vegan={business.vegan}
                crueltyFree={business.cruelty_free}
                ecoFriendly={business.eco_friendly}
                lgbtqOwned={business.lgbtq_inclusive}
                faithBased={business.faith_based}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#E7DCCB] bg-white p-10 text-center">
            <h2 className="mb-2 text-2xl font-bold">
              No matches in the basket yet
            </h2>

            <p className="text-black/60">
              Try another search, remove a filter, or check back as more
              Black-owned businesses are added.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

function FilterChip({
  active,
  href,
  children,
}: {
  active: boolean;
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={`rounded-full px-5 py-2 text-sm ${
        active ? "bg-black text-white" : "bg-[#F7F0E6] text-black"
      }`}
    >
      {active ? "✓ " : ""}
      {children}
    </a>
  );
}

function BusinessCard({
  name,
  slug,
  logoUrl,
  category,
  description,
  location,
  online,
  physicalStore,
  smallBusiness,
  womenOwned,
  familyOwned,
  handmade,
  vegan,
  crueltyFree,
  ecoFriendly,
  lgbtqOwned,
  faithBased,
}: {
  name: string;
  slug: string;
  logoUrl: string | null;
  category: string;
  description: string;
  location: string;
  online: boolean;
  physicalStore: boolean;
  smallBusiness: boolean;
  womenOwned: boolean;
  familyOwned: boolean;
  handmade: boolean;
  vegan: boolean;
  crueltyFree: boolean;
  ecoFriendly: boolean;
  lgbtqOwned: boolean;
  faithBased: boolean;
}) {
  const badges = [
    online && "🛍️ Online",
    physicalStore && "🏬 Storefront",
    smallBusiness && "🌱 Small Business",
    womenOwned && "Women-owned",
    familyOwned && "Family-owned",
    handmade && "Handmade",
    vegan && "Vegan",
    crueltyFree && "Cruelty-free",
    ecoFriendly && "Eco-friendly",
    lgbtqOwned && "LGBTQ+ Owned",
    faithBased && "Faith-based",
  ].filter(Boolean);

  return (
    <article className="rounded-3xl border border-[#E7DCCB] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F7F0E6] text-center text-xl font-bold text-[#4A2A13] sm:h-32 sm:w-32 sm:text-2xl">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${name} logo`}
              className="h-full w-full object-cover"
            />
          ) : (
            name.split(" ")[0]
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-start gap-2">
            <h2 className="line-clamp-2 max-w-xl break-words text-2xl font-bold">
              {name}
            </h2>

            <span className="shrink-0 text-[#C6922E]">●</span>
          </div>

          <p className="mb-2 text-sm font-medium">{category}</p>

          <p className="mb-4 line-clamp-2 max-w-xl text-black/70">
            {description}
          </p>

          <div className="mb-4 flex flex-wrap gap-3 text-sm text-black/60">
            <span>📍 {location}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge as string}
                className="rounded-full bg-[#F7F0E6] px-3 py-1 text-xs"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 gap-3">
          <button className="rounded-full border border-[#E7DCCB] px-4 py-2">
            ♡
          </button>

          <a
            href={`/business/${slug}`}
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            View Business
          </a>
        </div>
      </div>
    </article>
  );
}