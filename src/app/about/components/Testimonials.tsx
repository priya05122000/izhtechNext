"use client"
import Link from 'next/link';
import { Carousel } from "flowbite-react";

import React, { useRef, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LinkButton from '@/src/shared/components/LinkButton';


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

interface OurTestimonialProps {
    testimonials: Testimonials[];
}


const Testimonials = ({ testimonials }: OurTestimonialProps) => {

    const sliderRef = useRef<Slider | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSlideChange = (newIndex: number) => {
        setCurrentIndex(newIndex);
    };

    const formatIndex = (index: number) => {
        return index < 9 ? `0${index + 1}` : index + 1;
    };

    const activeTestimonials =
        testimonials?.filter(
            (testimonial) => !testimonial?.isActive
        ) || [];

    const settings = {
        dots: false,
        arrows: false,
        infinite: activeTestimonials.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_: number, next: number) => {
            handleSlideChange(next);
        },
    };

    return (
        <section className="bg-black container-fluid overflow-hidden">

            <div className="md:container px-8 relative flex flex-col xl:gap-[15%] lg:gap[12%] py-10 sm:py-20 mx-auto text-left md:flex-row">
                <div className="w-full mb-10 sm:w-2/4">
                    <h6 className="text-base text-gray-200">TESTIMONIALS</h6>
                    <h5 className="pt-4 mt-3 text-2xl font-bold text-white border-t xl:text-4xl sm:text-3xl border-t-gray-700">
                        What our clients say
                        <br /> about Izh-Tech.
                    </h5>
                    {/* <LinkButton
                    href="/contact"
                    size={'sm'}
                    className="mt-5"
                    variant={'gradient'}
                >
                    Lets Connect
                </LinkButton> */}

                    <LinkButton
                        href="/contact"
                        className="text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 border-none h-8 py-1 px-4 w-32 mt-5"
                    >
                        Lets Connect
                    </LinkButton>


                </div>

                <div className="w-full sm:w-2/4 relative">
                    {activeTestimonials.length > 0 ? (
                        <>
                            {/* LEFT CONTROL */}
                            <button
                                type="button"
                                onClick={() => sliderRef.current?.slickPrev()}
                                className="absolute bottom-0 lg:left-0 hidden lg:flex items-center justify-center px-4 focus:outline-none z-10 text-white"
                            >
                                <span className="relative after:content-[''] after:h-0.5 pl-0 flex flex-row after:bg-gray-500 after:absolute after:top-3 after:-right-9.5 after:w-7.5">
                                    {formatIndex(currentIndex - 1)}
                                </span>
                            </button>

                            {/* RIGHT CONTROL */}
                            <button
                                type="button"
                                onClick={() => sliderRef.current?.slickNext()}
                                className="absolute bottom-0 lg:left-[5%] hidden lg:flex items-center justify-center px-4 focus:outline-none z-10 text-white"
                            >
                                <span className="ml-8.75">
                                    {formatIndex(currentIndex + 1)}
                                </span>
                            </button>

                            <Slider ref={sliderRef} {...settings}>
                                {activeTestimonials.map((testimonial, index) => (
                                    <div key={index}>
                                        <div className="flex flex-col h-full gap-3 text-left dark:text-white">
                                            <div className="flex flex-col bg-black gap-1">
                                                <span className="w-32 p-2 mb-2 text-xs font-normal text-gray-100 bg-gray-900 rounded focus:outline-none">
                                                    {testimonial?.companyLocation}
                                                </span>

                                                <p>
                                                    {testimonial?.testimonials?.replace(
                                                        /<[^>]+>/g,
                                                        ""
                                                    )}
                                                </p>
                                            </div>

                                            <div>
                                                <span className="text-xs font-bold text-white">
                                                    {testimonial?.companyName}
                                                </span>

                                                <h5 className="text-xs text-white">
                                                    {testimonial?.designation}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </>
                    ) : (
                        <div className="text-gray-400">
                            No testimonials available
                        </div>
                    )}
                </div>
            </div>



        </section>
    )
}

export default Testimonials
