import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function ContactPage() {
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

            <a href="/contact" className="text-[#e4b32c]">
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

          <a href="/contact" className="text-[#e4b32c]">
            Contact
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#e4b32c]">
          Contact
        </p>

        <h1 className="mb-6 text-5xl font-bold leading-tight">
          Get in touch with The Black Basket.
        </h1>

        <div className="mb-8 space-y-4 text-lg leading-8 text-black/70">
          <p>
            Use this page for listing updates, removal requests, corrections,
            questions, or partnership inquiries.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#E7DCCB] bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold">Email</h2>

          <p className="mb-4 text-black/70">
            For listing changes, removals, or questions, contact:
          </p>

          <a
            href="mailto:theblackbasket619@gmail.com"
            className="break-words text-lg font-semibold text-[#e4b32c]"
          >
            theblackbasket619@gmail.com
          </a>

          <p className="mt-6 text-sm text-black/50">
            Please include the business name if you are requesting a listing
            update, claim, or removal.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}