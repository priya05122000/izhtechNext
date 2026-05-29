
import LinkButton from "@/src/shared/components/LinkButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styles from "./testimonial.module.css"
import { useRef, useState } from "react";
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

interface OurTestimonialProps {
    testimonials: Testimonials[];
}

const Testimonials = ({
    testimonials,
}: OurTestimonialProps) => {

    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    const formatIndex = (index: number) => {
        return index < 9
            ? `0${Math.max(index + 1, 1)}`
            : index + 1;
    };

    const activeTestimonials =
        testimonials?.filter(
            (testimonial) => !testimonial?.isActive
        ) || [];

    return (
        <section className="bg-black container-fluid overflow-x-hidden">

            <div className="md:container px-5 sm:px-8 relative overflow-hidden flex min-w-0 flex-col gap-10 lg:gap-16 py-10 sm:py-20 mx-auto text-left md:flex-row">

                {/* LEFT CONTENT */}
                <div className="w-full mb-10 md:w-1/2 min-w-0">

                    <h3 className="text-base text-gray-200">
                        TESTIMONIALS
                    </h3>

                    <h3 className="pt-4 mt-3 text-2xl font-bold text-white border-t xl:text-4xl sm:text-3xl border-t-gray-700">
                        What our clients say
                        <br />
                        about Izh-Tech.
                    </h3>

                    <LinkButton
                        href="/contact"
                        className="text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 border-none h-8 py-1 px-4 w-32 mt-5"
                    >
                        Lets Connect
                    </LinkButton>

                </div>

                {/* RIGHT CONTENT */}
                <div className="w-full md:w-1/2 relative min-w-0 overflow-hidden">

                    {activeTestimonials.length > 0 ? (

                        <>

                            {/* LEFT CONTROL */}
                            <button
                                ref={prevRef}
                                type="button"
                                className="absolute bottom-0 lg:left-0 hidden lg:flex items-center justify-center px-4 focus:outline-none z-10 text-white cursor-pointer"
                            >
                                <span className="relative after:content-[''] after:h-0.5 pl-0 flex flex-row after:bg-gray-500 after:absolute after:top-3 after:-right-9.5 after:w-7.5">
                                    {formatIndex(currentIndex - 1)}
                                </span>
                            </button>

                            {/* RIGHT CONTROL */}
                            <button
                                ref={nextRef}
                                type="button"
                                className="absolute bottom-0 lg:left-[5%] hidden lg:flex items-center justify-center px-4 focus:outline-none z-10 text-white cursor-pointer"
                            >
                                <span className="ml-8.75">
                                    {formatIndex(currentIndex)}
                                </span>
                            </button>

                            <div className="overflow-hidden w-full">

                                <Swiper
                                    modules={[Navigation]}
                                    slidesPerView={1}
                                    loop={activeTestimonials.length > 1}
                                    speed={600}
                                    navigation={{
                                        prevEl: prevRef.current,
                                        nextEl: nextRef.current,
                                    }}
                                    onBeforeInit={(swiper: any) => {
                                        swiper.params.navigation.prevEl =
                                            prevRef.current;

                                        swiper.params.navigation.nextEl =
                                            nextRef.current;
                                    }}
                                    onSlideChange={(swiper) => {
                                        setCurrentIndex(swiper.realIndex);
                                    }}
                                    className={styles["testimonial-swiper"]}
                                >

                                    {activeTestimonials.map(
                                        (testimonial, index) => (

                                            <SwiperSlide key={index}>

                                                <div className="flex flex-col h-full gap-3 text-left text-white">

                                                    <div className="flex flex-col bg-black gap-1">

                                                        <span className="w-32 p-2 mb-2 text-xs font-normal text-gray-100 bg-gray-900 rounded focus:outline-none">
                                                            {
                                                                testimonial?.companyLocation
                                                            }
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
                                                            {
                                                                testimonial?.companyName
                                                            }
                                                        </span>

                                                        <h3 className="text-xs text-white">
                                                            {
                                                                testimonial?.designation
                                                            }
                                                        </h3>

                                                    </div>

                                                </div>

                                            </SwiperSlide>
                                        )
                                    )}

                                </Swiper>

                            </div>

                        </>

                    ) : (
                        <div className="text-gray-400">
                            No testimonials available
                        </div>
                    )}

                </div>

            </div>

        </section>
    );
};

export default Testimonials;