"use client";
import { fadeIn } from "@/src/shared/animation/variants";
import CustomObject from "@/src/shared/components/CustomObjects";
import { motion } from "framer-motion";

const Capabilities = () => {
    return (
        <section className="px-5 mx-auto relative overflow-x-hidden">
            <div className="px-0 sm:px-10 pt-10 mx-auto ">
                <div className="flex flex-col lg:flex-row gap-10 items-center">
                    {/* Text Section */}
                    <motion.div
                        variants={fadeIn("right", 0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.1 }}
                        className="flex flex-col justify-center w-full lg:w-1/2"
                    >
                        <CustomObject className="absolute -z-10" variants="green-disk" />

                        <p className="text-base">CAPABILITIES</p>

                        <h3 className="pt-2 text-2xl sm:text-3xl xl:text-5xl font-bold leading-tight">
                            Broad mastery, personalized tactics, and creative solutions for impactful outcomes
                        </h3>
                    </motion.div>
                    {/* Image Section */}
                    <motion.div
                        variants={fadeIn("left", 0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.1 }}
                        className="w-full lg:w-1/2"
                    >
                        <img
                            src="/images/Aboutpage/img/capabilities.webp"
                            alt="Capabilities"
                            className="w-full h-auto object-cover"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default Capabilities
