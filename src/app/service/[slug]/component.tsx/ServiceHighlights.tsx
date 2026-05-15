"use client";

import { fadeIn } from "@/src/shared/animation/variants";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

export default function ServiceHighlights({
    datas = [],
}: ServiceHighlightsProps) {

    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const sortedDatas = [...datas]
        .filter((item) => item.isActive)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return (
        <section>

            {sortedDatas.map(
                (item: ServicesHighlightsModal, index: number) => {

                    const imageUrl = `${BASE_URL}/${item?.imagePath || ""}`;

                    if (index % 2 === 0) {
                        return (
                            <div key={`${item.id}-${index}`} className="container px-5 py-10 mx-auto lg:mx-auto lg:px-16">
                                <div className="flex flex-col gap-4 lg:flex-row lg:gap-8 xl:gap-16 md:items-center lg:justify-center">
                                    <motion.img
                                        src={`${imageUrl}`}
                                        alt={item.name || "Service highlight image"}
                                        className="w-full rounded-lg lg:w-1/2 h-full object-cover"
                                        variants={fadeIn("left", 0.3)}
                                        initial="hidden"
                                        whileInView="show"
                                        exit="hidden"
                                    />
                                    <motion.div
                                        className="w-full  lg:w-1/2"
                                        variants={fadeIn("left", 0.3)}
                                        initial="hidden"
                                        whileInView="show"
                                        exit="hidden"
                                    >
                                        <p className="text-xs font-medium tracking-wide"></p>
                                        <p className="xl:text-6xl text-4xl font-bold pb-2.5">
                                            {item.name}
                                        </p>
                                        <div
                                            className="text-sm leading-7 tracking-wider"
                                            dangerouslySetInnerHTML={{
                                                __html: isMounted ? (item?.description || "") : "",
                                            }}
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div key={`${item.id}-${index}`} className="container px-5 py-10 mx-auto lg:mx-auto lg:px-16 bg-teal-50">
                                <div className="flex flex-col gap-4 lg:flex-row lg:gap-8 xl:gap-16 md:items-center lg:justify-center">
                                    <motion.div
                                        className="w-full lg:w-1/2"
                                        variants={fadeIn("left", 0.3)}
                                        initial="hidden"
                                        whileInView="show"
                                        exit="hidden"
                                    >
                                        <p className="text-xs font-medium tracking-wide"></p>
                                        <p className="xl:text-6xl text-4xl font-bold pb-2.5">
                                            {item.name}
                                        </p>
                                        <div
                                            className="text-sm leading-7 tracking-wider"
                                            dangerouslySetInnerHTML={{
                                                __html: isMounted ? (item?.description || "") : "",
                                            }}
                                        />
                                    </motion.div>
                                    <motion.img
                                        src={`${imageUrl}`}
                                        alt={item.name || "Service highlight image"}
                                        className="w-full rounded-lg lg:w-1/2 h-full object-cover"
                                        variants={fadeIn("left", 0.3)}
                                        initial="hidden"
                                        whileInView="show"
                                        exit="hidden"
                                    />
                                </div>
                            </div>
                        );
                    }
                }
            )}
        </section>
    );
}