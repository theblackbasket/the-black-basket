import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#FFFDF8] text-[#0B0B0A]">
      <section className="flex flex-1 items-center justify-center px-6 py-14">
        <div className="max-w-lg rounded-3xl border border-[#E7DCCB] bg-white p-10 text-center shadow-sm">
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>

          <h1 className="mb-3 text-4xl font-bold">Submission received</h1>

          <p className="mb-6 text-black/70">
            Thank you for adding a business to The Black Basket. Your submission
            is pending review and will not appear publicly until it is approved.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/"
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
            >
              Back Home
            </a>

            <a
              href="/search"
              className="rounded-full border border-[#E7DCCB] px-6 py-3 text-sm font-semibold"
            >
              Browse Businesses
            </a>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-black/50">
            <a href="/terms" className="hover:text-[#C6922E]">
              Submission Guidelines
            </a>

            <a href="/privacy" className="hover:text-[#C6922E]">
              Privacy Policy
            </a>

            <a href="/contact" className="hover:text-[#C6922E]">
              Contact
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}