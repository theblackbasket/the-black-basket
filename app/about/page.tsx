import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function AboutPage() {
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

            <a href="/about" className="text-[#e4b32c]">
              About
            </a>

            <a href="/add-your-business" className="hover:text-[#e4b32c]">
              Add Your Business
            </a>

            <a href="/contact" className="hover:text-[#e4b32c]">
              Contact
            </a>
          </nav>

          <a
            href="/search"
            className="hidden rounded-full border border-white/20 px-4 py-2 text-sm font-semibold hover:border-[#e4b32c] hover:text-[#e4b32c] md:inline-block"
          >
            Search
          </a>
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

  <a href="/add-your-business" className="hover:text-[#e4b32c]">
    Add Business
  </a>

  <a href="/contact" className="hover:text-[#e4b32c]">
    Contact
  </a>
</nav>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#e4b32c]">
          About The Black Basket
        </p>

        <h1 className="mb-6 text-5xl font-bold leading-tight">
          A search engine for discovering Black-owned businesses.
        </h1>

        <div className="space-y-6 text-lg leading-8 text-black/70">
          <p>
            The Black Basket helps shoppers find Black-owned brands, stores,
            products, businesses, and services by searching for what they
            actually need.
          </p>

          <p>
            Instead of only searching by business name, shoppers can search by
            keywords for things like home goods, skincare, jewelry, bakeries,
            candles, hair care, baby products, clothing, and so much more.
          </p>

          <p>
            Our goal is to make it easier to discover and shop Black-owned
            businesses online and in person.
          </p>

          <p>
            Listings are submitted by business owners or community members and
            reviewed before appearing publicly. Verified Black-Owned badges are
            added only after further review.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

