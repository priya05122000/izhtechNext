"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    }[];
}

interface ProjectsSectionProps {
    projects: Project[];
}

const ProjectsSection = ({
    projects,
}: ProjectsSectionProps) => {

    const router = useRouter();

    const [isDesktop, setIsDesktop] =
        useState(false);

    const [showButton, setShowButton] =
        useState(false);

    const sectionRef =
        useRef<HTMLDivElement>(null);

    const imageRefs = useRef<
        (HTMLImageElement | null)[]
    >([]);

    const textRefs = useRef<
        (HTMLDivElement | null)[]
    >([]);

    useEffect(() => {

        setIsDesktop(window.innerWidth > 768);

        const handleResize = () => {
            setIsDesktop(
                window.innerWidth > 768
            );
        };

        window.addEventListener(
            "resize",
            handleResize
        );

        return () =>
            window.removeEventListener(
                "resize",
                handleResize
            );

    }, []);

    useEffect(() => {

        if (!isDesktop) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {

            imageRefs.current.forEach((img, i) => {

                if (!img) return;

                gsap.set(img, {
                    clipPath:
                        i === 0
                            ? "inset(0% 0% 0% 0%)"
                            : "inset(100% 0% 0% 0%)",
                    zIndex: i + 1,
                });
            });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: ".sticky-image-wrapper",
                pinSpacing: false,
            });

            textRefs.current.forEach((text, index) => {

                if (!text) return;

                const currentImage =
                    imageRefs.current[index];

                const nextImage =
                    imageRefs.current[index + 1];

                if (!currentImage) return;

                ScrollTrigger.create({
                    trigger: text,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,

                    onUpdate: (self) => {

                        const progress =
                            self.progress;

                        if (nextImage) {

                            gsap.to(nextImage, {
                                clipPath: `inset(${100 - progress * 100
                                    }% 0% 0% 0%)`,
                                ease: "none",
                                duration: 0,
                            });
                        }
                    },
                });
            });

        }, sectionRef);

        return () => ctx.revert();

    }, [isDesktop]);

    useEffect(() => {

        const handleScrollForButton =
            () => {

                const section =
                    sectionRef.current;

                if (!section) return;

                const rect =
                    section.getBoundingClientRect();

                const isScrollingInsideShowcase =
                    rect.top <= 0 &&
                    rect.bottom >
                    window.innerHeight;

                setShowButton(
                    isScrollingInsideShowcase
                );
            };

        window.addEventListener(
            "scroll",
            handleScrollForButton
        );

        handleScrollForButton();

        return () =>
            window.removeEventListener(
                "scroll",
                handleScrollForButton
            );

    }, []);

    return (
        <section className="container-fluid overflow-hidden">

            <div className="ProjectsSection">

                {isDesktop ? (

                    <div
                        ref={sectionRef}
                        className="relative flex"
                    >

                        {/* LEFT TEXT */}

                        <div className="w-1/2">

                            {projects?.map((project, index) => {

                                if (!project.status) return null;

                                return (

                                    <div
                                        key={project.id}
                                        ref={(el) => {
                                            textRefs.current[index] = el;
                                        }}
                                        className="h-screen flex items-center justify-center"
                                    >

                                        <div className="w-[70%]">

                                            <span className="text-sm mb-3 block">
                                                {project.projectName}
                                            </span>

                                            <h2 className="text-[48px] leading-[1.1] font-bold">
                                                {project.title}
                                            </h2>

                                            <div
                                                className="mt-5 text-[16px]"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        project.shortNote || "",
                                                }}
                                            />

                                            <Link
                                                href={`/project/${project.slug}`}
                                                className="inline-flex mt-8 border border-black px-6 py-3 rounded-md"
                                            >
                                                View Project
                                            </Link>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                        {/* RIGHT IMAGE */}

                        <div className="w-1/2 relative">

                            <div className="sticky-image-wrapper h-screen flex items-center justify-center overflow-hidden">

                                <div className="relative w-[42vw] h-[28vw] overflow-hidden">

                                    {projects?.map((project, index) => (

                                        <img
                                            key={project.id}
                                            ref={(el) => {
                                                imageRefs.current[index] = el;
                                            }}
                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${project.featuredImagePath}`}
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                ) : (

                    <div className="min-h-screen w-full py-10">

                        {projects?.map(
                            (
                                project,
                                index
                            ) =>
                                project.status ? (

                                    <div
                                        key={
                                            project.id
                                        }
                                        className="flex flex-col pb-10 px-5"
                                    >

                                        <Link
                                            href={`/project/${project.slug}`}
                                        >

                                            <img
                                                alt={`img${index}`}
                                                className="w-full h-full object-cover mb-5 rounded-xl"
                                                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${project.projectImagePath}`}
                                            />

                                        </Link>

                                        <span className="text-[15px] mb-2 block">
                                            {
                                                project.projectName
                                            }
                                        </span>

                                        <h4 className="text-[28px] font-bold text-[#222]">
                                            {
                                                project.title
                                            }
                                        </h4>

                                        <div
                                            className="text-[15px] mt-5 mb-5 text-[#222]"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    project.shortNote ||
                                                    "",
                                            }}
                                        />

                                        <Link
                                            href={`/project/${project.slug}`}
                                            className="inline-flex items-center justify-center border border-black px-5 py-2 rounded-md font-semibold"
                                        >
                                            View
                                            More
                                        </Link>

                                    </div>

                                ) : null
                        )}

                    </div>
                )}

            </div>
        </section>
    );
};

export default ProjectsSection;