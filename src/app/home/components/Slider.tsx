"use client";

import SliderComponent from "react-slick";
import { MoveLeft, MoveRight } from "lucide-react";
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
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

interface TestimonialProps {
    testimonials: Testimonials[];
}

const PrevArrow = ({ onClick }: any) => (
    <button
        onClick={onClick}
        className="absolute top-10 lg:top-1/2 left-4 md:left-36 z-10 -translate-y-1/2 cursor-pointer"
    >
        <div className="flex h-10 w-10 items-center justify-center rounded-full ">
            <MoveLeft className="h-5 w-5 text-black" />
        </div>
    </button>
);

const NextArrow = ({ onClick }: any) => (
    <button
        onClick={onClick}
        className="absolute top-10 lg:top-1/2 right-4 md:right-36 z-10 -translate-y-1/2 cursor-pointer"
    >
        <div className="flex h-10 w-10 items-center justify-center rounded-full ">
            <MoveRight className="h-5 w-5 text-black" />
        </div>
    </button>
);

const Slider = ({ testimonials }: TestimonialProps) => {
    const activeTestimonials =
        testimonials
            ?.filter((testimonial) => testimonial?.isActive)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) || [];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        swipe: true,
        draggable: true,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <section className="mx-auto overflow-hidden container-fluid xl:container px-8">

            <div className="px-5 py-16 text-center bg-[#F5F1F5] md:px-0 mb-0 xl:mb-10 h-full relative overflow-hidden">
                <div className="h-full">
                    <h3 className="pt-6 font-bold text-center text-md lg:text-5xl md:text-4xl sm:text-4xl">
                        Meet our customers.
                    </h3>

                    <div className="relative h-full">
                        {activeTestimonials.length > 0 ? (
                            <div className="mt-10">
                                <SliderComponent {...settings}>
                                    {activeTestimonials.map(
                                        (testimonial, index) => (
                                            <div key={index}>
                                                <div className="flex items-center justify-center h-full ">
                                                    <div className="text-center">
                                                        <div
                                                            className="px-4 text-sm sm:text-base md:text-lg leading-relaxed"
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    testimonial?.testimonials,
                                                            }}
                                                        />

                                                        <div className="flex flex-col items-center mt-2">
                                                            <img
                                                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${testimonial?.imagePath}`}
                                                                alt="Image"
                                                                className="w-auto h-12 mb-2 rounded-full"
                                                            />

                                                            <p className="pt-2 text-xs text-gray-500">
                                                                {
                                                                    testimonial?.designation
                                                                }
                                                                &nbsp;
                                                                <b>
                                                                    {
                                                                        testimonial?.companyName
                                                                    }
                                                                </b>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </SliderComponent>
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
            </div>
        </section>

    );
};

export default Slider;