"use client";

import React, { useMemo, useState } from "react";

import Link from "next/link";

import Image from "next/image";

import { motion } from "framer-motion";

import {
    Tabs,
    TabItem,
    Card,
    Progress,
} from "flowbite-react";
import { fadeIn } from "@/src/shared/animation/variants";
import DynamicIcon from "@/src/shared/components/Icon";


interface ServicesFeature {
    id: string;

    title?: string;

    description?: string;

    icon?: string;

    order?: number;

    isFeatured?: boolean;

    isActive?: boolean;
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

    serviceFeatures?: ServicesFeature[];

    createdAt?: string;

    updatedAt?: string;

    deletedAt?: string;
}

interface OurServiceProps {
    services: Services[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

const customTheme = {
    base: "flex flex-col ring-transparent align-start md:flex-col lg:flex-row gap-2 md:gap-4 lg:gap-2 sm:justify-center md:justify-start",

    tablist: {
        base: "flex text-center mt-8 ring-transparent align-left lg:items-baseline lg:justify-start justify-center",

        styles: {
            default:
                "flex-wrap border-b-0 border-r rounded-none ring-transparent border-transparent dark:border-gray-700",

            pills:
                "flex-wrap text-left lg:flex-col font-medium text-sm ring-transparent rounded-none text-gray-500 dark:text-gray-400 bg-gray border-transparent space-x-2",
        },

        tabitem: {
            styles: {
                pills: {
                    base: "text-left bg-transparent rounded-none lg:min-w-[160px] lg:w-auto whitespace-nowrap justify-start !focus:outline-none ring-transparent",

                    active: {
                        on: "text-black bg-transparent border-transparent border-[#FFD074] hover:bg-gray-50 ring-transparent !focus:outline-none border-b-2 lg:border-r-2 lg:border-b-0",

                        off: "text-black border-transparent bg-transparent hover:bg-gray-50",
                    },
                },
            },
        },
    },

    tabitemcontainer: {
        base: "",

        styles: {
            default: "",
            underline: "",
            pills: "",
            fullWidth: "",
        },
    },

    tabpanel: "",
};

const OurService = ({
    services,
}: OurServiceProps) => {

    const [activeTab, setActiveTab] = useState(0);

    const sortedServices = useMemo(() => {
        return services
            ?.slice()
            ?.sort(
                (a, b) => (a.order ?? 0) - (b.order ?? 0)
            );
    }, [services]);

    if (!sortedServices?.length) {
        return (
            <p className="text-center py-10">
                No services available.
            </p>
        );
    }

    return (
        <section className="mx-auto container-fluid xl:container">

            <section className="pt-18 pb-18 bg-[#F7F9FA] rounded lg:px-10">

                <div className="relative py-10">

                    <div className="text-center">

                        <p className="pt-4 pb-2 text-base">
                            #OUR SERVICE
                        </p>

                        <h4 className="pb-3 font-bold text-md lg:text-3xl md:text-3xl sm:text-3xl">
                            What to expect?
                        </h4>

                    </div>

                    <div className="w-full lg:pl-10">

                        <Tabs
                            aria-label="Services Tabs"
                            variant="pills"
                            theme={customTheme as any}
                            className="outline-none"
                        >

                            {sortedServices.map(
                                (
                                    serviceDetail,
                                    index
                                ) => {

                                    const features =
                                        serviceDetail.serviceFeatures
                                            ?.filter(
                                                (
                                                    feature
                                                ) =>
                                                    feature.isFeatured &&
                                                    feature.isActive
                                            )
                                            ?.sort(
                                                (
                                                    a,
                                                    b
                                                ) =>
                                                    (a.order ??
                                                        0) -
                                                    (b.order ??
                                                        0)
                                            )
                                            ?.slice(0, 3);

                                    return (
                                        <TabItem
                                            key={
                                                serviceDetail.id
                                            }
                                            title={
                                                serviceDetail.title ||
                                                "Service"
                                            }
                                            active={
                                                activeTab ===
                                                index
                                            }
                                            onClick={() =>
                                                setActiveTab(
                                                    index
                                                )
                                            }
                                            className="outline-none"
                                        >

                                            <div className="flex flex-col items-start flex-1 p-5 sm:flex-row">

                                                {/* Left Card */}

                                                <motion.div
                                                    variants={fadeIn(
                                                        "right",
                                                        0.1
                                                    )}
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

                                                        <Card className="max-w-sm shadow-none">

                                                            {serviceDetail.featuredImagePath && (
                                                                <Image
                                                                    src={`${BASE_URL}/${serviceDetail.featuredImagePath.replace(
                                                                        /\\/g,
                                                                        "/"
                                                                    )}`}
                                                                    alt={
                                                                        serviceDetail.title ||
                                                                        "Service"
                                                                    }
                                                                    width={
                                                                        500
                                                                    }
                                                                    height={
                                                                        300
                                                                    }
                                                                    className="object-cover w-full h-auto rounded"
                                                                />
                                                            )}

                                                            <div className="flex flex-col gap-2">

                                                                <div className="text-xl font-bold dark:text-white">

                                                                    {
                                                                        serviceDetail.title
                                                                    }

                                                                </div>

                                                                <Progress
                                                                    progress={
                                                                        45
                                                                    }
                                                                    size="sm"
                                                                    theme={{
                                                                        base: "w-full rounded-full bg-transparent",

                                                                        color: {
                                                                            info: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
                                                                        },
                                                                    }}
                                                                    color="info"
                                                                    className="h-2.5 w-full"
                                                                />

                                                            </div>

                                                            <p className="text-gray-700 text-md dark:text-gray-400">

                                                                {
                                                                    serviceDetail.shortNote
                                                                }

                                                            </p>

                                                        </Card>

                                                    </Link>

                                                </motion.div>

                                                {/* Right */}

                                                <div className="flex-1 mt-0 sm:ml-4">

                                                    <div className="flex flex-col w-full px-2 lg:justify-center">

                                                        {features?.map(
                                                            (
                                                                feature,
                                                                featureIndex
                                                            ) => (
                                                                <motion.div
                                                                    key={
                                                                        feature.id
                                                                    }
                                                                    variants={fadeIn(
                                                                        "right",
                                                                        0.2
                                                                    )}
                                                                    initial="hidden"
                                                                    whileInView="show"
                                                                    viewport={{
                                                                        once: false,
                                                                        amount: 0.1,
                                                                    }}
                                                                    className="flex flex-col border-slate-600 md:flex-1 lg:w-full"
                                                                >

                                                                    <span
                                                                        className={`flex items-center justify-center w-12 h-12 mt-5 rounded-full ${colors[
                                                                            featureIndex %
                                                                            colors.length
                                                                        ]}`}
                                                                    >

                                                                        <DynamicIcon
                                                                            iconName={
                                                                                feature.icon
                                                                            }
                                                                            size={
                                                                                28
                                                                            }
                                                                            className="text-white"
                                                                        />

                                                                    </span>

                                                                    <h2 className="pt-2 font-bold text-md">

                                                                        {
                                                                            feature.title
                                                                        }

                                                                    </h2>

                                                                    <div
                                                                        className="pt-2 pb-3 text-sm"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html:
                                                                                feature.description ||
                                                                                "",
                                                                        }}
                                                                    />

                                                                </motion.div>
                                                            )
                                                        )}

                                                    </div>

                                                </div>

                                            </div>

                                        </TabItem>
                                    );
                                }
                            )}

                        </Tabs>

                    </div>

                </div>

            </section>

        </section>
    );
};

export default OurService;