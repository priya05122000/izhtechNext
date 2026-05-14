"use client"
import { fadeIn } from '@/src/shared/animation/variants';
import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Facebook, Youtube } from 'lucide-react';


const MeetTheTeam = () => {

    const [activeCard, setActiveCard] = useState<number | null>(null);

    return (
        <section className="pt-8 sm:pt-16 relative overflow-x-hidden">
            <div className="px-5 mx-auto">
                <section className="px-0 sm:px-10">
                    <div className="w-full ">
                        <motion.div
                            variants={fadeIn("right", 0.3)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.1 }}
                            className="flex flex-col justify-center w-full md:flex-1 lg:w-1/4"
                        >
                            {/* <CustomObject className="absolute -z-10" variants="green-disk" /> */}
                            <p className="text-base">OUR TEAM</p>
                            <h1 className="pt-2 text-3xl font-bold lg:text-3xl xl:text-5xl">
                                Meet the Team
                            </h1>
                        </motion.div>
                    </div>
                </section>
            </div>

            <div className="mt-10">
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {[1, 2, 3, 4].map((item, index) => {

                        // const isActive = activeCard === index;

                        return (
                            <motion.article
                                key={item}
                                className="relative overflow-hidden cursor-pointer"
                                initial="rest"
                                whileHover="hover"
                                animate={activeCard === index ? "hover" : "rest"}
                                onClick={() => setActiveCard(activeCard === index ? null : index)}
                                onMouseEnter={() => setActiveCard(null)}
                            >

                                {/* Image */}
                                <motion.img
                                    src={`/images/team${item}.jpg`}
                                    alt="team"
                                    className="w-full h-[380px] object-cover object-top"
                                    variants={{
                                        rest: { scale: 1 },
                                        hover: { scale: 1.1 }
                                    }}
                                    transition={{ duration: 0.4 }}
                                />

                                {/* Gradient Overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"
                                    variants={{
                                        rest: { opacity: 0 },
                                        hover: { opacity: 1 }
                                    }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Content */}
                                <motion.div
                                    className="absolute bottom-6 left-6 right-6 text-white"
                                    variants={{
                                        rest: { y: 60, opacity: 0 },
                                        hover: { y: 0, opacity: 1 }
                                    }}
                                    transition={{ duration: 0.35 }}
                                >
                                    <h3 className="text-xl font-bold">Colin Lucido</h3>

                                    <p className="text-sm text-gray-300 mb-3">
                                        UI Designer · Interactive Media
                                    </p>

                                    <p className="text-sm text-gray-400 mb-5">
                                        George is an architect and founding partner,
                                        providing flexible digital services.
                                    </p>

                                    {/* Social Icons */}
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 border border-white/40 rounded-full flex items-center justify-center">
                                            <Facebook />
                                        </div>
                                        <div className="w-10 h-10 border border-white/40 rounded-full flex items-center justify-center">
                                            <Youtube />
                                        </div>

                                    </div>
                                </motion.div>

                            </motion.article>
                        );
                    })}

                </section>
            </div>
        </section>
    )
}

export default MeetTheTeam
