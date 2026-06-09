import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8] text-[#0B0B0A]">
      <header className="border-b border-[#E7DCCB] bg-[#0B0B0A] px-6 py-5 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <Logo />
          </a>

          <nav className="hidden gap-8 text-sm md:flex">
            <a href="/" className="hover:text-[#e4b32c]">Home</a>
            <a href="/search" className="hover:text-[#e4b32c]">Search</a>
            <a href="/about" className="hover:text-[#e4b32c]">About</a>
            <a href="/blog" className="text-[#e4b32c]">Blog</a>
            <a href="/add-your-business" className="hover:text-[#e4b32c]">
              Add Your Business
            </a>
            <a href="/contact" className="hover:text-[#e4b32c]">Contact</a>
          </nav>
        </div>

        <nav className="mx-auto mt-4 flex max-w-6xl flex-wrap gap-4 text-sm md:hidden">
          <a href="/" className="hover:text-[#e4b32c]">Home</a>
          <a href="/search" className="hover:text-[#e4b32c]">Search</a>
          <a href="/about" className="hover:text-[#e4b32c]">About</a>
          <a href="/blog" className="text-[#e4b32c]">Blog</a>
          <a href="/add-your-business" className="hover:text-[#e4b32c]">
            Add Business
          </a>
          <a href="/contact" className="hover:text-[#e4b32c]">Contact</a>
        </nav>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-14">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#e4b32c]">
          The Black Basket Blog
        </p>

        <h1 className="mb-6 text-5xl font-bold leading-tight">
          Updates, featured businesses, and shopping guides.
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[2rem] border border-[#E7DCCB] bg-white p-6 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#e4b32c]">
              Beta Update
            </p>

            <h2 className="mb-3 text-2xl font-bold">
              Welcome to The Black Basket Beta
            </h2>

            <p className="mb-4 text-black/70">
              The Black Basket is now in beta testing. We’re building a better
              way to search for Black-owned businesses, products, and services.
            </p>

            <p className="text-sm text-black/50">More updates coming soon.</p>
          </article>

          <article className="rounded-[2rem] border border-[#E7DCCB] bg-white p-6 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#e4b32c]">
              Coming Soon
            </p>

            <h2 className="mb-3 text-2xl font-bold">
              Featured Businesses
            </h2>

            <p className="text-black/70">
              We’ll use this space to highlight Black-owned brands, new listings,
              version updates, and shopping guides.
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}

