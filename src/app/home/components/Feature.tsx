"use client";

import Link from "next/link";
import { motion, useTime, useTransform } from "framer-motion";
import { fadeIn } from "../../../shared/animation/variants";
import DynamicIcon from "@/src/shared/components/Icon";

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
}

const colorMap = [
    { bg: "bg-purple-100", text: "text-purple-500" },
    { bg: "bg-teal-100", text: "text-teal-500" },
    { bg: "bg-yellow-100", text: "text-yellow-500" },
    { bg: "bg-green-100", text: "text-green-500" },
    { bg: "bg-red-100", text: "text-red-500" },
    { bg: "bg-blue-100", text: "text-blue-500" },
    { bg: "bg-pink-100", text: "text-pink-500" },
    { bg: "bg-indigo-100", text: "text-indigo-500" },
    { bg: "bg-orange-100", text: "text-orange-500" },
    { bg: "bg-lime-100", text: "text-lime-500" },
    { bg: "bg-cyan-100", text: "text-cyan-500" },
];

interface FeatureProps {
    services: Services[];
}

export default function Feature({ services }: FeatureProps) {
    const time = useTime();

    const rotate = useTransform(
        time,
        [0, 4000],
        [0, 360],
        { clamp: false }
    );

    return (
        <section className="grid w-full bg-[#F3FEFD]">
            <div className="container px-8 flex flex-col flex-wrap w-full py-0 pb-6 mx-auto md:flex-row lg:py-24 lg:flex-row lg:flex-wrap lg:justify-center">

                {services
                    ?.slice()
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .slice(0, 4)
                    .map((item, index) => {

                        const color = colorMap[index % colorMap.length];

                        return (
                            <motion.div
                                key={item.id}
                                variants={fadeIn("up", 0.2)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: false, amount: 0.1 }}
                                className="w-full py-2 lg:w-1/4 md:w-1/2"
                            >
                                <Link
                                    href={`/service/${item.slug}`}
                                    className="flex flex-col items-center"
                                >
                                    <motion.span
                                        style={{ rotate }}
                                        className={`flex items-center justify-center w-8 h-8 mt-5 ${color.bg} rounded-full`}
                                    >
                                        <DynamicIcon
                                            iconName={item?.icon as string}
                                            className={color.text}
                                        />

                                    </motion.span>

                                    <h2 className="pt-2 font-bold text-md lg:text-lg xl:text-xl">
                                        {item.title}
                                    </h2>

                                    <p className="px-5 pt-2 text-sm text-center lg:text-sm xl:text-md">
                                        {item.shortNote}
                                    </p>
                                </Link>
                            </motion.div>
                        );
                    })}
            </div>
        </section>
    );
}