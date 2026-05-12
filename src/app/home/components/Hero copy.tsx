"use client";

import Image from "next/image";

export default function Hero() {
    return (
        <section className="pt-6 pb-6 lg:h-[calc(80vh-70px)] relative">

            <div className="md:container relative flex justify-center md:h-full max-[490px]:h-[50vh] h-[60vh] mx-auto">

                <div className="flex flex-col justify-center gap-4 px-5 my-auto md:flex-row md:pb-20 lg:pb-0">

                    {/* LEFT CONTENT */}
                    <div className="flex flex-col justify-end lg:w-4/6 sm:w-[75%] sm:px-11 md:px-0 lg:px-11 lg:m-0 mx-auto">

                        <div className="flex flex-col xl:pl-36 lg:pl-16">

                            <p className="text-[#0C1C28] order-2 lg:order-1 text-justify pt-5 text-base md:text-xs lg:text-sm">
                                Izh Tech is your trusted website development company and digital marketing agency, offering tailored solutions to boost your brand’s online presence. Don’t navigate the digital world alone!
                            </p>

                            <h3 className="order-1 text-5xl font-black lg:order-2 lg:text-5xl 2xl:text-7xl sm:text-4xl">
                                Give your brand the edge it deserves.
                            </h3>

                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative flex flex-col justify-end hidden h-full pb-5 mx-auto md:block lg:w-3/6 sm:w-full">

                        <Image
                            src="/images/hero/bg-1.webp"
                            alt="Hero Image"
                            width={500}
                            height={500}
                            priority
                            className="sm:w-[50%] md:w-[80%] lg:w-[75%] mx-auto h-auto"
                        />

                    </div>

                </div>
            </div>

            {/* BACKGROUND GIF */}
            <span>
                <Image
                    src="/images/objects/izhtech_animation.gif"
                    alt="Background Animation"
                    width={1000}
                    height={1000}
                    className="
            absolute
            -top-60
            md:-top-[50px]
            lg:-top-[50px]
            xl:-top-[55px]

            -left-[700px]
            md:-left-0

            -z-10

            h-[220vw]
            md:h-[95vh]
            lg:h-[95vh]
            xl:h-[95vh]

            hidden
            md:block
          "
                />
            </span>

        </section>
    );
}