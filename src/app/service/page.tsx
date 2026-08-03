import React from "react";

import Script from "next/script";

import { getAllServices } from "@/src/services/mainService";

import ImageFirstServiceBlock from "./components/ImageFirstServiceBlock";

import ImageSecondServiceBlock from "./components/ImageSecondServiceBlock";

import SectionHeader from "@/src/shared/components/SectionHeader";

interface ServiceFeature {
    title?: string;
    description?: string;
    icon?: string;
    isFeatured?: boolean;
    isActive?: boolean;
    order?: number;
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
    serviceFeatures?: ServiceFeature[];
}

export const metadata = {
    title: "Web Development and Digital Services - Izh Tech",

    description:
        "Grow your business with web development, mobile app development, branding and digital marketing services. Get a free consultation today.",

    alternates: {
        canonical:
            "https://izhtech.com/service",
    },
};

const ServicePage = async () => {

    const services =
        await getAllServices();

    const sortedServices:
        Services[] = services
            ? [...services].sort(
                (a, b) =>
                    (a.order ?? 0) -
                    (b.order ?? 0)
            )
            : [];

    // ItemList Schema
    const itemListSchema =
        services &&
            services.length > 0
            ? {
                "@context":
                    "https://schema.org",

                "@type":
                    "ItemList",

                "@id":
                    "https://izhtech.com/service#services",

                name:
                    "Web Development and Digital Services - Izh Tech",

                description:
                    "Grow your business with web development, mobile app development, branding and digital marketing services. Get a free consultation today.",

                itemListElement:
                    services.map(
                        (
                            service: Services,
                            idx: number
                        ) => ({
                            "@type":
                                "ListItem",

                            position:
                                idx + 1,

                            url:
                                `https://izhtech.com/service/${service.slug}`,

                            name:
                                service.title ||
                                "Service",

                            description:
                                service.shortNote ||
                                "",
                        })
                    ),
            }
            : null;

    // Service Catalog Schema
    const serviceSchema = {
        "@context":
            "https://schema.org",

        "@type":
            "Service",

        "@id":
            "https://izhtech.com/service#services",

        name:
            "Web Development and Digital Services - Izh Tech",

        description:
            "Grow your business with web development, mobile app development, branding and digital marketing services. Get a free consultation today.",

        provider: {
            "@type":
                "Organization",

            name:
                "Izh Tech",

            url:
                "https://izhtech.com",

            logo:
                "https://izhtech.com/logo.png",
        },

        hasOfferCatalog: {
            "@type":
                "OfferCatalog",

            name:
                "Izh Tech Service Catalog",

            itemListElement: [
                {
                    "@type":
                        "ListItem",

                    position: 1,

                    item: {
                        "@type":
                            "Service",

                        name:
                            "Branding",

                        description:
                            "Craft strong brand identities and guide businesses through meaningful brand experiences.",
                    },
                },

                {
                    "@type":
                        "ListItem",

                    position: 2,

                    item: {
                        "@type":
                            "Service",

                        name:
                            "Web Development",

                        description:
                            "Build custom websites and applications that match business goals and user needs.",
                    },
                },

                {
                    "@type":
                        "ListItem",

                    position: 3,

                    item: {
                        "@type":
                            "Service",

                        name:
                            "App Development",

                        description:
                            "Create custom mobile applications to improve efficiency, communication, and user engagement.",
                    },
                },

                {
                    "@type":
                        "ListItem",

                    position: 4,

                    item: {
                        "@type":
                            "Service",

                        name:
                            "Digital Marketing",

                        description:
                            "Improve online visibility and generate leads using SEO, social media marketing, and paid advertising.",
                    },
                },
            ],
        },
    };

    return (
        <section className="mx-auto overflow-hidden container-fluid">

            {/* ItemList Schema */}
            {itemListSchema && (
                <Script
                    id="services-itemlist-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html:
                            JSON.stringify(
                                itemListSchema
                            ),
                    }}
                />
            )}

            {/* Service Schema */}
            <Script
                id="services-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            serviceSchema
                        ),
                }}
            />

            <SectionHeader
                title="Our Services"
                description="Leave us a little info, and we’ll be in touch."
                srOnlyText="Izh Tech provides web development, mobile app development, branding and digital marketing services."
                buttonText="Contact Us"
                buttonHref="/contact"
                customObjectVariant="green-disk"
            />

            <h2 className="sr-only"> Custom Software Development and Digital Solutions Services</h2>

            <section className="px-5 mx-auto">

                {sortedServices?.map(
                    (
                        serviceDetail:
                            Services,
                        index:
                            number
                    ) => {

                        if (
                            index % 2 === 0
                        ) {
                            return (
                                <ImageFirstServiceBlock
                                    key={
                                        serviceDetail.id
                                    }
                                    {...serviceDetail}
                                />
                            );
                        }

                        return (
                            <ImageSecondServiceBlock
                                key={
                                    serviceDetail.id
                                }
                                {...serviceDetail}
                            />
                        );
                    }
                )}

            </section>

        </section>
    );
};

export default ServicePage;