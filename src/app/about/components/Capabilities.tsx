"use client";
import { fadeIn } from "@/src/shared/animation/variants";
import CustomObject from "@/src/shared/components/CustomObjects";
import { motion } from "framer-motion";
import Image from "next/image";

const Capabilities = () => {
    return (
        <section className="px-5 mx-auto relative overflow-x-hidden">
            <div className="px-0 sm:px-10 pt-10 mx-auto ">
                <div className="flex flex-col lg:flex-row gap-10 items-center relative">
                    <CustomObject className="absolute -z-10 left-0" variants="green-disk" />

                    {/* Text Section */}
                    <motion.div
                        variants={fadeIn("right", 0.15)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{
                            once: true,
                            amount: 0.15,
                        }}
                        className="flex flex-col justify-center w-full lg:w-1/2"
                    >

                        <p className="text-base">CAPABILITIES</p>

                        <h3 className="pt-2 text-2xl sm:text-3xl xl:text-5xl font-bold leading-tight">
                            Broad mastery, personalized tactics, and creative solutions for impactful outcomes
                        </h3>
                    </motion.div>
                    {/* Image Section */}
                    <motion.div
                        variants={fadeIn("left", 0.15)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{
                            once: true,
                            amount: 0.15,
                        }}
                        className="w-full lg:w-1/2"
                    >
                        <Image
                            src="/images/about/capabilitiesnew.webp"
                            alt="Izh Tech capabilities"
                            className="w-full h-auto object-cover"
                            width={651}
                            height={476}
                            sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 90vw,
         35vw"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Capabilities
