import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
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

      <section className="mx-auto max-w-4xl px-6 py-14">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#e4b32c]">
          Privacy Policy
        </p>

        <h1 className="mb-6 text-5xl font-bold leading-tight">
          Privacy Policy
        </h1>

        <div className="space-y-6 leading-8 text-black/70">
          <p>
            The Black Basket collects information submitted through our business
            listing form so that we can review and display approved businesses
            in our directory.
          </p>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-black">
              Information we collect
            </h2>

            <p>
              We may collect business names, owner or submitter names, email
              addresses, websites, social media links, business descriptions,
              categories, locations, business basics, verification information,
              and uploaded images.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-black">
              How we use information
            </h2>

            <p>
              We use submitted information to review listings, contact
              submitters if needed, verify directory information, and display
              approved businesses publicly on The Black Basket.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-black">
              Public listings
            </h2>

            <p>
              Approved business listings may publicly display the business name,
              owner name, description, category, location, website, social
              links, business images, products or keywords, and selected
              business basics.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-black">
              Information we do not sell
            </h2>

            <p>
              We do not sell submitted personal information. Owner or submitter
              email addresses are used for review and communication purposes and
              are not shown publicly unless specifically included in a public
              business description or link.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-black">
              Requesting changes
            </h2>

            <p>
              Business owners may request updates, corrections, claim review, or
              removal of a listing by contacting The Black Basket through the
              contact page.
            </p>
          </section>

          <p className="text-sm text-black/50">Last updated: 2026</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}