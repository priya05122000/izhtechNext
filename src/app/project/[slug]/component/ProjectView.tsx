"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { fadeIn } from "@/src/shared/animation/variants";

import SectionViewHeader from "@/src/shared/components/SectionViewHeader";
import LinkButton from "@/src/shared/components/LinkButton";

import styles from "./project.module.css";

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
        };
    }[];

    descriptions?: {
        imagePath?: string;
        description?: string;
    }[];
}

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL;

const motionProps = (
    direction:
        | "left"
        | "right"
        | "up"
) => ({
    variants: fadeIn(direction, 0.1),
    initial: "hidden",
    whileInView: "show",
    viewport: {
        once: true,
        amount: 0.15,
    },
});

/* -------------------------------------------------------------------------- */
/*                              HERO IMAGE SECTION                            */
/* -------------------------------------------------------------------------- */

const HeroImage = ({
    imagePath,
    title,
}: {
    imagePath: string;
    title?: string;
}) => {
    return (
        <motion.div {...motionProps("left")}>

            <div
                className="
                    relative
                    w-full
                    overflow-hidden
                    xl:h-112.5
                "
            >
                <Image
                    src={`${BASE_URL}/uploads/${imagePath}`}
                    alt={title || "Project Image"}
                    width={1600}
                    height={900}
                    sizes="100vw"
                    className="
                        h-full
                        w-full
                        object-cover
                    "
                />
            </div>

        </motion.div>
    );
};

/* -------------------------------------------------------------------------- */
/*                              INTRO CONTENT                                 */
/* -------------------------------------------------------------------------- */

const ProjectIntro = ({
    title,
    shortNote,
}: {
    title?: string;
    shortNote?: string;
}) => {
    return (
        <motion.div
            {...motionProps("up")}
            className="mt-8"
        >

            <p
                className="
                    text-start
                    text-sm
                    text-[rgba(22,21,25,0.43)]
                    md:text-[16.4px]
                "
            >
                {title}
            </p>

            <div
                className="
                    mt-4
                    text-xl
                    lg:text-2xl
                "
                style={{ lineHeight: 1.4 }}
                dangerouslySetInnerHTML={{
                    __html: shortNote || "",
                }}
            />

        </motion.div>
    );
};

/* -------------------------------------------------------------------------- */
/*                             DESCRIPTION BLOCK                              */
/* -------------------------------------------------------------------------- */

const DescriptionBlock = ({
    description,
    imagePath,
    projectName,
    sizes,
    index,
}: {
    description?: string;
    imagePath?: string;
    projectName?: string;
    sizes?: string;
    index: number;
}) => {

    const isEven = index % 2 === 0;

    return (
        <motion.div
            className="mb-10 lg:mb-16"
            {...motionProps(
                isEven ? "right" : "left"
            )}
        >

            <div className="clearfix">

                {/* IMAGE */}
                {imagePath && (

                    <Image
                        src={`${BASE_URL}/uploads/${imagePath}`}
                        alt={`${projectName} image ${index + 1}`}
                        width={1200}
                        height={800}
                        loading="lazy"
                        sizes={sizes}
                        className={`
                        mb-4
                        min-h-75
                        w-full
                        object-cover
                        md:w-1/2
                        lg:w-[35%]

                        ${isEven
                                ? "float-left md:mr-8 lg:mr-10"
                                : "float-right md:ml-8 lg:ml-10"
                            }
                    `}
                    />

                )}

                {/* DESCRIPTION */}

                <div
                    className={`
                        text-base
                        text-gray-700
                        lg:text-lg
                        ${styles["project-description"]}
                    `}
                    dangerouslySetInnerHTML={{
                        __html: description || "",
                    }}
                />

                <div className="clear-both" />

            </div>

        </motion.div>
    );
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

const ProjectView = ({
    projectSlug,
}: {
    projectSlug: Project;
}) => {

    const heroImage =
        projectSlug?.projectImagePath ||
        projectSlug?.featuredImagePath ||
        "";

    return (
        <section
            className="
                flex
                justify-center
                px-5
                py-5
                sm:px-8
                sm:py-10
                lg:py-8
            "
        >

            <div
                className="
                    overflow-hidden
                    md:container
                "
            >

                {/* HEADER */}

                <SectionViewHeader
                    header="Our Projects"
                    title={projectSlug?.projectName}
                />

                <div className="lg:px-10">

                    {/* HERO SECTION */}

                    <div className="py-8 sm:py-10">

                        <HeroImage
                            imagePath={heroImage}
                            title={projectSlug?.projectName}
                        />

                        <ProjectIntro
                            title={projectSlug?.title}
                            shortNote={projectSlug?.shortNote}
                        />

                    </div>

                    {/* OVERVIEW */}

                    <div className="mt-8">

                        <motion.div
                            {...motionProps("right")}
                        >

                            <h2
                                className="
                                    mb-10
                                    font-bold
                                   text-3xl sm:text-4xl lg:text-5xl
                                "
                            >
                                {projectSlug?.projectName}
                                {" "}
                                Overview
                            </h2>

                            <h3 className="sr-only">
                                Detailed overview and
                                case study of
                                {" "}
                                {projectSlug?.projectName}
                            </h3>

                        </motion.div>

                        {/* DESCRIPTION LIST */}

                        {projectSlug?.descriptions?.map(
                            (desc, index) => (
                                <DescriptionBlock
                                    key={index}
                                    description={desc.description}
                                    imagePath={desc.imagePath}
                                    projectName={projectSlug.projectName}
                                    index={index}
                                    sizes="
    (max-width: 768px) 100vw,
    (max-width: 1024px) 50vw,
    35vw
"
                                />
                            )
                        )}

                    </div>

                    {/* BUTTON */}

                    {projectSlug?.projectUrl && (

                        <div className="flex justify-end">

                            <LinkButton
                                href={projectSlug.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    mt-0
                                    h-8
                                    w-32
                                    border
                                    bg-black
                                    px-4
                                    py-1
                                    text-white
                                "
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