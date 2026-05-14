// BlogView.tsx

"use client";

import React from "react";

import { motion } from "framer-motion";
import { CircleUser } from "lucide-react";

import { fadeIn } from "@/src/shared/animation/variants";
import SharedButton from "@/src/shared/components/SharedButton";
import SectionViewHeader from "@/src/shared/components/SectionViewHeader";

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
    description: string;
    icon: string;
    shortDescription: string;
    imagePath: string;
    blog: PostModel[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

interface BlogViewProps {
    blogSlug: PostModel;
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
};

const BlogView = ({
    blogSlug,
}: BlogViewProps) => {

    const formattedDate =
        blogSlug?.publishedDate
            ? formatDate(
                blogSlug.publishedDate.toString()
            )
            : "";

    const imageUrl =
        blogSlug?.imagePath
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${blogSlug.imagePath}`
            : "";

    return (
        <section className="lg:px-8 mx-auto bg-transparent md:container">

            {/* Header */}
            {/* <div className="lg:flex gap-4 py-5">

                <div className="lg:w-[85%]">

                    <motion.div
                        variants={fadeIn("down", 0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                    >

                        <p className="text-base text-gray-600">
                            {blogSlug?.categories
                                ?.map((cat) => cat.name)
                                .join(" | ")}
                        </p>

                        <h1 className="pt-2 text-5xl font-bold lg:w-3/4">
                            {blogSlug?.title}
                        </h1>

                        <p className="pt-4 pb-4 text-base text-gray-800">
                            {blogSlug?.shortNote}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeIn("right", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        className="flex flex-wrap items-center gap-4"
                    >

                        <div className="flex items-center gap-2">
                            <CircleUser
                                size={28}
                                color="black"
                            />

                            <div className="text-xs">
                                <p>Posted by</p>

                                <p className="font-medium">
                                    {blogSlug?.author?.name}
                                </p>
                            </div>
                        </div>

                        <div className="text-xs">
                            <p>Published</p>

                            <p className="font-medium">
                                {formattedDate}
                            </p>
                        </div>

                        <SharedButton
                            title={blogSlug?.title}
                            imageUrl={imageUrl}
                        />

                    </motion.div>
                </div>
            </div> */}

            <section className="flex justify-center py-5 lg:py-8 sm:py-10 ">
                <div className="md:container overflow-hidden lg:w-[85%] me-auto">
                    <SectionViewHeader header={blogSlug?.categories
                        ?.map((cat) => cat.name)
                        .join(" | ")} title={blogSlug?.title} />


                    <p className=" pb-4 text-base text-gray-800">
                        {blogSlug?.shortNote}
                    </p>
                    <motion.div
                        variants={fadeIn("right", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        className="flex flex-wrap items-center gap-4"
                    >

                        <div className="flex items-center gap-2">
                            <CircleUser
                                size={28}
                                color="black"
                            />

                            <div className="text-xs">
                                <p>Posted by</p>

                                <p className="font-medium">
                                    {blogSlug?.author?.name}
                                </p>
                            </div>
                        </div>

                        <div className="text-xs">
                            <p>Published</p>

                            <p className="font-medium">
                                {formattedDate}
                            </p>
                        </div>

                        <SharedButton
                            title={blogSlug?.title}
                            imageUrl={imageUrl}
                        />

                    </motion.div>
                </div>
            </section>



            {/* Image */}
            {imageUrl && (

                <motion.div
                    variants={fadeIn("zoom", 0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    className="w-full h-[500px] overflow-hidden rounded-md"
                >

                    <img
                        src={imageUrl}
                        alt={blogSlug?.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            )}

            {/* Description */}
            <motion.div
                variants={fadeIn("right", 0.4)}
                initial="hidden"
                whileInView="show"
                viewport={{
                    once: true,
                    amount: 0.2,
                }}
                className="pt-6 blog-content"
                dangerouslySetInnerHTML={{
                    __html:
                        blogSlug?.description || "",
                }}
            />

            {/* Tags */}
            {blogSlug?.tags && (

                <motion.div
                    variants={fadeIn("up", 0.5)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{
                        once: true,
                        amount: 0.1,
                    }}
                    className="pt-4 mb-8"
                >

                    <p className="text-base">
                        Tagged with:
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">

                        {blogSlug.tags
                            .split(/[ ,.!?]+/)
                            .filter(Boolean)
                            .map((tag, index) => (

                                <span
                                    key={index}
                                    className="h-6 px-2 text-sm rounded bg-gray-200 text-slate-800 flex items-center"
                                >
                                    {tag}
                                </span>
                            ))}
                    </div>
                </motion.div>
            )}
        </section>
    );
};

export default BlogView;