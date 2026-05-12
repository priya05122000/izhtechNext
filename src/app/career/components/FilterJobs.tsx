"use client";

import React from "react";
import { motion } from "framer-motion";

import CustomObject from "@/src/shared/components/CustomObjects";
import { fadeIn } from "@/src/shared/animation/variants";

interface JobRolesModel {
    id: string;
    roleName: string;
    roleStatus: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

interface CareerModel {
    id?: string;
    careerBannerImage?: string;
    careerDescription?: string;
}

interface FilterJobsProps {
    jobRoles: JobRolesModel[];
    career?: CareerModel[];
    activeRoleId: string | null;
    setActiveRoleId: React.Dispatch<React.SetStateAction<string | null>>;
}

const FilterJobs = ({
    jobRoles,
    career = [],
    activeRoleId,
    setActiveRoleId,
}: FilterJobsProps) => {
    return (
        <section className="px-8">
            <div className="relative mx-auto px-0 md:px-5 lg:px-10 md:flex">

                {/* Left Image Section */}
                <motion.div
                    variants={fadeIn("right", 0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.1 }}
                    className="relative bg-transparent w-full lg:w-1/2 mb-5 sm:mb-0"
                >
                    {career?.[0]?.careerBannerImage ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${career[0].careerBannerImage}`}
                            alt="Career Banner"
                            className="object-cover w-full h-[20rem] lg:h-[30rem] xl:h-[40rem]"
                        />
                    ) : (
                        <p>No image available</p>
                    )}
                </motion.div>

                {/* Background Decorative Object */}
                <motion.span
                    variants={fadeIn("right", 0.5)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.1 }}
                >
                    <CustomObject
                        className="absolute top-[calc(27%-10px)] left-[calc(30%-10px)] lg:top-[calc(24%-10px)] lg:left-[calc(46%-10px)] xl:top-[calc(21%-10px)] xl:left-[calc(47%-10px)] transform -translate-x-1/2 -translate-y-1/2 -z-10 -2xl h-[150vw] lg:h-[100vh] hidden lg:block"
                        variants="green"
                    />
                </motion.span>

                {/* Right Content Section */}
                <motion.div
                    variants={fadeIn("left", 0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.1 }}
                    className="flex flex-col justify-center gap-6 px-0 sm:px-6 md:px-10 lg:px-20 w-full lg:w-1/2"
                >
                    <div>
                        <p className="text-justify sm:text-sm md:text-md lg:text-base">
                            {career?.[0]?.careerDescription ||
                                "No career description available."}
                        </p>

                        <div className="flex flex-wrap gap-5 mt-5">

                            {/* View All Button */}
                            <button
                                onClick={() => setActiveRoleId(null)}
                                className={`w-auto px-3 py-1 text-xs font-bold border rounded-[2px] uppercase transition-all ${activeRoleId === null
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-black border-black"
                                    }`}
                            >
                                VIEW ALL
                            </button>

                            {/* Job Role Buttons */}
                            {jobRoles
                                ?.filter((jobrole) => jobrole.roleStatus)
                                ?.map((jobrole) => (
                                    <button
                                        key={jobrole.id}
                                        onClick={() =>
                                            setActiveRoleId(jobrole.id)
                                        }
                                        className={`w-auto px-3 py-1 text-xs font-bold border rounded-xs uppercase transition-all ${activeRoleId === jobrole.id
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-black border-black"
                                            }`}
                                    >
                                        {jobrole.roleName}
                                    </button>
                                ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FilterJobs;