"use client";

import { useMemo } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import { fadeIn } from "@/src/shared/animation/variants";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface ServicesHighlightsModal {
    id: string;
    name: string;
    description: string;
    imagePath?: string;
    icon?: string;
    order: number;
    isActive: boolean;
    serviceId: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

interface ServiceHighlightsProps {
    datas?: ServicesHighlightsModal[];
}

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL;

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function ServiceHighlights({
    datas = [],
}: ServiceHighlightsProps) {

    const sortedDatas = useMemo(() => {

        return [...datas]
            .filter(
                (item) => item.isActive
            )
            .sort(
                (a, b) =>
                    (a.order ?? 0) -
                    (b.order ?? 0)
            );

    }, [datas]);

    return (
        <section>

            {sortedDatas.map(
                (
                    item,
                    index
                ) => {

                    if (!item.imagePath) {
                        return null;
                    }

                    const imageUrl =
                        `${BASE_URL}/uploads/${item.imagePath}`;

                    const isReverse =
                        index % 2 !== 0;

                    return (

                        <section
                            key={item.id}
                            className={`
                                container
                                mx-auto
                                px-5
                                py-10
                                lg:px-16
                                ${isReverse
                                    ? "bg-teal-50"
                                    : ""}
                            `}
                        >

                            <div
                                className={`
                                    flex
                                    flex-col
                                    gap-4
                                    md:items-center
                                    lg:justify-center
                                    lg:gap-8
                                    xl:gap-16
                                    ${isReverse
                                        ? "lg:flex-row-reverse"
                                        : "lg:flex-row"}
                                `}
                            >

                                {/* IMAGE */}

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
                                        w-full
                                        self-stretch
                                        lg:w-1/2
                                    "
                                >

                                    <div
                                        className="
                                            relative
                                            h-[300px]
                                            overflow-hidden
                                            rounded-lg
                                            sm:h-[400px]
                                            lg:h-full
                                            lg:min-h-[500px]
                                        "
                                    >

                                        <Image
                                            src={imageUrl}
                                            alt={
                                                item.name ||
                                                "Service highlight image"
                                            }
                                            fill
                                            className="object-cover"
                                            sizes="
                                                (max-width: 768px) 100vw,
                                                (max-width: 1024px) 50vw,
                                                45vw
                                            "
                                        />

                                    </div>

                                </motion.div>

                                {/* CONTENT */}

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
                                        w-full
                                        lg:w-1/2
                                    "
                                >

                                    <h4
                                        className="
                                            pb-2.5
                                            text-3xl
                                            font-bold
                                            sm:text-4xl
                                            xl:text-6xl
                                        "
                                    >
                                        {item.name}
                                    </h4>

                                    <div
                                        className="
                                            text-sm
                                            leading-7
                                            tracking-wider
                                        "
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                item.description || "",
                                        }}
                                    />

                                </motion.div>

                            </div>

                        </section>
                    );
                }
            )}

        </section>
    );
}