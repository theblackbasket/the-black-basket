import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8] text-[#0B0B0A]">
      <header className="border-b border-[#E7DCCB] bg-[#0B0B0A] px-6 py-5 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <Logo />
          </a>

          <nav className="hidden gap-8 text-sm md:flex">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/add-your-business">Add Your Business</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#e4b32c]">
          Terms & Submission Guidelines
        </p>

        <h1 className="mb-6 text-5xl font-bold leading-tight">
          Submission Guidelines
        </h1>

        <div className="space-y-6 leading-8 text-black/70">
          <p>
            The Black Basket is a directory and discovery platform for
            Black-owned businesses. Submitting a business does not guarantee
            approval or placement on the site.
          </p>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-black">
              Submission review
            </h2>
            <p>
              All submitted businesses are saved as pending until reviewed. The
              Black Basket may approve, reject, edit, or remove listings at any
              time to protect the quality and accuracy of the directory.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-black">
              Black-owned verification
            </h2>
            <p>
              Businesses may self-identify as Black-owned during submission. A
              Verified Black-Owned badge is only added after review. We may use
              public information, business websites, social media, submitted
              links, founder information, or other reasonable sources to review
              listings.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-black">
              Business responsibility
            </h2>
            <p>
              Submitters are responsible for providing accurate information.
              Businesses are responsible for following all laws, permits,
              licenses, taxes, and regulations that apply where they operate.
              The Black Basket does not guarantee that every listed business has
              been independently checked for every license or permit.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-black">
              Business basics
            </h2>
            <p>
              Labels such as small business, women-owned, family-owned,
              handmade, vegan, cruelty-free, eco-friendly, LGBTQ+ owned, and
              faith-based may be self-reported unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-black">
              Images and content
            </h2>
            <p>
              By submitting images, descriptions, links, or other content, you
              confirm that you have the right to share that content and allow The
              Black Basket to display it as part of the business listing.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-black">
              Prohibited submissions
            </h2>
            <p>
              We may reject submissions that appear false, misleading,
              offensive, unsafe, spammy, illegal, unrelated to the directory, or
              otherwise inappropriate for The Black Basket.
            </p>
          </section>

          <p className="text-sm text-black/50">Last updated: 2026</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

