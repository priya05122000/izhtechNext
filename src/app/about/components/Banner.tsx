"use client"
import { fadeIn } from "@/src/shared/animation/variants";
import CustomObject from "@/src/shared/components/CustomObjects";
import { motion } from "framer-motion";
import Image from "next/image";
import ProgressBar from "./Progress";

const Banner = () => {
    return (
        <section className="px-5 mx-auto relative overflow-x-hidden">
            <div className="flex gap-5 py-3 px-0 sm:px-10 mx-auto ">
                <div className="relative gap-10 mx-auto lg:flex ">
                    <motion.div
                        variants={fadeIn("right", 0.1)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.1 }}
                        className="relative bg-transparent lg:w-1/2"
                    >
                        <Image
                            width={500}
                            height={500}
                            src="/images/Aboutpage/img/banner.webp"
                            alt="Example Image"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <motion.span
                        variants={fadeIn("right", 0.5)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.1 }}
                    >
                        <CustomObject
                            className="absolute top-[calc(27%-10px)] left-[calc(30%-10px) lg:top-[calc(34%-10px)] lg:left-[calc(41%-10px)]  xl:top-[calc(29%-10px)] xl:left-[calc(44%-10px)] 2xl:top-[calc(27%-10px)]  transform -translate-x-1/2 -translate-y-1/2 -z-10 -2xl h-[150vw] lg:h-screen hidden lg:block" // Increased size here
                            variants="green"
                        />
                    </motion.span>
                    <motion.div
                        variants={fadeIn("left", 0.1)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.1 }}
                        className="flex-col justify-center gap-10 lg:gap-5 xl:gap-10 md:pe-0 mt-5 lg:mt-0 lg:pe-10 lg:w-1/2 lg:flex"
                    >
                        <div>
                            <h4 className="pb-4 text-3xl lg:text-2xl xl:text-4xl font-bold ">
                                Business Growth Solution
                            </h4>
                            <p className="text-justify sm:text-sm xl:text-base md:text-md">
                                At Izh Tech, we help businesses grow with practical support and
                                steady guidance. Whether you are building a startup, running a
                                traditional business, or shaping a new venture, our team
                                strengthens your digital marketing services and overall online
                                presence. From app development to branding and marketing, we
                                create solutions that fit your needs and support long-term
                                progress.
                            </p>

                            <ProgressBar progressTime={95} />
                        </div>

                        <div className="mt-10  lg:mt-0">
                            <h4 className="pb-4 text-3xl lg:text-2xl xl:text-4xl  font-bold">
                                Customized Business Success
                            </h4>
                            <p className="text-justify sm:text-sm xl:text-base md:text-md">
                                Get expert support from Izh Tech for your business, whether you
                                work in e-commerce or healthcare. We shape our digital marketing
                                services around your specific goals and keep you informed at every
                                stage. You gain steady guidance and results you can clearly
                                measure.
                            </p>
                            <ProgressBar progressTime={90} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Banner
