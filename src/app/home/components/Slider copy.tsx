"use client";

import { Carousel } from "flowbite-react";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CustomObject from "@/src/shared/components/CustomObjects";
import React from "react";

interface Testimonials {
    id: string;
    name: string;
    designation?: string;
    companyName?: string;
    companyLocation?: string;
    testimonials: string;
    isActive: boolean | string;
    logo?: string;
    imagePath?: string;
    youTubeUrl?: string;
    order: number;
    // serviceId: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

interface TestimonialProps {
    testimonials: Testimonials[];
}

const Slider = ({ testimonials }: TestimonialProps) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const customTheme = {
        root: {
            base: "relative h-60 w-full",
            leftControl:
                "absolute top-10 lg:top-0 left-4 md:left-36 flex h-full items-center justify-center px-4 focus:outline-none",
            rightControl:
                "absolute top-10 lg:top-0 right-4 md:right-36 flex h-full items-center justify-center px-4 focus:outline-none",
        },
        indicators: {
            active: {
                off: "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
                on: "bg-white dark:bg-gray-800",
            },
            base: "h-3 w-3 rounded-full",
            wrapper:
                "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
        },
        item: {
            base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
            wrapper: {
                off: "w-full flex-shrink-0 transform cursor-default snap-center",
                on: "w-full flex-shrink-0 transform cursor-grab snap-center active:cursor-grabbing",
            },
        },
        control: {
            base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
            icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6",
        },
        scrollContainer: {
            base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg touch-pan-x md:overflow-x-hidden [-webkit-overflow-scrolling:touch]",
            snap: "snap-x",
        },
    };

    const activeTestimonials = testimonials
        ?.filter(testimonial => testimonial?.isActive)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) || [];

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const handleTouchStart = (e: TouchEvent) => {
            setStartX(e.touches[0].clientX);
            setIsDragging(true);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging) return;
            const x = e.touches[0].clientX;
            const diff = startX - x;
            if (Math.abs(diff) > 5) { // Threshold to prevent accidental scrolls
                carousel.scrollLeft += diff;
                setStartX(x);
            }
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
        };

        carousel.addEventListener('touchstart', handleTouchStart);
        carousel.addEventListener('touchmove', handleTouchMove);
        carousel.addEventListener('touchend', handleTouchEnd);

        return () => {
            carousel.removeEventListener('touchstart', handleTouchStart);
            carousel.removeEventListener('touchmove', handleTouchMove);
            carousel.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, startX]);

    return (
        <section className="px-5 py-16 text-center bg-[#F5F1F5] md:px-0 mb-0 xl:mb-10 h-full relative overflow-hidden">
            <div className="h-full">
                <h3 className="pt-6 font-bold text-center text-md lg:text-5xl md:text-4xl sm:text-4xl">
                    Meet our customers.
                </h3>

                <div className="relative h-full">
                    {activeTestimonials.length > 0 ? (
                        <div ref={carouselRef}>
                            <Carousel
                                theme={customTheme}
                                leftControl={<MoveLeft />}
                                rightControl={<MoveRight />}
                                indicators={false}
                                slide={false}
                                draggable
                            >
                                {activeTestimonials.map((testimonial, index) => (
                                    <div key={index} className="flex items-center justify-center h-full dark:text-white">
                                        <div className="text-center">
                                            <div
                                                className="px-4 text-sm sm:text-base md:text-lg leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html: testimonial?.testimonials,
                                                }}
                                            />
                                            <div className="flex flex-col items-center mt-2">
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${testimonial?.imagePath}`} alt="Image"
                                                    className="w-auto h-12 mb-2 rounded-full"
                                                />
                                                <p className="pt-2 text-xs text-gray-500">
                                                    {testimonial?.designation} &nbsp;
                                                    <b>{testimonial?.companyName}</b>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    ) : (
                        <div className="text-gray-400">
                            No testimonials available
                        </div>
                    )}
                </div>
            </div>

            <br />

            <CustomObject
                variants="yellow-doted"
                className="absolute -bottom-[25%] -right-20 xl:h-[70%] h-[50%]"
            />
        </section>
    );
};

export default Slider;