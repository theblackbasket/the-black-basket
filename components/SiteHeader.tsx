import Logo from "@/components/Logo";

export function SiteHeader() {
  return (
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

        <a href="/about" className="hover:text-[#e4b32c]">
          About
        </a>

        <a href="/add-your-business" className="hover:text-[#e4b32c]">
          Add Business
        </a>

        <a href="/search" className="hover:text-[#e4b32c]">
          Search
        </a>

        <a href="/contact" className="hover:text-[#e4b32c]">
          Contact
        </a>
      </nav>
    </header>
  );
}