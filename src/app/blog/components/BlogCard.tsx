// BlogCard.tsx

"use client";

import React from "react";
import Link from "next/link";

import { Card } from "flowbite-react";
import { motion } from "framer-motion";

import { fadeIn } from "@/src/shared/animation/variants";

interface PostModel {
    id: string;
    slug: string;
    title: string;
    description: string;
    status: string;
    tags: string;
    shortNote: string;
    imagePath: string;
    featuredImagePath: string;
    publishedDate: Date;
    author: {
        name: string;
        id: string;
    };
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    categories: CategoryModel[];
}

interface CategoryModel {
    id: string;
    name: string;
}

interface BlogCardProps {
    item: PostModel;
    variant?: "home" | "blog";
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export default function BlogCard({
    item,
    variant = "home",
}: BlogCardProps) {

    const slug = item.slug;

    const date = formatDate(
        item?.publishedDate?.toString()
    );

    const cleanImagePath =
        item.imagePath
            ?.trim()
            ?.replace(/\\/g, "/");

    const imageUrl =
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${cleanImagePath}`;

    // Home Card
    const HomeCard = (
        <Card className="relative max-w-lg mx-auto h-96 overflow-hidden rounded-md p-4">

            <div
                className="absolute inset-0 bg-center bg-cover z-0"
                style={{
                    backgroundImage: `url('${imageUrl}')`,
                }}
            />

            <div className="absolute inset-0 bg-[#00000080] z-0"></div>

            <div className="relative z-10 h-full flex flex-col justify-between">

                <div className="py-3 border-gray-200 sm:py-4 dark:border-gray-700">

                    <div className="flex items-center mb-8 space-x-4">

                        <div className="flex-1">
                            <p className="text-sm text-white">
                                Posted by
                            </p>

                            <p className="text-xs font-bold text-white">
                                {item.author?.name} | {date}
                            </p>
                        </div>

                        <svg
                            className="w-5 xl:w-6 h-6 text-white"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <line x1="5" y1="12" x2="11" y2="18" />
                            <line x1="5" y1="12" x2="11" y2="6" />
                        </svg>
                        <svg
                            className="w-5 xl:w-6 h-6 text-white"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <line x1="13" y1="18" x2="19" y2="12" />
                            <line x1="13" y1="6" x2="19" y2="12" />
                        </svg>
                    </div>
                </div>

                <div>

                    <p className="mb-1 text-xl font-bold text-black bg-white rounded-sm py-1.5 px-2.5">
                        {item.title}
                    </p>

                    <div className="flex flex-row flex-wrap gap-4 mt-2">

                        {item?.categories?.map(
                            (category, index) => (

                                <button
                                    key={index}
                                    className="items-center justify-center h-6 text-xs text-white cursor-pointer bg-black rounded-md w-28"
                                >
                                    {category.name}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );

    // Blog Card
    const BlogSectionCard = (
        <div className="relative max-w-lg mx-auto h-full overflow-hidden rounded-sm bg-black p-0!">

            <div className="flex flex-col h-full">
                <img
                    src={imageUrl}
                    alt={item.title || "Image"}
                    className="w-full h-60 object-cover"
                    width={1200}
                    height={240}
                    loading="lazy"
                    decoding="async"
                />

                <div className="flex-1 flex flex-col justify-between py-3 px-4">

                    <div className="flex items-center mb-2 space-x-4">

                        <div className="flex-1">
                            <p className="text-md text-white">
                                Posted by
                            </p>

                            <p className="text-sm font-bold text-[#495155]">
                                {item.author?.name} | {date}
                            </p>
                        </div>

                        <svg
                            className="w-5 h-5 text-white"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <line x1="5" y1="12" x2="11" y2="18" />
                            <line x1="5" y1="12" x2="11" y2="6" />
                        </svg>
                        <svg
                            className="w-5 h-5 text-white"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <line x1="13" y1="18" x2="19" y2="12" />
                            <line x1="13" y1="6" x2="19" y2="12" />
                        </svg>
                    </div>

                    <div>
                        <p className="text-md font-bold text-white tracking-tighter">
                            {item.title}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 my-3">

                        {item?.categories?.map(
                            (category, idx) => (

                                <span
                                    key={idx}
                                    className="bg-blue-100 text-white px-2 py-1 rounded text-xs"
                                    style={{
                                        background:
                                            "linear-gradient(326deg, #5877F8 37.65%, #FF20B2 78.67%, #FFBB03 102.38%)",
                                    }}
                                >
                                    {category.name}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        // <motion.div
        //     variants={fadeIn("left", 0.1)}
        //     initial="hidden"
        //     whileInView="show"
        //     viewport={{
        //         once: false,
        //         amount: 0.1,
        //     }}
        //     className="relative"
        // >
        //     <Link href={`/blog/${slug}`}>
        //         {variant === "blog"
        //             ? BlogSectionCard
        //             : HomeCard}
        //     </Link>
        // </motion.div>

        <div className="relative">
            <Link href={`/blog/${slug}`}>
                {variant === "blog"
                    ? BlogSectionCard
                    : HomeCard}
            </Link>
        </div>
    );
}