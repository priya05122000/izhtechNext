"use client";

import { fadeIn } from "../../../shared/animation/variants";
import { motion } from "framer-motion";
import Accordion from "../../../shared/components/Accordion";
import Link from "next/link";

interface ServiceFeature {
  isFeatured?: boolean;
  isActive?: boolean;
  order?: number;
  [key: string]: any;
}

interface Services {
  id: string;
  slug: string;
  title?: string;
  shortNote?: string;
  description?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
  featuredImagePath?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  serviceFeatures?: ServiceFeature[];
}

export default function ImageSecondServiceBlock(props: Services) {
  const {
    slug,
    title,
    shortNote,
    featuredImagePath,
    serviceFeatures = [],
  } = props;

  const features = serviceFeatures
    .filter(
      (feature) =>
        feature?.isFeatured === true &&
        feature?.isActive === true
    )
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, 3);

  return (
    <section className="sm:px-10 container-fluid">
      <div className="flex flex-col items-center sm:flex-col md:flex-col lg:flex-row xl:flex-row lg:gap-5">
        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          exit={"hidden"}
          viewport={{ once: false, amount: 0.1 }}
          className="order-2 w-full px-0 sm:px-5 py-10 mt-5 lg:order-1 lg:py-0 md:flex-1 lg:w-1/2 lg:pe-20 xl:pe-36"
        >
          <p className="pb-2 text-xs">OUR SERVICES</p>

          <h2 className="pb-2 text-3xl font-bold">
            {title}
          </h2>

          <div
            dangerouslySetInnerHTML={{
              __html: shortNote?.toString() || "",
            }}
          />

          <div className="mt-5">
            <Accordion items={features} />
          </div>

          {/* <LinkButton href={`/service/${slug}`} size={"sm"}>
            Know more
          </LinkButton> */}
          <Link href={`/service/${slug}`} className="transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background flex items-center justify-center mt-4 text-sm font-bold text-white rounded bg-indigo-950 border-1 h-8 py-1 px-4 w-32 relative group"><span className="transition-transform duration-300 group-hover:-translate-x-3">Know more</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right absolute w-4 h-4 transition-opacity duration-300 opacity-0 right-3 group-hover:opacity-100" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></Link>
        </motion.div>

        <motion.div
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          whileInView={"show"}
          exit={"hidden"}
          viewport={{ once: false, amount: 0.1 }}
          className="w-full flex items-center justify-center h-[20rem] lg:w-1/2 lg:h-[40rem] order-1 lg:order-2"
        >
          {featuredImagePath && (
            <img
              className="lg:w-full lg:h-[40rem] w-1/2 object-cover flex h-[20rem]"
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${featuredImagePath}`}
              alt={title || "service-image"}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}