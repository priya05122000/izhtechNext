"use client";

import { fadeIn } from "@/src/shared/animation/variants";
import { motion } from "framer-motion";
import SectionViewHeader from "@/src/shared/components/SectionViewHeader";
import LinkButton from "@/src/shared/components/LinkButton";
import styles from "./project.module.css"


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
        <section className="flex justify-center py-5 lg:py-8 sm:py-10 px-5 sm:px-8">
            <div className="md:container overflow-hidden">

                <SectionViewHeader header="Our Projects" title={projectSlug?.projectName} />


                <div className="lg:px-10">

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
                            <h2 className="text-4xl font-bold lg:text-5xl md:text-3xl sm:text-3xl mb-10">
                                {projectSlug?.projectName} Overview
                            </h2>
                            <h3 className="sr-only">
                                Detailed overview and case study of {projectSlug?.projectName}
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
                                            min-h-75
                                            ${index % 2 === 0
                                                ? "float-left md:mr-8 lg:mr-10"
                                                : "float-right md:ml-8 lg:ml-10"
                                            }
                                        `}
                                    />

                                    <div
                                        className={`text-md lg:text-lg text-gray-700 ${styles["project-description"]}`}
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
                            <LinkButton
                                href={projectSlug.projectUrl}
                                className="text-white bg-black border h-8 py-1 px-4 w-32 mt-0"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View more
                            </LinkButton>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default ProjectView;