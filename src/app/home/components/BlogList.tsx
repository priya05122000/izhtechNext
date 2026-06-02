"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import CustomObject from "@/src/shared/components/CustomObjects";
import { fadeIn } from "@/src/shared/animation/variants";
import LinkButton from "@/src/shared/components/LinkButton";
import Image from "next/image";
import { MoveLeft, MoveRight } from "lucide-react";

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
                                {blogPosts
                                    .filter((item) => item.status === "true")
                                    .slice(0, 4)
                                    .map((item, index) => {
                                        const date = formatDate(
                                            item?.publishedDate?.toString()
                                        );

                                        const cleanImagePath = item?.imagePath
                                            ?.trim()
                                            .replace(/\\/g, "/");

                                        const imageUrl = `${BASE_URL}/uploads/${cleanImagePath}`;

                                        // if (item.status !== "true") return null;

                                        return (
                                            <div
                                                key={item.id}
                                                className="h-full sm:w-full md:w-[48%] lg:w-[30%] xl:w-[31%] item-center"
                                            >
                                                <motion.div
                                                    variants={fadeIn("up", index * 0.06)}
                                                    initial="hidden"
                                                    whileInView="show"
                                                    viewport={{
                                                        once: true,
                                                        amount: 0.15,
                                                    }}
                                                    className="relative"
                                                >
                                                    <Link href={`/blog/${item.slug}`}>
                                                        <div className="relative mx-auto h-80 sm:h-96 max-w-lg overflow-hidden rounded-md p-5
sm:p-6
lg:p-8">

                                                            {/* Background Image */}
                                                            {/* <div
                                                            className="absolute inset-0 z-0 bg-cover bg-center"
                                                            style={{
                                                                backgroundImage: `url('${imageUrl}')`,
                                                            }}
                                                        /> */}

                                                            <Image
                                                                src={imageUrl}
                                                                alt={item.title}
                                                                fill
                                                                className="z-0 object-cover "
                                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                                unoptimized={true}
                                                            />

                                                            {/* Overlay */}
                                                            <div className="absolute inset-0 z-0 bg-[#000000a3]" />

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

                                                                        <MoveLeft className="h-6 w-5 text-white xl:w-6" />

                                                                        <MoveRight className="h-6 w-5 text-white xl:w-6" />
                                                                    </div>
                                                                </div>

                                                                {/* Bottom */}
                                                                <div>
                                                                    <p className="mb-1 rounded-sm bg-white px-2.5 py-1.5 text-xl font-bold text-black">
                                                                        {item.title}
                                                                    </p>

                                                                    <div className="mt-3 flex flex-row flex-wrap gap-2">
                                                                        {item?.categories?.map(
                                                                            (
                                                                                category,
                                                                                index
                                                                            ) => (
                                                                                <span
                                                                                    key={index}
                                                                                    className="flex h-6 px-2 items-center justify-center rounded  text-xs text-white "
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