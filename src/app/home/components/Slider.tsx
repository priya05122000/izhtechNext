"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { MoveLeft, MoveRight } from "lucide-react";
import CustomObject from "@/src/shared/components/CustomObjects";
import Image from "next/image";
import { useRef } from "react";


import "swiper/css";
import "swiper/css/navigation";

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

const Slider = ({ testimonials }: TestimonialProps) => {

    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    const activeTestimonials =
        testimonials
            ?.filter((testimonial) => testimonial?.isActive)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) || [];

    return (
        <section className="mx-auto overflow-hidden container-fluid xl:container lg:px-8">

            <div className="px-5 py-16 text-center bg-[#F5F1F5] md:px-0 mb-0 xl:mb-10 h-full relative overflow-hidden">

                <div className="h-full">

                    <h4 className="pt-6 font-bold text-center text-md lg:text-5xl md:text-4xl sm:text-4xl">
                        Meet our customers.
                    </h4>

                    <div className="relative h-full">

                        {activeTestimonials.length > 0 ? (

                            <div className="mt-10 relative">

                                {/* Prev Button */}
                                <button
                                    ref={prevRef}
                                    aria-label="Previous testimonial"
                                    className="absolute top-10 lg:top-1/2 left-4 md:left-36 z-10 translate-y-1/2 cursor-pointer"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full">
                                        <MoveLeft aria-hidden="true" className="h-5 w-5 text-black" />
                                    </div>
                                </button>

                                {/* Next Button */}
                                <button
                                    ref={nextRef}
                                    aria-label="Next testimonial"
                                    className="absolute top-10 lg:top-1/2 right-4 md:right-36 z-10 translate-y-1/2 cursor-pointer"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full">
                                        <MoveRight aria-hidden="true" className="h-5 w-5 text-black" />
                                    </div>
                                </button>

                                <Swiper
                                    modules={[Autoplay, Navigation]}
                                    loop={true}
                                    speed={600}
                                    slidesPerView={1}
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                        pauseOnMouseEnter: true,
                                    }}
                                    navigation={true}
                                    onBeforeInit={(swiper: SwiperType) => {
                                        const navigation = swiper.params.navigation;

                                        if (navigation && typeof navigation === "object") {
                                            navigation.prevEl = prevRef.current;
                                            navigation.nextEl = nextRef.current;
                                        }
                                    }}
                                    className="testimonial-swiper"
                                >

                                    {activeTestimonials.map(
                                        (testimonial, index) => (
                                            <SwiperSlide key={index}>

                                                <div className="flex items-center justify-center h-full">

                                                    <div className="text-center">

                                                        <div
                                                            className="px-4 text-sm sm:text-base md:text-lg leading-relaxed text-gray-800"
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    testimonial?.testimonials,
                                                            }}
                                                        />

                                                        <div className="flex flex-col items-center mt-2">

                                                            <Image
                                                                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${testimonial?.imagePath}`}
                                                                alt={testimonial?.name || "Testimonial image"}
                                                                width={48}
                                                                height={48}
                                                                loading="lazy"
                                                                quality={70}
                                                                className="w-12 h-12 mb-2 object-contain"
                                                                unoptimized={true}
                                                            />

                                                            <p className="pt-2 text-xs text-gray-700">
                                                                {testimonial?.designation}
                                                                &nbsp;
                                                                <b className="text-black">
                                                                    {testimonial?.companyName}
                                                                </b>
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>

                                            </SwiperSlide>
                                        )
                                    )}

                                </Swiper>

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