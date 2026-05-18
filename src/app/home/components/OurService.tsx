"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
    Card,
    Progress,
} from "flowbite-react";

import { fadeIn } from "@/src/shared/animation/variants";
import DynamicIcon from "@/src/shared/components/Icon";

interface ServicesHighlightsModal {
    id: string;
    name: string;
    description: string;
    imagePath?: string;
    icon?: string;
    order: number;
    isActive: boolean;
    serviceId: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

interface ServicesFeaturesModal {
    id: string;
    title: string;
    description: string;
    imagePath?: string;
    icon?: string;
    isFeatured: boolean;
    order: number;
    isActive: boolean;
    serviceId: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

interface Services {
    id: string;
    slug: string;
    title?: string;
    shortNote?: string;
    description?: string;
    icon?: string;
    order?: number;
    isActive?: boolean;
    featuredImagePath?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    serviceFeatures: ServicesFeaturesModal[];
    serviceHighlights: ServicesHighlightsModal[];
}

interface OurServiceProps {
    services: Services[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const colors = [
    "bg-purple-300",
    "bg-pink-300",
    "bg-cyan-300",
    "bg-indigo-300",
    "bg-teal-300",
    "bg-orange-300",
    "bg-lime-300",
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
];

const OurService = ({
    services,
}: OurServiceProps) => {

    const [activeTab, setActiveTab] = useState(0);

    const sortedServices = [...services].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );

    const handleTabChange = (index: number) => {
        setActiveTab(index);
    };

    if (!services || services.length === 0) {
        return (
            <p>
                No services available at the moment.
            </p>
        );
    }

    return (
        <section className="mx-auto container-fluid xl:container lg:px-8">

            <div className="lg:px-10 bg-[#F7F9FA] rounded">

                <div className="relative py-10">

                    {/* HEADING */}
                    <div className="text-center">

                        <p className="pt-4 pb-2 text-base">
                            #OUR SERVICE
                        </p>

                        <h4 className="pb-3 font-bold text-md lg:text-3xl md:text-3xl sm:text-3xl">
                            What to expect?
                        </h4>

                    </div>

                    <div className="w-full lg:pl-10">

                        <div
                            className="
                                flex
                                flex-col
                                ring-transparent
                                align-start
                                md:flex-col
                                lg:flex-row
                                gap-2
                                md:gap-4
                                lg:gap-2
                                sm:justify-center
                                md:justify-start
                                outline-none
                            "
                        >

                            {/* TAB BUTTONS */}
                            <div
                                aria-label="Pills"
                                role="tablist"
                                className="
                                    flex
                                    mt-8
                                    align-left
                                    lg:items-baseline
                                    lg:justify-start
                                    justify-center
                                    flex-wrap
                                    text-left
                                    lg:flex-col
                                    font-medium
                                    text-sm
                                    ring-transparent
                                    rounded-none
                                    text-gray-500
                                    bg-gray
                                    border-transparent
                                    space-x-2
                                    outline-none
                                "
                            >

                                {sortedServices?.map(
                                    (serviceDetail, index) => {

                                        const isActive =
                                            activeTab === index;

                                        return (
                                            <button
                                                key={serviceDetail.id}
                                                type="button"
                                                onClick={() => handleTabChange(index)}
                                                className={`
                                                    flex
                                                    items-center
                                                    p-4
                                                    cursor-pointer
                                                    text-sm
                                                    font-medium
                                                    first:ml-0
                                                    text-left
                                                    rounded-none
                                                    lg:min-w-40
                                                    lg:w-auto
                                                    whitespace-nowrap
                                                    justify-start
                                                    bg-transparent
                                                    hover:bg-gray-50
                                                    ring-transparent
                                                    transition-all
                                                    duration-300

                                                    ${isActive
                                                        ? `
                                                            text-black
                                                            border-[#FFD074]
                                                            border-b-2
                                                            lg:border-r-2
                                                            lg:border-b-0
                                                        `
                                                        : `
                                                            text-black
                                                            border-transparent
                                                        `
                                                    }
                                                `}
                                            >
                                                {serviceDetail.title}
                                            </button>
                                        );
                                    }
                                )}

                            </div>

                            {/* TAB CONTENT */}
                            <div className="flex-1">

                                {sortedServices?.[activeTab] && (() => {

                                    const serviceDetail =
                                        sortedServices[activeTab];

                                    return (
                                        <div key={serviceDetail.id}>

                                            <div
                                                className="
                                                    flex
                                                    flex-col
                                                    items-start
                                                    flex-1
                                                    p-5
                                                    sm:flex-row
                                                "
                                            >

                                                {/* CARD */}
                                                <motion.div
                                                    variants={fadeIn("right", 0.1)}
                                                    initial="hidden"
                                                    whileInView="show"
                                                    viewport={{
                                                        once: false,
                                                        amount: 0.1,
                                                    }}
                                                >

                                                    <Link
                                                        href={`/service/${serviceDetail.slug}`}
                                                    >

                                                        <div
                                                            className="
        max-w-sm
        overflow-hidden
        rounded-xl
        bg-white
        shadow-sm
        border
        border-gray-200
    "
                                                        >

                                                            <img
                                                                src={`${BASE_URL}/${serviceDetail.featuredImagePath}`}
                                                                alt={serviceDetail.title || "Service featured image"}
                                                                className="w-full object-cover rounded-t-xl"
                                                            />

                                                            <div className="flex flex-col gap-4 p-6">

                                                                <div className="flex flex-col gap-2">

                                                                    <div className="text-xl font-bold text-black">
                                                                        {serviceDetail.title}
                                                                    </div>

                                                                    <div className="h-2.5 w-full rounded-full bg-gray-200">

                                                                        <div
                                                                            className="
                        h-2.5
                        w-[45%]
                        rounded-full
                        bg-gradient-to-r
                        from-indigo-500
                        via-purple-500
                        to-pink-500
                    "
                                                                        />

                                                                    </div>

                                                                </div>

                                                                <p className="text-gray-700 text-md">
                                                                    {serviceDetail.shortNote?.toString() || ""}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </Link>

                                                </motion.div>

                                                {/* FEATURES */}
                                                <div className="flex-1 mt-0 sm:ml-4">

                                                    <div
                                                        className="
                                                            flex
                                                            flex-col
                                                            w-full
                                                            px-2
                                                            lg:justify-center
                                                        "
                                                    >

                                                        {serviceDetail.serviceFeatures
                                                            ?.filter(
                                                                (serviceFeature) =>
                                                                    serviceFeature.isFeatured &&
                                                                    serviceFeature.isActive
                                                            )
                                                            .sort(
                                                                (a, b) =>
                                                                    (a.order ?? 0) -
                                                                    (b.order ?? 0)
                                                            )
                                                            .slice(0, 3)
                                                            .map(
                                                                (
                                                                    serviceFeature,
                                                                    index
                                                                ) => (

                                                                    <motion.div
                                                                        key={serviceFeature.id}
                                                                        variants={fadeIn("right", 0.2)}
                                                                        initial="hidden"
                                                                        whileInView="show"
                                                                        viewport={{
                                                                            once: false,
                                                                            amount: 0.1,
                                                                        }}
                                                                        className="
                                                                            flex
                                                                            flex-col
                                                                            border-slate-600
                                                                            md:flex-1
                                                                            lg:w-full
                                                                        "
                                                                    >

                                                                        <span
                                                                            className={`
                                                                                flex
                                                                                items-center
                                                                                justify-center
                                                                                w-12
                                                                                h-12
                                                                                mt-5
                                                                                rounded-full
                                                                                ${colors[index % 10]}
                                                                            `}
                                                                        >

                                                                            <DynamicIcon
                                                                                iconName={
                                                                                    serviceFeature?.icon as string
                                                                                }
                                                                                size={28}
                                                                                className="text-white"
                                                                            />

                                                                        </span>

                                                                        <h4 className="pt-2 font-bold text-md">
                                                                            {serviceFeature.title}
                                                                        </h4>

                                                                        <div
                                                                            className="pt-2 pb-3 text-sm"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html:
                                                                                    serviceFeature.description || "",
                                                                            }}
                                                                        />

                                                                    </motion.div>
                                                                )
                                                            )}

                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    );
                                })()}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default OurService;