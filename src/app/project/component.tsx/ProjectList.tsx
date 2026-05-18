"use client"
import React from 'react'
import { motion } from "framer-motion";
import { fadeIn } from '@/src/shared/animation/variants';

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
        // add other fields if needed
    }[];
}

interface OurProjectsProps {
    projects: Project[];
}

const ProjectList = ({ projects }: OurProjectsProps) => {
    return (
        <section className="flex justify-center py-5  lg:pb-10 sm:px-8">

            <div className="px-5  lg:px-10">
                <div className="grid grid-cols-1  md:grid-cols-12 gap-10">
                    {projects
                        ?.filter((project) => project.status)
                        .map((project, index) => {
                            const isColSpan8 = index % 5 === 1;
                            const colSpanClass = isColSpan8
                                ? "md:col-span-6 lg:col-span-8"
                                : "md:col-span-6 lg:col-span-4";

                            // const imagePath = isColSpan8
                            //   ? project.projectImagePath
                            //   : project.descriptions?.[0]?.imagePath;

                            const firstDescriptionImage =
                                project.descriptions?.find((d: any) => d.order === 0)?.imagePath;

                            const imagePath = isColSpan8
                                ? project.projectImagePath
                                : firstDescriptionImage;

                            const slug = project.slug;

                            return (
                                <div className={`col-span-1 ${colSpanClass}`} key={index}>
                                    {/* <div className=" w-full h-[503px] overflow-hidden"> */}
                                    <div className=" h-fit w-full p-0 m-0">
                                        {imagePath &&
                                            (project?.projectUrl ? (
                                                <motion.div
                                                    variants={fadeIn("up", 0.1)}
                                                    initial="hidden"
                                                    whileInView={"show"}
                                                    viewport={{ once: false, amount: 0.1 }}
                                                >
                                                    <a
                                                        href={`project/${slug}`}
                                                        rel="noopener noreferrer "
                                                    >
                                                        <img
                                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${imagePath}`}
                                                            className="h-75 lg:h-62.5 xl:h-100 shadow-lg object-cover w-full "
                                                            alt={project.projectName || "Project image"}
                                                        />

                                                    </a>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    variants={fadeIn("up", 0.1)}
                                                    initial="hidden"
                                                    whileInView={"show"}
                                                    viewport={{ once: false, amount: 0.1 }}
                                                >
                                                    <a
                                                        href={`project/${slug}`}
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img
                                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${imagePath}`}
                                                            className="h-75 lg:h-62.5 xl:h-100 shadow-lg object-cover w-full"
                                                            alt={project.projectName || "Project image"}
                                                        />
                                                    </a>
                                                </motion.div>
                                            ))}
                                    </div>

                                    <motion.div
                                        variants={fadeIn("up", 0.1)}
                                        initial="hidden"
                                        whileInView={"show"}
                                        viewport={{ once: false, amount: 0.1 }}
                                    >
                                        <h3 className="text-lg lg:text-md xl:text-xl font-bold mt-5">
                                            {project.projectName}
                                        </h3>
                                        <p className="text-sm xl:text-base mt-1 ">
                                            {/* {project.technologies?.map(tech => tech?.technology?.technology).join(', ') || "No technologies listed"} */}
                                            {project.technologies
                                                ?.map((tech) => (tech?.technology as any)?.technology)
                                                .join(", ") || "No technologies listed"}
                                        </p>
                                    </motion.div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    )
}

export default ProjectList
