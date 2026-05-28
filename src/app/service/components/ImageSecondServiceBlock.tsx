"use client";

import { useMemo } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import { fadeIn } from "../../../shared/animation/variants";

import Accordion from "../../../shared/components/Accordion";

import LinkButton from "@/src/shared/components/LinkButton";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function ImageSecondServiceBlock(
  props: Services
) {

  const {
    slug,
    title,
    shortNote,
    featuredImagePath,
    serviceFeatures = [],
  } = props;

  /* ---------------------------------------------------------------------- */
  /*                              FILTER FEATURES                           */
  /* ---------------------------------------------------------------------- */

  const features = useMemo(() => {

    return serviceFeatures
      .filter(
        (feature) =>
          feature?.isFeatured === true &&
          feature?.isActive === true
      )
      .sort(
        (a, b) =>
          (a.order ?? 0) -
          (b.order ?? 0)
      )
      .slice(0, 3);

  }, [serviceFeatures]);

  /* ---------------------------------------------------------------------- */
  /*                                IMAGE URL                               */
  /* ---------------------------------------------------------------------- */

  const imageUrl =
    featuredImagePath
      ? `${BASE_URL}/uploads/${featuredImagePath}`
      : null;

  return (
    <section
      className="
                container-fluid
                sm:px-10
            "
    >

      <div
        className="
                    flex
                    flex-col
                    items-center
                    lg:flex-row
                    lg:gap-5
                "
      >

        {/* CONTENT */}

        <motion.div
          variants={fadeIn(
            "left",
            0.15
          )}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
                        order-2
                        mt-5
                        w-full
                        px-0
                        py-10
                        sm:px-5
                        md:flex-1
                        lg:order-1
                        lg:w-1/2
                        lg:py-0
                        lg:pe-20
                        xl:pe-36
                    "
        >

          <p
            className="
                            pb-2
                            text-xs
                            tracking-wider
                        "
          >
            OUR SERVICES
          </p>

          <h3
            className="
                            pb-2
                            text-3xl
                            font-bold
                            sm:text-4xl
                        "
          >
            {title}
          </h3>

          <div
            dangerouslySetInnerHTML={{
              __html:
                shortNote?.toString() ||
                "",
            }}
          />

          {/* FEATURES */}

          <div className="mt-5">

            <Accordion
              items={features}
            />

          </div>

          {/* BUTTON */}

          <LinkButton
            href={`/service/${slug}`}
            className="
                            mt-4
                            h-8
                            w-32
                            border
                            bg-indigo-950
                            px-4
                            py-1
                            font-bold
                            text-white
                        "
          >
            Know more
          </LinkButton>

        </motion.div>

        {/* IMAGE */}

        <motion.div
          variants={fadeIn(
            "right",
            0.15
          )}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
                        order-1
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        lg:order-2
                        lg:w-1/2
                    "
        >

          {imageUrl && (

            <div
              className="
                                relative
                                h-80
                                w-full
                                overflow-hidden
                                sm:h-[500px]
                                lg:h-[640px]
                            "
            >

              <Image
                src={imageUrl}
                alt={
                  title ||
                  "Service image"
                }
                fill
                className="object-cover"
                sizes="
                                    (max-width: 768px) 100vw,
                                    (max-width: 1024px) 50vw,
                                    50vw
                                "
              />

            </div>
          )}

        </motion.div>

      </div>

    </section>
  );
}