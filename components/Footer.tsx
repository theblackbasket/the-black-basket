export default function Footer() {
  return (
    <footer className="border-t border-[#E7DCCB] bg-[#0B0B0A] px-6 py-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
        <p className="text-white/60">
          © 2026 The Black Basket. All rights reserved.
        </p>

        <nav className="flex flex-wrap gap-5">
          <a href="/about" className="hover:text-[#e4b32c]">
            About
          </a>

          <a href="/contact" className="hover:text-[#e4b32c]">
            Contact
          </a>

          <a href="/terms" className="hover:text-[#e4b32c]">
            Terms
          </a>

          <a href="/privacy" className="hover:text-[#e4b32c]">
            Privacy
          </a>
        </nav>
      </div>
    </footer>
  );
}

