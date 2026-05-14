import LinkButton from "@/src/shared/components/LinkButton";
import Link from "next/link";

export default function NewsLetter() {
  return (
    <section className="py-10 sm:py-20 px-5">
      <div className="text-center py-0 xl:px-10 m-0 ">
        <h2 className="font-bold text-md lg:text-3xl md:text-3xl sm:text-3xl ">
          <span className="text-3xl font-bold text-transparent lg:text-8xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text tracking-[-.1rem]"> Future-Proof Your Business
          </span>
        </h2>
        <span className="text-xl lg:text-2xl"> With our expert team of creative professionals!
        </span>

        <div className="flex flex-col items-center">
          <div className="flex flex-wrap text-sm text-gray-500 dark:text-white flex-col space-y-4">
            <div className="max-w-md">
              <div className="flex items-center gap-2">
                <LinkButton
                  href="/contact"
                  className="mt-4 w-64 h-10 text-white bg-gray-800 border px-3 rounded-md text-sm font-bold"
                >
                  Get a Demo
                </LinkButton>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>

  );
}