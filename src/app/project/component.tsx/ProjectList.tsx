"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { fadeIn } from "@/src/shared/animation/variants";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

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

    technologies?: {
        technology: {
            id: string;
            name: string;
            technology?: string;
        };
    }[];

    descriptions?: {
        imagePath?: string;
        order?: number;
    }[];
}

interface OurProjectsProps {
    projects: Project[];
}

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL;

const motionProps = {
    variants: fadeIn("up", 0.1),
    initial: "hidden",
    whileInView: "show",
    viewport: {
        once: true,
        amount: 0.15,
    },
};

/* -------------------------------------------------------------------------- */
/*                              HELPER FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

const getProjectImage = (
    project: Project,
    isLargeCard: boolean
) => {

    const firstDescriptionImage =
        project.descriptions?.find(
            (desc) => desc.order === 0
        )?.imagePath ||
        project.descriptions?.[0]?.imagePath;

    return isLargeCard
        ? project.projectImagePath
        : firstDescriptionImage;
};

const getTechnologyList = (
    project: Project
) => {

    return (
        project.technologies
            ?.map(
                (tech) =>
                    tech?.technology?.technology
            )
            .join(", ") ||
        "No technologies listed"
    );
};

/* -------------------------------------------------------------------------- */
/*                               PROJECT CARD                                 */
/* -------------------------------------------------------------------------- */

const ProjectCard = ({
    project,
    index,
}: {
    project: Project;
    index: number;
}) => {

    const isLargeCard =
        index % 5 === 1;

    const colSpanClass = isLargeCard
        ? "md:col-span-6 lg:col-span-8"
        : "md:col-span-6 lg:col-span-4";

    const imagePath = getProjectImage(
        project,
        isLargeCard
    );

    if (!imagePath) {
        return null;
    }

    return (
        <motion.div
            {...motionProps}
            className={`col-span-1 ${colSpanClass}`}
        >

            {/* IMAGE */}

            <Link
                href={`/project/${project.slug}`}
            >
                <div
                    className="
                    relative
                    h-75
                    w-full
                    overflow-hidden
                    shadow-lg
                    lg:h-62.5
                    xl:h-100
                "
                >
                    <Image
                        src={`${BASE_URL}/uploads/${imagePath}`}
                        alt={
                            project.projectName ||
                            "Project image"
                        }
                        fill
                        className="object-cover"
                        sizes="
                        (max-width: 768px) 100vw,
                        (max-width: 1024px) 50vw,
                        33vw
                    "
                        unoptimized={true}
                    />
                </div>
            </Link>

            {/* CONTENT */}

            <div className="mt-5">

                <h3
                    className="
                    text-lg
                    font-bold
                    lg:text-base
                    xl:text-xl
                "
                >
                    {project.projectName}
                </h3>

                <p
                    className="
                    mt-1
                    text-sm
                    xl:text-base
                "
                >
                    {getTechnologyList(project)}
                </p>

            </div>

        </motion.div>
    );
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

const ProjectList = ({
    projects,
}: OurProjectsProps) => {

    const activeProjects =
        projects?.filter(
            (project) => project.status
        ) || [];

    return (
        <section
            className="
                flex
                justify-center
                py-5
                sm:px-8
                lg:pb-10
            "
        >

            <div
                className="
                    px-5
                    lg:px-10
                "
            >

                <div
                    className="
    grid
    grid-cols-1
    gap-6
    md:grid-cols-12
    lg:gap-10
"
                >

                    {activeProjects.map(
                        (project, index) => (

                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                            />

                        )
                    )}

                </div>

            </div>

        </section>
    );
};

export default ProjectList;