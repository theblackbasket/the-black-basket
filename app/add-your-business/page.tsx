import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { submitBusiness } from "./actions";
import BusinessImagePreview from "@/components/BusinessImagePreview";
import BusinessLocationFields from "@/components/BusinessLocationFields";
import BusinessImageFields from "@/components/BusinessImageFields"; 

export default async function AddYourBusinessPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const errorMessage = params.error;
  return (
    <main className="min-h-screen bg-[#FFFDF8] text-[#0B0B0A]">
      <header className="border-b border-[#E7DCCB] bg-[#0B0B0A] px-6 py-5 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <Logo />
          </a>

          <nav className="flex flex-wrap items-center justify-end gap-5 text-sm">
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

            <a href="/add-your-business" className="text-[#e4b32c]">
              Add Your Business
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[0.9fr_1.2fr]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#e4b32c]">
            Get listed
          </p>

          <h1 className="mb-5 text-5xl font-bold leading-tight">
            Add your Black-owned business to The Black Basket.
          </h1>

          <p className="mb-6 text-lg text-black/70">
            Submit your business for review. New submissions are saved as
            pending and do not appear publicly until approved.
          </p>

          <a
            href="/terms"
            className="mb-6 inline-block rounded-full border border-[#E7DCCB] bg-white px-5 py-3 text-sm font-semibold"
          >
            Read Submission Guidelines
          </a>

          <div className="rounded-3xl bg-[#0B0B0A] p-6 text-white">
            <h2 className="mb-3 text-2xl font-bold">What happens next?</h2>

            <ol className="space-y-3 text-white/80">
              <li>1. You submit your business details.</li>
              <li>2. The listing is saved privately as pending.</li>
              <li>3. A real person reviews the submission.</li>
              <li>4. Approved listings appear publicly in search.</li>
            </ol>
          </div>

          <div className="mt-6 rounded-3xl border border-[#E7DCCB] bg-white p-5">
            <h2 className="mb-2 text-xl font-bold">Listing requirement</h2>

            <p className="text-sm leading-6 text-black/70">
              To be listed on The Black Basket, a business should be majority
              Black-owned, meaning Black ownership makes up 51% or more of the
              business.
            </p>
          </div>

          <BusinessImagePreview />
        </div>

               <div className="grid gap-5">
          {errorMessage && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
              {errorMessage}
            </div>
          )}

          <form
            action={submitBusiness}
            encType="multipart/form-data"
            className="rounded-[2rem] border border-[#E7DCCB] bg-white p-6 shadow-sm"
          >
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Business details</h2>

            <p className="text-sm text-black/60">
              Fields marked with * are required.
            </p>
          </div>

          <BusinessImageFields />

          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Business name *</span>

              <input
                name="business_name"
                required
                className="rounded-2xl border border-[#E7DCCB] px-4 py-3 outline-none focus:border-[#e4b32c]"
                placeholder="Example: Golden Wick Studio"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">Owner name *</span>

              <input
                name="owner_name"
                required
                className="rounded-2xl border border-[#E7DCCB] px-4 py-3 outline-none focus:border-[#e4b32c]"
                placeholder="Owner or submitter name"
              />

              <span className="text-xs text-black/50">
                This may be shown publicly on the business profile after review.
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">Owner email *</span>

              <input
                name="owner_email"
                type="email"
                required
                className="rounded-2xl border border-[#E7DCCB] px-4 py-3 outline-none focus:border-[#e4b32c]"
                placeholder="you@example.com"
              />

              <span className="text-xs text-black/50">
                This is for review and contact purposes only.
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Website{" "}
                <span className="font-normal text-black/50">(optional)</span>
              </span>

              <input
                name="website"
                type="url"
                className="rounded-2xl border border-[#E7DCCB] px-4 py-3 outline-none focus:border-[#e4b32c]"
                placeholder="https://yourbusiness.com"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Social media handles{" "}
                <span className="font-normal text-black/50">(optional)</span>
              </span>

              <input
                name="instagram"
                className="rounded-2xl border border-[#E7DCCB] px-4 py-3 outline-none focus:border-[#e4b32c]"
                placeholder="@yourbusiness on Instagram, TikTok, Facebook, etc."
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">Category *</span>

              <select
                name="category"
                required
                className="rounded-2xl border border-[#E7DCCB] bg-white px-4 py-3 outline-none focus:border-[#e4b32c]"
              >
                <option value="">Select a category</option>
                <option>Skincare</option>
                <option>Hair Care</option>
                <option>Beauty Services</option>
                <option>Home Goods</option>
                <option>Kids</option>
                <option>Food</option>
                <option>Restaurants</option>
                <option>Fashion</option>
                <option>Services</option>
                <option>Wellness</option>
                <option>Art</option>
                <option>Other</option>
              </select>
            </label>

          <BusinessLocationFields />

            <label className="grid gap-2">
              <span className="text-sm font-semibold">Description *</span>

              <textarea
                name="description"
                required
                className="min-h-32 rounded-2xl border border-[#E7DCCB] px-4 py-3 outline-none focus:border-[#e4b32c]"
                placeholder="Tell shoppers what this business sells, offers, or is known for..."
              />

              <span className="text-xs text-black/50">
                This may appear publicly on the business profile.
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">Business tags *</span>

              <input
                name="tags"
                required
                className="rounded-2xl border border-[#E7DCCB] px-4 py-3 outline-none focus:border-[#e4b32c]"
                placeholder="candles, skincare, braids, cakes, jewelry"
              />

              <span className="text-xs text-black/50">
                Separate tags with commas. These help shoppers find the business
                in search.
              </span>
            </label>

            <div className="grid gap-3 rounded-3xl bg-[#F7F0E6] p-5">
              <div>
                <h3 className="mb-1 text-lg font-bold">Business background</h3>

                <p className="text-sm text-black/60">
                  These help shoppers understand how the business operates.
                </p>
              </div>

              <label className="flex gap-3">
                <input name="small_business" type="checkbox" />

                <span className="text-sm">This is a small business</span>
              </label>

              <label className="flex gap-3">
                <input
                  name="black_owned_confirmation"
                  type="checkbox"
                  required
                />

                <span className="text-sm">
                  I confirm this business is majority Black-owned, meaning Black
                  ownership makes up 51% or more of the business *
                </span>
              </label>
            </div>

            <div className="grid gap-3 rounded-3xl bg-[#F7F0E6] p-5">
              <div>
                <h3 className="mb-1 text-lg font-bold">Business values</h3>

                <p className="text-sm text-black/60">
                  Select every value that applies. These are optional and
                  self-reported.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex gap-3">
                  <input name="women_owned" type="checkbox" />
                  <span className="text-sm">Women-owned</span>
                </label>

                <label className="flex gap-3">
                  <input name="family_owned" type="checkbox" />
                  <span className="text-sm">Family-owned</span>
                </label>

                <label className="flex gap-3">
                  <input name="handmade" type="checkbox" />
                  <span className="text-sm">Handmade</span>
                </label>

                <label className="flex gap-3">
                  <input name="vegan" type="checkbox" />
                  <span className="text-sm">Vegan</span>
                </label>

                <label className="flex gap-3">
                  <input name="cruelty_free" type="checkbox" />
                  <span className="text-sm">Cruelty-free</span>
                </label>

                <label className="flex gap-3">
                  <input name="eco_friendly" type="checkbox" />
                  <span className="text-sm">Eco-friendly</span>
                </label>

                <label className="flex gap-3">
                  <input name="lgbtq_inclusive" type="checkbox" />
                  <span className="text-sm">LGBTQ+ owned</span>
                </label>

                <label className="flex gap-3">
                  <input name="faith_based" type="checkbox" />
                  <span className="text-sm">Faith-based</span>
                </label>
              </div>
            </div>

            <div className="grid gap-4 rounded-3xl border border-[#E7DCCB] p-5">
              <div>
                <h3 className="mb-1 text-lg font-bold">
                  How can we verify this business is Black-owned?
                </h3>

                <p className="text-sm text-black/60">
                  Share anything that helps us review the submission. This is for
                  review only and may not appear publicly.
                </p>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  Verification notes{" "}
                  <span className="font-normal text-black/50">(optional)</span>
                </span>

                <textarea
                  name="verification_notes"
                  className="min-h-24 rounded-2xl border border-[#E7DCCB] px-4 py-3 outline-none focus:border-[#e4b32c]"
                  placeholder="Example: The founder is listed on the About page, the owner posts on the business Instagram, etc."
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  Verification link{" "}
                  <span className="font-normal text-black/50">(optional)</span>
                </span>

                <input
                  name="verification_link"
                  type="url"
                  className="rounded-2xl border border-[#E7DCCB] px-4 py-3 outline-none focus:border-[#e4b32c]"
                  placeholder="https://..."
                />

                <span className="text-xs text-black/50">
                  Examples: About page, founder bio, social media profile,
                  article, interview, business directory listing, or public post.
                </span>
              </label>
            </div>

            <div className="rounded-3xl bg-[#F7F0E6] p-5">
              <label className="flex gap-3">
                <input name="submission_agreement" type="checkbox" required />

                <span className="text-sm leading-6">
                  By submitting this business, I agree to The Black Basket’s{" "}
                  <a href="/terms" className="font-semibold text-[#e4b32c]">
                    Terms and Submission Guidelines
                  </a>
                  . I understand that submitting a business does not guarantee
                  approval and that all submissions are reviewed by a real person
                  before appearing publicly. *
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-2 rounded-full bg-black px-6 py-4 font-semibold text-white"
            >
              Submit Business for Review
            </button>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-black/50">
              <a href="/privacy" className="hover:text-[#e4b32c]">
                Privacy Policy
              </a>

              <a href="/terms" className="hover:text-[#e4b32c]">
                Submission Guidelines
              </a>

              <a href="/contact" className="hover:text-[#e4b32c]">
                Contact
              </a>
            </div>
          </div>
             </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}