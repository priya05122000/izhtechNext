"use client";

import { fadeIn } from "@/src/shared/animation/variants";
import { motion } from "framer-motion";
import Link from "next/link";
import CustomObject from "@/src/shared/components/CustomObjects";
import React from "react";
import SectionViewHeader from "@/src/shared/components/SectionViewHeader";

interface Project {
    id: string;
    title: string;
    projectName?: string;
    slug: string;
    shortNote?: string;
    featuredImagePath?: string;
    projectImagePath?: string;
    projectUrl?: string;
    status: boolean;
    order?: number;
    bgColor?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    technologies?: {
        technology: {
            id: string;
            name: string;
        };
    }[];

    descriptions?: {
        imagePath?: string;
        description?: string;
    }[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProjectView = ({ projectSlug }: { projectSlug: Project }) => {
    return (
        <section className="flex justify-center py-5 lg:py-8 sm:py-10 px-8">
            <div className="md:container overflow-hidden">

                <SectionViewHeader header="Our Projects" title={projectSlug?.projectName} />

                <div className="px-5 lg:px-10">

                    <div className="py-8 sm:py-10">

                        <motion.div
                            variants={fadeIn("left", 0.1)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.1 }}
                        >
                            <img
                                src={`${BASE_URL}/${projectSlug?.projectImagePath || projectSlug?.featuredImagePath || ""
                                    }`}
                                alt={projectSlug?.projectName || "Project Image"}
                                className="w-full object-cover h-full xl:h-112.5"
                            />
                        </motion.div>

                        <motion.div
                            variants={fadeIn("up", 0.1)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.1 }}
                            className="mt-8"
                        >
                            <p className="text-start text-sm md:text-[16.4px] text-[rgba(22,21,25,0.43)]">
                                {projectSlug?.title}
                            </p>

                            <div
                                className="mt-4 text-xl lg:text-2xl"
                                style={{ lineHeight: 1.4 }}
                                dangerouslySetInnerHTML={{
                                    __html: projectSlug?.shortNote || "",
                                }}
                            />
                        </motion.div>
                    </div>

                    <div className="mt-8">

                        <motion.div
                            variants={fadeIn("right", 0.1)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.1 }}
                        >
                            <h3 className="text-4xl font-bold lg:text-5xl md:text-3xl sm:text-3xl mb-10">
                                Project Overview
                            </h3>
                        </motion.div>

                        {projectSlug?.descriptions?.map((desc, index) => (
                            <motion.div
                                key={index}
                                className="mb-10 lg:mb-16"
                                variants={fadeIn(
                                    index % 2 === 0 ? "right" : "left",
                                    0.1
                                )}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: false, amount: 0.1 }}
                            >
                                <div className="clearfix">

                                    <img
                                        src={`${BASE_URL}/${desc?.imagePath || ""}`}
                                        alt={`Project ${index + 1}`}
                                        className={`
                                            w-full
                                            md:w-1/2
                                            lg:w-[35%]
                                            mb-4
                                            object-cover
                                            min-h-[300px]
                                            ${index % 2 === 0
                                                ? "float-left md:mr-8 lg:mr-10"
                                                : "float-right md:ml-8 lg:ml-10"
                                            }
                                        `}
                                    />

                                    <div
                                        className="text-md lg:text-lg text-gray-700 project-description"
                                        dangerouslySetInnerHTML={{
                                            __html: desc?.description || "",
                                        }}
                                    />

                                    <div className="clear-both"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {projectSlug?.projectUrl && (
                        <div className="flex justify-end">
                            <Link
                                href={projectSlug.projectUrl}
                                target="_blank"
                                className="
                                    transition-colors
                                    focus-visible:outline-none
                                    focus-visible:ring-2
                                    focus-visible:ring-ring
                                    focus-visible:ring-offset-2
                                    disabled:opacity-50
                                    disabled:pointer-events-none
                                    ring-offset-background
                                    flex
                                    items-center
                                    justify-center
                                    text-sm
                                    font-bold
                                    text-white
                                    rounded
                                    border
                                    h-8
                                    py-1
                                    px-4
                                    w-32
                                    mt-0
                                    bg-black
                                    relative
                                    group
                                "
                            >
                                <span className="transition-transform duration-300 group-hover:-translate-x-3">
                                    View more
                                </span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="absolute w-4 h-4 transition-opacity duration-300 opacity-0 right-3 group-hover:opacity-100"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default ProjectView;