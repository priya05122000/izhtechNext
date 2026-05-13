"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import LinkButton from "@/src/shared/components/LinkButton";

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

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {

    const [isDesktop, setIsDesktop] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const router = useRouter();

    useEffect(() => {

        setIsDesktop(window.innerWidth > 500);

        const handleResize = () => {
            setIsDesktop(window.innerWidth > 500);
        };

        window.addEventListener("resize", handleResize);

        return () =>
            window.removeEventListener("resize", handleResize);

    }, []);

    useEffect(() => {

        if (!isDesktop || !projects || projects.length === 0)
            return;

        const activeProjects = projects.filter(
            (project) => project.status
        );

        const bgColors = activeProjects.map(
            (project) => project.bgColor || "#ffffff"
        );

        const runScrollAnimation = () => {

            const images =
                document.querySelectorAll<HTMLImageElement>(
                    ".show-image"
                );

            const showcase =
                document.querySelector<HTMLElement>(
                    ".showcase-pin"
                );

            const showcaseBg =
                document.querySelector<HTMLElement>(
                    ".show-back"
                );

            const texts =
                document.querySelectorAll<HTMLDivElement>(
                    ".show-text .show-text-contain > div"
                );

            if (
                !showcase ||
                !showcaseBg ||
                images.length === 0 ||
                texts.length === 0
            ) {
                return;
            }

            images.forEach((img, i) => {
                img.style.opacity = i === 0 ? "1" : "0";
                img.style.zIndex = i === 0 ? "10" : "1";
                img.style.transform =
                    i === 0
                        ? "translateY(0%)"
                        : "translateY(10%)";
            });

            let ticking = false;

            const handleScroll = () => {

                if (!ticking) {

                    requestAnimationFrame(() => {

                        updateScrollEffects();

                        ticking = false;

                    });

                    ticking = true;
                }
            };

            const updateScrollEffects = () => {

                const scrollY = window.scrollY;

                const sectionTop = showcase.offsetTop;

                const sectionBottom =
                    sectionTop + showcase.offsetHeight;

                const totalSections = bgColors.length;

                const eachSectionHeight =
                    showcase.offsetHeight / totalSections;

                const scrollWithin = scrollY - sectionTop;

                if (
                    scrollY < sectionTop ||
                    scrollY > sectionBottom
                ) {

                    showcaseBg.style.backgroundColor =
                        "transparent";
                }

                texts.forEach((text, i) => {

                    const eachSectionStart =
                        i * eachSectionHeight;

                    const eachSectionEnd =
                        eachSectionStart + eachSectionHeight;

                    let progress =
                        (scrollWithin - eachSectionStart) /
                        eachSectionHeight;

                    progress = Math.min(
                        Math.max(progress, 0),
                        1
                    );

                    if (
                        scrollWithin >= eachSectionStart &&
                        scrollWithin < eachSectionEnd
                    ) {

                        showcaseBg.style.backgroundColor =
                            progress > 0.5
                                ? bgColors[i + 1] ||
                                bgColors[i]
                                : bgColors[i];

                        text.style.opacity = "1";

                        text.style.transform =
                            "translateY(0)";

                        images.forEach((img) => {

                            img.style.opacity = "0";

                            img.style.zIndex = "0";

                            img.style.transform =
                                "translateY(10%)";

                            img.style.clipPath =
                                "inset(0px 0px 0px 0px)";
                        });

                        images[i].style.opacity = "1";

                        images[i].style.zIndex = "10";

                        images[i].style.transform =
                            "translateY(0%)";

                        if (i === texts.length - 1) {

                            images[i].style.clipPath =
                                "inset(0px 0px 0px 0px)";

                        } else {

                            images[i].style.clipPath =
                                `inset(0px 0px ${Math.min(
                                    Math.max(
                                        ((progress - 0.3) *
                                            100) /
                                        0.7,
                                        0
                                    ),
                                    100
                                )
                                }% 0px)`;
                        }

                        if (images[i + 1]) {

                            images[i + 1].style.opacity =
                                progress.toString();

                            images[i + 1].style.zIndex =
                                "5";

                            images[i + 1].style.transform =
                                `translateY(${(1 - progress) * 5
                                }%)`;
                        }
                    }
                });
            };

            window.addEventListener(
                "scroll",
                handleScroll
            );

            updateScrollEffects();

            return () =>
                window.removeEventListener(
                    "scroll",
                    handleScroll
                );
        };

        setTimeout(() => {

            requestAnimationFrame(
                runScrollAnimation
            );

        }, 100);

    }, [isDesktop, projects]);

    useEffect(() => {

        const handleScrollForButton = () => {

            const section =
                document.querySelector(".showcase-pin");

            if (!section) return;

            const rect =
                section.getBoundingClientRect();

            const isScrollingInsideShowcase =
                rect.top <= 0 &&
                rect.bottom > window.innerHeight;

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
        <section className="container-fluid">

            <div className="ProjectsSection">

                {isDesktop ? (
                    <>
                        <div
                            className="showcase-pin relative min-h-screen flex"
                        >
                            <div className="show-text relative overflow-hidden w-1/2 h-full">

                                <div className="show-text-contain relative w-full h-full">

                                    {projects?.map(
                                        (project, index) => {

                                            if (!project.status)
                                                return null;

                                            return (

                                                <div
                                                    key={index}
                                                    className='mt-3.25   relative w-1/2 md:w-[70%] lg:w-[65%] xl:w-1/2 h-screen text-left flex flex-col ml-auto mr-[25.2px] justify-center items-start transition-opacity duration-300 ease-in-out  '
                                                >
                                                    <div>
                                                        <span className="span-back font-normal pointer-events-none text-[15px] md:text-[14px] lg:text-[15px] mb-2">
                                                            {project.projectName}
                                                        </span>

                                                        <h4 className="text-[26px] md:text-[20px] lg:text-[22px] xl:text-[26px] font-bold pr-[0.6rem] tracking-[0.4px] text-[#222]">
                                                            {project.title}
                                                        </h4>

                                                        <h4
                                                            className="text-[15px] md:text-[14px] lg:text-[15px] font-semibold pr-[0.6rem] tracking-[0.4px] text-[#222] mt-4"
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    project.shortNote ||
                                                                    "",
                                                            }}
                                                        />

                                                        <div className="btn-container mt-5">

                                                            <LinkButton variant="outline" href={`/project/${project.slug}`}>View More</LinkButton>

                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                            <div className="show-images sticky top-0 overflow-hidden w-1/2 h-screen flex items-center ">
                                <div className="show-img-contain relative w-[40vw] md:w-[40vw] lg:w-[40vw] h-[25vw]  md:h-[40vw] lg:h-[35vw] xl:h-[25vw] overflow-hidden">

                                    {projects?.map(
                                        (project, index) =>
                                            project.status ? (
                                                <img
                                                    key={index}
                                                    alt={`img${index}`}
                                                    className={`show-image absolute w-full h-full object-contain object-center transition-opacity duration-500 ease-in-out opacity-100! transform! translate-y-0! z-10 cursor-pointer`}
                                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${project?.featuredImagePath}`}
                                                    onClick={() =>
                                                        router.push(
                                                            `/project/${project.slug}`
                                                        )
                                                    }
                                                />
                                            ) : null
                                    )}
                                </div>
                            </div>

                            <div className="show-back fixed top-0 left-0 w-full h-screen z-[-1] transition-all duration-300 ease-in-out"></div>

                            {showButton && (

                                <Link
                                    href="/project"
                                    onClick={() =>
                                        window.scrollTo(
                                            0,
                                            0
                                        )
                                    }
                                    className="fixed bottom-10 right-10 z-50 bg-black text-white p-[8px_16px] rounded-md max-w-full"
                                >
                                    View All Projects
                                </Link>
                            )}
                        </div>
                    </>
                ) : (

                    <div className="showcase-mobile-container min-h-screen w-full py-10">

                        {projects?.map(
                            (project, index) =>
                                project.status ? (

                                    <div
                                        key={index}
                                        className="mobile-showcase-box flex items-start justify-center flex-col pb-5 px-5"
                                    >

                                        <div className="showcase-container">

                                            <Link
                                                href={`/project/${project.slug}`}
                                                className="w-full h-full"
                                            >

                                                <img
                                                    alt={`img${index}`}
                                                    className="show-image w-full h-full object-cover mb-5"
                                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${project?.projectImagePath}`}
                                                />

                                            </Link>
                                        </div>

                                        <span className="span-back font-normal pointer-events-none text-[16.4px] mb-2">
                                            {project.projectName}
                                        </span>

                                        <h4 className="text-[20px] font-bold tracking-[0.4px] text-[#222]">
                                            {project.title}
                                        </h4>

                                        <h4
                                            className="text-[15.6px] font-semibold tracking-[0.4px] text-[#222] mt-5 mb-5"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    project.shortNote ||
                                                    "",
                                            }}
                                        />

                                        <div className="btn-container">

                                            {/* <Link
                                                href={`/project/${project.slug}`}
                                                className="transition-colors focus-visible:outline-none flex items-center justify-center text-sm font-bold rounded h-8 py-1 px-4 w-32 border border-black bg-transparent text-black relative group"
                                            >
                                                <span className="transition-transform duration-300 group-hover:-translate-x-3">
                                                    View more
                                                </span>
                                            </Link> */}
                                            <LinkButton href={`/project/${project.slug}`}>View More</LinkButton>
                                        </div>
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