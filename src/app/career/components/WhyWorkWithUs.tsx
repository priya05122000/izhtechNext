"use client"
import { motion } from "framer-motion";
import { fadeIn } from '@/src/shared/animation/variants';

const WhyWorkWithUs = () => {
    return (
        <section className=" mx-auto mb-10 lg:mb-36 mt-10 px-5 sm:px-8 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col justify-center">
                    {/* Text Content */}
                    <motion.div
                        variants={fadeIn("right", 0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.1 }}
                        className="container"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold">
                            Life at IZH Tech
                        </h2>
                        <p className="text-base text-justify mt-5">
                            At Izh Tech, we are more than a workplace. We are a community of innovators, thinkers, and problem solvers. Through tech discussions, team activities, and shared learning, we create an engaging environment where every team member feels supported and empowered.
                        </p>
                        <h3 className="text-base text-[#0E3BF9] font-semibold mt-5">
                            Be a part of our journey — let’s build the future together!
                        </h3>

                        <h4 className="mt-12 text-3xl sm:text-4xl font-bold">
                            Why Work With Us?
                        </h4>
                        <ul className="mt-5 text-justify list-disc pl-5 space-y-3">
                            <li>
                                <strong>Innovative Environment:</strong> Work with modern technologies and tools.
                            </li>
                            <li>
                                <strong>Career Growth:</strong> Continuous learning,
                                mentorship, and upskilling.
                            </li>
                            <li>
                                <strong>Collaborative Culture:</strong> We value teamwork and
                                creative problem-solving.
                            </li>
                            <li>
                                <strong>Diverse Projects:</strong> Gain experience across
                                industries and domains.
                            </li>
                            <li>
                                <strong>Work-Life Balance:</strong> A flexible, supportive
                                company culture.
                            </li>
                        </ul>
                    </motion.div>
                </div>


                {/* Image */}
                <motion.div
                    variants={fadeIn("left", 0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.1 }}
                    className="flex flex-col justify-center"
                >
                    <img
                        src="./images/career/c2.webp"
                        alt="Life at IZH Tech"
                        className="w-full h-full lg:h-170 xl:h-162.5 object-cover"
                        width={1200}
                        height={900}
                        loading="lazy"
                        decoding="async"
                    />
                </motion.div>
            </div>
        </section>
    )
}

export default WhyWorkWithUs
