"use client";

import { memo, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { fadeIn } from "@/src/shared/animation/variants";
import DynamicIcon from "@/src/shared/components/Icon";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

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
];

/* -------------------------------------------------------------------------- */
/*                              HELPER FUNCTION                               */
/* -------------------------------------------------------------------------- */

const getFeaturedServices = (
    features: ServicesFeaturesModal[]
) => {
    return features
        ?.filter(
            (feature) =>
                feature.isFeatured &&
                feature.isActive
        )
        .sort(
            (a, b) =>
                (a.order ?? 0) - (b.order ?? 0)
        )
        .slice(0, 3);
};

/* -------------------------------------------------------------------------- */
/*                              FEATURE COMPONENT                             */
/* -------------------------------------------------------------------------- */

const FeatureCard = memo(({
    feature,
    index,
}: {
    feature: ServicesFeaturesModal;
    index: number;
}) => {
    return (
        <div
            className="
                flex
                flex-col
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
                    shrink-0
                    ${colors[index % colors.length]}
                `}
            >
                <DynamicIcon
                    iconName={feature.icon}
                    size={28}
                    className="text-white"
                />
            </span>

            <h4 className="pt-2 font-bold text-base">
                {feature.title}
            </h4>

            <div
                className="
                    pt-2
                    pb-3
                    text-sm
                "
                dangerouslySetInnerHTML={{
                    __html: feature.description || "",
                }}
            />
        </div>
    );
});

/* -------------------------------------------------------------------------- */
/*                                MAIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

const OurService = ({
    services,
}: OurServiceProps) => {

    const [activeTab, setActiveTab] = useState(0);

    const sortedServices = useMemo(() => {
        return [...services].sort(
            (a, b) =>
                (a.order ?? 0) - (b.order ?? 0)
        );
    }, [services]);

    const activeService =
        sortedServices?.[activeTab];

    if (!services?.length) {
        return (
            <p>
                No services available at the moment.
            </p>
        );
    }

    return (
        <section
            className="
                container-fluid
                mx-auto
                lg:px-8
                xl:container
            "
        >
            <div
                className="
                    rounded
                    bg-[#F7F9FA]
                    lg:px-10
                    overflow-hidden
                "
            >
                <div className="relative py-10">

                    {/* ------------------------------------------------------------------ */}
                    {/*                               HEADING                              */}
                    {/* ------------------------------------------------------------------ */}

                    <div className="text-center">

                        <p
                            className="
                                pt-4
                                pb-2
                                text-base
                            "
                        >
                            #OUR SERVICE
                        </p>

                        <h4
                            className="
                                pb-3
                                text-2xl
                                font-bold
                                sm:text-3xl
                                md:text-3xl
                                lg:text-3xl
                            "
                        >
                            What to expect?
                        </h4>

                    </div>

                    {/* ------------------------------------------------------------------ */}
                    {/*                             MAIN LAYOUT                             */}
                    {/* ------------------------------------------------------------------ */}

                    <div className="w-full lg:pl-10">

                        <div
                            className="
                                flex
                                flex-col
                                gap-4
                                xl:flex-row
                            "
                        >

                            {/* ------------------------------------------------------------------ */}
                            {/*                              TAB BUTTONS                           */}
                            {/* ------------------------------------------------------------------ */}

                            <div
                                role="tablist"
                                aria-label="Services"
                                className="
                                    mt-8
                                    flex
                                    flex-wrap
                                    justify-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-gray-500
                                    xl:flex-col
                                    xl:justify-start
                                "
                            >
                                {sortedServices.map(
                                    (
                                        service,
                                        index
                                    ) => {

                                        const isActive =
                                            activeTab === index;

                                        return (
                                            <button
                                                key={service.id}
                                                role="tab"
                                                aria-selected={isActive}
                                                type="button"
                                                onClick={() =>
                                                    setActiveTab(index)
                                                }
                                                className={`
                                                    flex
                                                    items-center
                                                    justify-start
                                                    whitespace-nowrap
                                                    border-b-2
                                                    p-4
                                                    text-left
                                                    text-sm
                                                    font-medium
                                                    transition-[border-color,color]
                                                    duration-300
                                                    xl:min-w-40
                                                    xl:border-b-0
                                                    xl:border-r-2

                                                    ${isActive
                                                        ? `
                                                            border-[#FFD074]
                                                            text-black
                                                        `
                                                        : `
                                                            border-transparent
                                                            text-black
                                                        `
                                                    }
                                                `}
                                            >
                                                {service.title}
                                            </button>
                                        );
                                    }
                                )}
                            </div>

                            {/* ------------------------------------------------------------------ */}
                            {/*                              TAB CONTENT                           */}
                            {/* ------------------------------------------------------------------ */}

                            <div className="flex-1">

                                {activeService && (

                                    <div
                                        className="
                                            flex
                                            flex-col
                                            items-start
                                            p-5
                                            sm:flex-row
                                        "
                                    >

                                        {/* ------------------------------------------------------------------ */}
                                        {/*                                SERVICE CARD                        */}
                                        {/* ------------------------------------------------------------------ */}

                                        <motion.div
                                            key={activeService.id}
                                            variants={fadeIn("right", 0.1)}
                                            initial="hidden"
                                            // animate="show"
                                            className="will-change-transform"
                                            whileInView="show"
                                            viewport={{
                                                once: true,
                                                amount: 0.15,
                                            }}
                                        >

                                            <Link
                                                href={`/service/${activeService.slug}`}
                                            >

                                                <div
                                                    className="
                                                        w-full
                                                        max-w-sm
                                                        overflow-hidden
                                                        rounded-xl
                                                        border
                                                        border-gray-200
                                                        bg-white
                                                        shadow-sm
                                                    "
                                                >

                                                    {/* IMAGE */}

                                                    <div
                                                        className="
                                                            relative
                                                            h-62.5
                                                            w-full
                                                            overflow-hidden
                                                            rounded-t-xl
                                                        "
                                                    >
                                                        <Image
                                                            src={`${BASE_URL}/uploads/${activeService.featuredImagePath}`}
                                                            alt={
                                                                activeService.title ||
                                                                "Service image"
                                                            }
                                                            fill
                                                            className="object-cover"
                                                            sizes="
                                                                (max-width: 768px) 100vw,
                                                                33vw
                                                            "
                                                            priority={false}
                                                        />
                                                    </div>

                                                    {/* CONTENT */}

                                                    <div
                                                        className="
                                                            flex
                                                            flex-col
                                                            gap-4
                                                            p-6
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                flex
                                                                flex-col
                                                                gap-2
                                                            "
                                                        >

                                                            <h3
                                                                className="
                                                                    text-xl
                                                                    font-bold
                                                                    text-black
                                                                "
                                                            >
                                                                {activeService.title}
                                                            </h3>

                                                            <div
                                                                className="
                                                                    h-2.5
                                                                    w-full
                                                                    rounded-full
                                                                    bg-gray-200
                                                                "
                                                            >
                                                                <div
                                                                    className="
                                                                        h-2.5
                                                                        w-[45%]
                                                                        rounded-full
                                                                        bg-linear-to-r
                                                                        from-indigo-500
                                                                        via-purple-500
                                                                        to-pink-500
                                                                    "
                                                                />
                                                            </div>

                                                        </div>

                                                        <p
                                                            className="
                                                                text-base
                                                                text-gray-700
                                                            "
                                                        >
                                                            {activeService.shortNote || ""}
                                                        </p>

                                                    </div>

                                                </div>

                                            </Link>

                                        </motion.div>

                                        {/* ------------------------------------------------------------------ */}
                                        {/*                                FEATURES                            */}
                                        {/* ------------------------------------------------------------------ */}

                                        <div
                                            className="
                                                mt-0
                                                flex-1
                                                sm:ml-4
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    w-full
                                                    flex-col
                                                    px-2
                                                    lg:justify-center
                                                "
                                            >

                                                {getFeaturedServices(
                                                    activeService.serviceFeatures
                                                ).map(
                                                    (
                                                        feature,
                                                        index
                                                    ) => (
                                                        <FeatureCard
                                                            key={feature.id}
                                                            feature={feature}
                                                            index={index}
                                                        />
                                                    )
                                                )}

                                            </div>

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default OurService;