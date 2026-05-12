import Link from "next/link";

export default function NewsLetter() {
  return (
    <section className="py-10 sm:py-20 px-5">
      <div className="text-center py-0 xl:px-10 m-0 ">
        <h2 className="font-bold text-md lg:text-3xl md:text-3xl sm:text-3xl ">
          <span className="text-3xl font-bold text-transparent lg:text-8xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text tracking-[-.2rem]"> Future-Proof Your Business
          </span>
        </h2>
        <span className="text-xl lg:text-2xl"> With our expert team of creative professionals!
        </span>

        <div className="flex flex-col items-center">
          <div className="flex flex-wrap text-sm text-gray-500 dark:text-white flex-col space-y-4">
            <div className="max-w-md">
              <div className="flex items-center gap-2">
                <Link href="./contact" className="transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background flex items-center justify-center mt-4 text-sm font-bold border-1 px-3 rounded-md w-64 h-10 text-white bg-gray-800 relative group">
                  <span className="transition-transform duration-300 group-hover:-translate-x-3">Get a Demo</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right absolute w-4 h-4 transition-opacity duration-300 opacity-0 right-3 group-hover:opacity-100" aria-hidden="true">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>

  );
}