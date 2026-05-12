"use client";
import { fadeIn } from '@/src/shared/animation/variants';
import CustomObject from '@/src/shared/components/CustomObjects';
import React from 'react'
import { motion } from 'framer-motion';

interface Clients {
    id: string;
    name: string;
    companyName: string;
    industry: string;
    description: string;
    isActive: boolean | string;
    logo?: string;
    serviceId: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

interface OurClientsProps {
    clients: Clients[];
}


const OurClients = ({ clients }: OurClientsProps) => {
    return (
        <section className="px-5 mx-auto md:px-0 bg-slate-100 overflow-hidden">
            <div className="relative py-8 mx-auto md:container px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col content-center pt-6 pb-6 text-black sm:flex-col md:flex-row lg:flex-row">
                    <div className="text-center lg:text-left mb-6 lg:mb-0">
                        <p className="text-base text-gray-500">CLIENTS WE WORK FOR</p>
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                            Our clients.
                        </h3>
                    </div>
                </div>
                <div className="w-full">
                    <ul className="flex flex-wrap w-full justify-start lg:justify-start">
                        {clients?.map((client) => (
                            <li
                                key={client.id}
                                className="p-2 pl-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 flex flex-col items-start lg:items-start"
                            >
                                <h6 className="font-bold text-md sm:text-lg lg:text-md mb-2 text-left lg:text-left">
                                    {client?.companyName}
                                </h6>
                                <div className="text-sm sm:text-base lg:text-md text-left lg:text-left">
                                    <a href="#" className="text-black">
                                        <div
                                            dangerouslySetInnerHTML={{ __html: client?.description }}
                                        />
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <motion.span
                    variants={fadeIn("right", 0.5)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.1 }}
                >
                    <CustomObject
                        className="absolute bottom-0 right-0 transform -translate-x-[calc(30%-20px)] flex z-10 -xl h-[42vh] md:-right-20 lg:-right-28"
                        variants="orange-half-circle-lines"
                    />
                </motion.span>
            </div>

        </section>
    )
}

export default OurClients
