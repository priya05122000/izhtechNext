"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "flowbite-react";

import CustomObject from "@/src/shared/components/CustomObjects";
import { fadeIn } from "@/src/shared/animation/variants";
import LinkButton from "@/src/shared/components/LinkButton";

interface CategoryModel {
    id: string;
    name: string;
    description: string;
    icon: string;
    shortDescription: string;
    imagePath: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

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

interface BlogListProps {
    blogPosts: PostModel[];
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export default function BlogList({ blogPosts }: BlogListProps) {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    return (
        <div className="relative">
            <CustomObject
                className="absolute -2xl md:h-[120%] xl:h-[130%] -top-40 -left-[40%] xl:-left-[24%] -z-10"
                variants="text-rotate"
            />

            <div className="relative z-10 mt-10">
                <section className="relative overflow-hidden lg:container lg:mx-auto item-center lg:px-8">
                    {blogPosts?.length > 0 && (
                        <>
                            <div className="relative z-10 flex flex-col flex-wrap justify-between gap-4 px-5 my-auto space-y-5 h-4/5 md:flex-row md:px-5">

                                {/* Left Content */}
                                <div className="sm:w-[70%] lg:w-[67%] xl:w-8/12">
                                    <div className="flex flex-col h-full text-left">
                                        <p className="text-sm">
                                            FROM THE BLOG
                                        </p>

                                        <h3 className="text-5xl font-bold lg:text-7xl">
                                            Quick and neat,
                                            just like our work.
                                        </h3>

                                        <br />

                                        {/* <Link
                                            href="/blog"
                                            className="relative z-50 inline-block w-32 rounded border-2 border-black bg-white px-4 py-2 text-center text-sm font-bold text-black hover:bg-gray-200"
                                        >
                                            Read all
                                        </Link> */}
                                        <LinkButton href="/blog" variant="outline" className="text-xs" >Read all</LinkButton>

                                    </div>
                                </div>

                                {/* Blog Cards */}
                                {blogPosts.slice(0, 4).map((item) => {
                                    const date = formatDate(
                                        item?.publishedDate?.toString()
                                    );

                                    const cleanImagePath = item?.imagePath
                                        ?.trim()
                                        .replace(/\\/g, "/");

                                    const imageUrl = `${BASE_URL}/${cleanImagePath}`;

                                    if (item.status !== "true") return null;

                                    return (
                                        <div
                                            key={item.id}
                                            className="h-full sm:w-full md:w-[48%] lg:w-[30%] xl:w-[31%] item-center"
                                        >
                                            <motion.div
                                                variants={fadeIn("left", 0.1)}
                                                initial="hidden"
                                                whileInView="show"
                                                viewport={{
                                                    once: false,
                                                    amount: 0.1,
                                                }}
                                                className="relative"
                                            >
                                                <Link href={`/blog/${item.slug}`}>
                                                    <Card className="relative mx-auto h-96 max-w-lg overflow-hidden rounded-md p-4">

                                                        {/* Background Image */}
                                                        <div
                                                            className="absolute inset-0 z-0 bg-cover bg-center"
                                                            style={{
                                                                backgroundImage: `url('${imageUrl}')`,
                                                            }}
                                                        />

                                                        {/* Overlay */}
                                                        <div className="absolute inset-0 z-0 bg-[#00000080]" />

                                                        {/* Content */}
                                                        <div className="relative z-10 flex h-full flex-col justify-between">

                                                            {/* Top */}
                                                            <div className="border-gray-200 py-3 sm:py-4 dark:border-gray-700">
                                                                <div className="mb-8 flex items-center space-x-4">

                                                                    <div className="flex-1">
                                                                        <p className="text-sm text-white xl:text-md">
                                                                            Posted by
                                                                        </p>

                                                                        <p className="text-xs font-bold text-white xl:text-sm">
                                                                            {item.author?.name} | {date}
                                                                        </p>
                                                                    </div>

                                                                    {/* Left Arrow */}
                                                                    <svg
                                                                        className="h-6 w-5 text-white xl:w-6"
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

                                                                    {/* Right Arrow */}
                                                                    <svg
                                                                        className="h-6 w-5 text-white xl:w-6"
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

                                                            {/* Bottom */}
                                                            <div>
                                                                <p className="mb-1 rounded-sm bg-white px-2.5 py-1.5 text-xl font-bold text-black">
                                                                    {item.title}
                                                                </p>

                                                                <div className="mt-2 flex flex-row flex-wrap gap-4">
                                                                    {item?.categories?.map(
                                                                        (
                                                                            category,
                                                                            index
                                                                        ) => (
                                                                            <button
                                                                                key={index}
                                                                                className="flex h-6 w-28 items-center justify-center rounded-md bg-black text-xs text-white cursor-pointer"
                                                                            >
                                                                                {category.name}
                                                                            </button>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex w-full flex-col-3 gap-6 md:flex-row md:py-6 lg:flex-row lg:flex-wrap lg:justify-center" />
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}