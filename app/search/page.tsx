import type { ReactNode } from "react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type SearchParams = {
  q?: string;
  category?: string;
  location?: string;
  shopping?: string;
  sort?: string;
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

const categories = [
  "Skincare",
  "Hair Care",
  "Beauty Services",
  "Home Goods",
  "Kids",
  "Food",
  "Restaurants",
  "Fashion",
  "Services",
  "Wellness",
  "Art",
  "Other",
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const query = params.q?.trim() || "";
  const selectedCategory = params.category?.trim() || "";
  const locationSearch = params.location?.trim() || "";
  const shopping = params.shopping || "";
  const sort = params.sort || "newest";

  const filters = {
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

  function normalizeText(value: string) {
    return value.toLowerCase().trim();
  }

  function getSearchVariations(term: string) {
    const cleaned = normalizeText(term);

    const variations = new Set<string>();

    if (!cleaned) return [];

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

  function categoryMatches(businessCategory: string, selected: string) {
    if (!selected) return true;

    const businessVariations = getSearchVariations(businessCategory);
    const selectedVariations = getSearchVariations(selected);

    return selectedVariations.some((selectedTerm) =>
      businessVariations.some((businessTerm) => businessTerm === selectedTerm)
    );
  }

  const queryTerms = getSearchVariations(query);

  const visibleBusinesses = (businesses || []).filter((business) => {
    const businessCategory = business.category || "";
    const businessLocation = business.location || "";
    const businessTags = Array.isArray(business.tags) ? business.tags : [];

    if (!categoryMatches(businessCategory, selectedCategory)) {
      return false;
    }

    if (shopping === "online" && !business.online) {
      return false;
    }

    if (shopping === "inPerson" && !business.physical_store) {
      return false;
    }

    if (shopping === "both" && (!business.online || !business.physical_store)) {
      return false;
    }

    if (locationSearch) {
      const locationText = normalizeText(businessLocation);
      const shopperLocation = normalizeText(locationSearch);

      const matchesLocation = locationText.includes(shopperLocation);
      const isOnline = Boolean(business.online);

      if (shopping === "inPerson") {
        if (!matchesLocation) return false;
      } else {
        if (!matchesLocation && !isOnline) return false;
      }
    }

    if (queryTerms.length > 0) {
      const searchableText = [
        business.business_name,
        businessCategory,
        business.description,
        businessLocation,
        ...businessTags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesQuery = queryTerms.some((term) =>
        searchableText.includes(term)
      );

      if (!matchesQuery) return false;
    }

    return true;
  });

  const sortedBusinesses = [...visibleBusinesses].sort((a, b) => {
    if (sort === "name") {
      return String(a.business_name || "").localeCompare(
        String(b.business_name || "")
      );
    }

    if (locationSearch && shopping !== "inPerson") {
      if (a.online && !b.online) return -1;
      if (!a.online && b.online) return 1;
    }

    return 0;
  });

  const hasActiveFilters =
    selectedCategory ||
    locationSearch ||
    shopping ||
    sort !== "newest" ||
    Object.values(filters).some(Boolean);

  const displayQuery = query || "all businesses";

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
              defaultValue={query}
            />

            <button className="rounded-full bg-[#e4b32c] px-5 py-2 font-semibold text-white">
              Search
            </button>
          </form>

          <nav className="hidden items-center gap-5 text-sm lg:flex">
            <a href="/" className="hover:text-[#e4b32c]">
              Home
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
          </nav>
        </div>

        <nav className="mx-auto mt-4 flex max-w-6xl flex-wrap gap-4 text-sm md:hidden">
          <a href="/" className="hover:text-[#e4b32c]">
            Home
          </a>

          <a href="/search" className="text-[#e4b32c]">
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
        <form
          action="/search"
          className="mb-6 flex overflow-hidden rounded-full border border-[#E7DCCB] bg-white p-2 md:hidden"
        >
          <input
            name="q"
            className="min-w-0 flex-1 px-4 text-black outline-none"
            placeholder="Search..."
            defaultValue={query}
          />

          <button className="rounded-full bg-[#e4b32c] px-4 py-2 text-sm font-semibold text-white">
            Go
          </button>
        </form>

        <div className="mb-8">
          <h1 className="mb-2 break-words text-4xl font-bold">
            Results for “{displayQuery}”
          </h1>

          <p className="text-sm text-black/60">
            {sortedBusinesses.length} result
            {sortedBusinesses.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <FilterPanel
                query={query}
                selectedCategory={selectedCategory}
                locationSearch={locationSearch}
                shopping={shopping}
                sort={sort}
                filters={filters}
                hasActiveFilters={Boolean(hasActiveFilters)}
              />
            </div>
          </aside>

          <div>
            <details className="mb-6 rounded-[2rem] border border-[#E7DCCB] bg-white p-5 lg:hidden">
              <summary className="cursor-pointer text-xl font-bold">
                Filters & Location
              </summary>

              <div className="mt-5">
                <FilterPanel
                  query={query}
                  selectedCategory={selectedCategory}
                  locationSearch={locationSearch}
                  shopping={shopping}
                  sort={sort}
                  filters={filters}
                  hasActiveFilters={Boolean(hasActiveFilters)}
                />
              </div>
            </details>

            {sortedBusinesses.length > 0 ? (
              <div className="space-y-6">
                {sortedBusinesses.map((business) => (
                  <BusinessCard
                    key={business.id}
                    name={business.business_name}
                    slug={business.slug}
                    logoUrl={business.logo_url}
                    category={business.category}
                    description={business.description}
                    location={business.location || "Online"}
                    online={Boolean(business.online)}
                    physicalStore={Boolean(business.physical_store)}
                    smallBusiness={Boolean(business.small_business)}
                    womenOwned={Boolean(business.women_owned)}
                    familyOwned={Boolean(business.family_owned)}
                    handmade={Boolean(business.handmade)}
                    vegan={Boolean(business.vegan)}
                    crueltyFree={Boolean(business.cruelty_free)}
                    ecoFriendly={Boolean(business.eco_friendly)}
                    lgbtqOwned={Boolean(business.lgbtq_inclusive)}
                    faithBased={Boolean(business.faith_based)}
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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FilterPanel({
  query,
  selectedCategory,
  locationSearch,
  shopping,
  sort,
  filters,
  hasActiveFilters,
}: {
  query: string;
  selectedCategory: string;
  locationSearch: string;
  shopping: string;
  sort: string;
  filters: {
    small: boolean;
    women: boolean;
    family: boolean;
    handmade: boolean;
    vegan: boolean;
    crueltyFree: boolean;
    ecoFriendly: boolean;
    lgbtq: boolean;
    faith: boolean;
  };
  hasActiveFilters: boolean;
}) {
  return (
    <form
      action="/search"
      className="rounded-[2rem] border border-[#E7DCCB] bg-white p-5"
    >
      <div className="mb-5">
        <h2 className="text-xl font-bold">Refine results</h2>

        <p className="text-sm text-black/60">
          Filter by category, location, shopping type, and business values.
        </p>
      </div>

      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-semibold">Search</span>

          <input
            name="q"
            defaultValue={query}
            className="rounded-2xl border border-[#E7DCCB] px-4 py-3 text-sm outline-none focus:border-[#e4b32c]"
            placeholder="cakes, skincare, restaurants..."
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold">Category</span>

          <select
            name="category"
            defaultValue={selectedCategory}
            className="rounded-2xl border border-[#E7DCCB] bg-white px-4 py-3 text-sm outline-none focus:border-[#e4b32c]"
          >
            <option value="">All categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold">Location</span>

          <input
            name="location"
            defaultValue={locationSearch}
            className="rounded-2xl border border-[#E7DCCB] px-4 py-3 text-sm outline-none focus:border-[#e4b32c]"
            placeholder="Fairfield, CA / Online"
          />

          <span className="text-xs text-black/50">
            Beta version: this searches the location text. True nearest-to-farthest
            comes after we add map coordinates.
          </span>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold">Shopping type</span>

          <select
            name="shopping"
            defaultValue={shopping}
            className="rounded-2xl border border-[#E7DCCB] bg-white px-4 py-3 text-sm outline-none focus:border-[#e4b32c]"
          >
            <option value="">Online + in-person</option>
            <option value="online">Online only</option>
            <option value="inPerson">In-person only</option>
            <option value="both">Both online and in-person</option>
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold">Sort</span>

          <select
            name="sort"
            defaultValue={sort}
            className="rounded-2xl border border-[#E7DCCB] bg-white px-4 py-3 text-sm outline-none focus:border-[#e4b32c]"
          >
            <option value="newest">Newest listings</option>
            <option value="name">Business name A-Z</option>
          </select>
        </label>

        <div>
          <p className="mb-3 text-sm font-semibold">Business values</p>

          <div className="grid gap-3 text-sm">
            <Checkbox name="small" label="Small Business" checked={filters.small} />
            <Checkbox name="women" label="Women-owned" checked={filters.women} />
            <Checkbox name="family" label="Family-owned" checked={filters.family} />
            <Checkbox name="handmade" label="Handmade" checked={filters.handmade} />
            <Checkbox name="vegan" label="Vegan" checked={filters.vegan} />
            <Checkbox
              name="crueltyFree"
              label="Cruelty-free"
              checked={filters.crueltyFree}
            />
            <Checkbox
              name="ecoFriendly"
              label="Eco-friendly"
              checked={filters.ecoFriendly}
            />
            <Checkbox name="lgbtq" label="LGBTQ+ Owned" checked={filters.lgbtq} />
            <Checkbox name="faith" label="Faith-based" checked={filters.faith} />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"
        >
          Apply Filters
        </button>

        {hasActiveFilters && (
          <a
            href={query ? `/search?q=${encodeURIComponent(query)}` : "/search"}
            className="text-center text-sm font-semibold text-black/60 hover:text-[#e4b32c]"
          >
            Clear filters
          </a>
        )}
      </div>
    </form>
  );
}

function Checkbox({
  name,
  label,
  checked,
}: {
  name: string;
  label: string;
  checked: boolean;
}) {
  return (
    <label className="flex items-center gap-3">
      <input name={name} value="true" type="checkbox" defaultChecked={checked} />
      <span>{label}</span>
    </label>
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
  description: string | null;
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
    physicalStore && "🏬 In-person",
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

            <span className="shrink-0 text-[#e4b32c]">●</span>
          </div>

          <p className="mb-2 text-sm font-medium">
            {category} • {location}
          </p>

          <p className="mb-4 line-clamp-2 max-w-xl text-black/70">
            {description}
          </p>

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