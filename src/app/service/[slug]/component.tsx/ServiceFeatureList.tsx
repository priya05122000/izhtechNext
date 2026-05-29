"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { fadeIn } from "@/src/shared/animation/variants";

import CustomObject from "@/src/shared/components/CustomObjects";
import DynamicIcon from "@/src/shared/components/Icon";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface ServicesFeaturesModal {
    id: string;
    title: string;
    description: string;
    imagePath?: string;
    icon?: string;
    isFeatured: boolean;
    order: number;
    isActive: boolean;
    serviceId: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

interface ServiceFeatureListProps {
    datas?: ServicesFeaturesModal[];
}

/* -------------------------------------------------------------------------- */
/*                                 ANIMATION                                  */
/* -------------------------------------------------------------------------- */

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

/* -------------------------------------------------------------------------- */
/*                              HELPER FUNCTION                               */
/* -------------------------------------------------------------------------- */

const replaceStrings = (
    str: string
) => {
    return str
        .replace(
            /background-color:\s*rgb\(0,\s*0,\s*0\);?/g,
            ""
        )
        .replace(
            /color:\s*rgb\(255,\s*255,\s*255\);?/g,
            ""
        );
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function ServiceFeatureList({
    datas = [],
}: ServiceFeatureListProps) {

    const filteredDatas = useMemo(() => {

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
        <section
            className="
                mx-auto
                w-full
                bg-black
                px-5
            "
        >

            <div
                className="
                    mx-auto
                    grid
                    items-center
                    justify-center
                    text-white
                "
            >

                <div
                    className="
                        relative
                        overflow-hidden
                        md:container
                    "
                >

                    {/* FEATURE LIST */}

                    <motion.ul
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{
                            once: true,
                            amount: 0.15,
                        }}
                        className="
                            grid
                            gap-[3.3rem]
                            py-16
                            sm:grid-cols-2
                            sm:p-8
                            lg:grid-cols-3
                            lg:gap-5
                            lg:p-13
                        "
                    >

                        {filteredDatas.map(
                            (item) => {

                                const description =
                                    replaceStrings(
                                        item.description || ""
                                    );

                                // console.log(item.icon);

                                return (
                                    <motion.li
                                        key={item.id}
                                        variants={fadeIn(
                                            "up",
                                            0
                                        )}
                                        className="list-none"
                                    >

                                        {/* ICON */}

                                        <div
                                            className="
                                                flex
                                                h-[50px]
                                                w-[50px]
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-neutral-600
                                            "
                                        >

                                            <DynamicIcon
                                                iconName={item.icon}
                                            />


                                        </div>

                                        {/* TITLE */}

                                        <h3
                                            className="
                                                py-3
                                                text-[1.2rem]
                                                font-bold
                                                text-slate-50
                                            "
                                        >
                                            {item.title}
                                        </h3>

                                        {/* DESCRIPTION */}

                                        <div
                                            className="
                                                services-description
                                                !text-white
                                            "
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    description,
                                            }}
                                        />

                                    </motion.li>
                                );
                            }
                        )}

                    </motion.ul>

                    {/* DECORATION */}

                    <span
                        className="
                            absolute
                            right-0
                            bottom-80
                        "
                    >

                        <CustomObject
                            className="
                                absolute
                                right-0
                                hidden
                                h-[60vw]
                                opacity-25
                                lg:block
                                lg:h-[40vh]
                            "
                            variants="half-dash-yellow"
                        />

                    </span>

                </div>

            </div>

        </section>
    );
}