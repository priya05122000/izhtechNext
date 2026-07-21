"use client"
import { fadeIn } from '@/src/shared/animation/variants';
import { useState } from 'react'
import { motion } from "framer-motion"
import Image from 'next/image';

interface Employee {
    id: string;
    name: string;
    email: string | null;
    mobileNumber: string | null;
    gender: string | null;
    dob: string | null;
    image: string | null;
    department: string | null;
    designation: string | null;
    description: string | null;
    review: string | null;
    order: number | null;
    experience: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

interface MeetTheTeamProps {
    employees: Employee[];
}

const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL;


const MeetTheTeam = ({ employees }: MeetTheTeamProps) => {

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

                    {employees?.map((employee, index) => {
                        // const isActive = activeCard === index;

                        return (
                            <article
                                key={employee.id}
                                className="group relative overflow-hidden cursor-pointer"
                                onClick={() =>
                                    setActiveCard(activeCard === index ? null : index)
                                }
                            >
                                <Image
                                    src={`${BASE_URL}/uploads/${employee.image}`}
                                    alt={employee.name}
                                    width={800}
                                    height={1000}
                                    sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         (max-width: 1280px) 33vw,
         25vw"
                                    unoptimized
                                    loading="lazy"
                                    className="w-full h-110 object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                />

                                <div
                                    className={`
    absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent
    transition-opacity duration-300
    ${activeCard === index
                                            ? "opacity-100"
                                            : "opacity-0 lg:group-hover:opacity-100"
                                        }
  `}
                                />

                                <div
                                    className={`
    absolute bottom-6 left-6 right-6 text-white transition-all duration-300
    ${activeCard === index
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-14 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
                                        }
  `}
                                >
                                    <h3 className="text-xl font-bold">{employee.name}</h3>

                                    <p className="text-xs text-gray-300 mb-3">
                                        {employee.designation} - {employee.experience}
                                    </p>

                                    <div
                                        className="text-base leading-tight text-gray-400 mb-5"
                                        suppressHydrationWarning
                                        dangerouslySetInnerHTML={{
                                            __html: employee.description || "",
                                        }}
                                    />
                                </div>
                            </article>
                        );
                    })}

                </section>
            </div>
        </section>
    )
}

export default MeetTheTeam
