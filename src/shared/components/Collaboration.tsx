import Link from "next/link";
import LinkButton from "./LinkButton";

export default function Collaboration() {
  return (
    <>
      <div className="flex flex-col justify-between w-full py-4 border-b-2 md:container align-item-center md:flex-row lg:flex-row border-neutral-800 px-8">
        <div className="mb-4 md:w-1/2 lg:w-full">
          <p className="pb-2 text-base text-white">LET'S COLLABORATE</p>
          <h2 className="pb-4 font-bold text-white text-md lg:text-6xl md:text-4xl sm:text-2xl">
            Send us an email, <br />
            to discuss a new project.
          </h2>
        </div>
        <div className="flex justify-start md:justify-end my-auto lg:flex-row lg:w-1/4">
          <LinkButton
            href="/contact"
            className="text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 border-none h-8 py-1 px-4 w-32"
          >
            Contact Us
          </LinkButton>
        </div>
      </div>
      <div className="md:container px-8">
        <div>
          <p className="pt-4 pb-2 text-base xl:text-lg text-white">
            We’re a creative team who enjoy working on fresh ideas and help digital and fintech companies build a strong, memorable identity.
          </p>
        </div>
      </div>
    </>
  );
}
