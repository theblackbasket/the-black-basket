import Logo from "@/components/Logo";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B0A] text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12">
        <header className="mb-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <Logo />
          </a>

<nav className="hidden gap-8 text-sm md:flex">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/add-your-business">Add Your Business</a>
  <a href="/contact">Contact</a>
</nav>
        </header>

        <div className="max-w-2xl">
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            Find Black-owned businesses. Buy with purpose.
          </h1>

          <p className="mb-8 max-w-xl text-lg text-white/80">
            Search for what you need and discover Black-owned options near you
            and online.
          </p>

          <form
            action="/search"
            className="mb-8 flex max-w-xl overflow-hidden rounded-full bg-white p-2"
          >
            <input
              name="q"
              className="flex-1 px-5 text-black outline-none"
              placeholder="What are you looking for?"
            />

            <button className="rounded-full bg-[#C6922E] px-6 py-3 font-semibold text-white">
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="text-white/70">Popular searches:</span>

            <a
              href="/search?q=skincare"
              className="rounded-full border border-white/30 px-4 py-2"
            >
              skincare
            </a>

            <a
              href="/search?q=hair care"
              className="rounded-full border border-white/30 px-4 py-2"
            >
              hair care
            </a>

            <a
              href="/search?q=candles"
              className="rounded-full border border-white/30 px-4 py-2"
            >
              candles
            </a>

            <a
              href="/search?q=bakery"
              className="rounded-full border border-white/30 px-4 py-2"
            >
              bakery
            </a>

            <a
              href="/search?q=baby products"
              className="rounded-full border border-white/30 px-4 py-2"
            >
              baby products
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}