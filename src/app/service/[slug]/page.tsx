import React from "react";
import Script from "next/script";
import { notFound } from "next/navigation";
import striptags from "striptags";

import { getServiceBySlug } from "@/src/services/mainService";

import Details from "./component.tsx/Details";
import ServiceFeatureList from "./component.tsx/ServiceFeatureList";
import ServiceHighlights from "./component.tsx/ServiceHighlights";

import SectionViewHeader from "@/src/shared/components/SectionViewHeader";

interface ServiceSlugPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL;

const SITE_URL =
    "https://izhtech.com";

// Reusable service formatter
const formatServiceData = (
    serviceSlug: any,
    slug: string
) => {
    const currentUrl =
        `${SITE_URL}/service/${slug}`;

    const imageUrl =
        serviceSlug?.featuredImagePath
            ? `${BASE_URL}/${serviceSlug.featuredImagePath.replace(
                /\\/g,
                "/"
            )}`
            : "";

    const plainDescription = striptags(
        serviceSlug?.description || ""
    );

    return {
        currentUrl,
        imageUrl,
        plainDescription,
    };
};

// Reusable schema generator
const generateServiceSchema = (
    serviceSlug: any,
    currentUrl: string,
    imageUrl: string,
    plainDescription: string
) => {
    return [
        {
            "@context": "https://schema.org",

            "@type": "Service",

            "@id": currentUrl,

            name: serviceSlug.title,

            description: plainDescription,

            provider: {
                "@type": "Organization",

                name: "IZH Tech",

                url: SITE_URL,

                logo: `${SITE_URL}/logo-primary.png`,
            },

            image: imageUrl,
        },

        {
            "@context": "https://schema.org",

            "@type": "BreadcrumbList",

            itemListElement: [
                {
                    "@type": "ListItem",

                    position: 1,

                    name: "Home",

                    item: SITE_URL,
                },

                {
                    "@type": "ListItem",

                    position: 2,

                    name: "Services",

                    item: `${SITE_URL}/service`,
                },

                {
                    "@type": "ListItem",

                    position: 3,

                    name: serviceSlug.title,

                    item: currentUrl,
                },
            ],
        },
    ];
};

export async function generateMetadata({
    params,
}: ServiceSlugPageProps) {
    const { slug } = await params;

    const serviceSlug =
        await getServiceBySlug(slug);

    if (!serviceSlug) {
        notFound();
    }

    const {
        currentUrl,
        imageUrl,
        plainDescription,
    } = formatServiceData(
        serviceSlug,
        slug
    );

    return {
        title:
            serviceSlug?.title ||
            "Service",

        description:
            plainDescription ||
            "IZH Tech service details",

        alternates: {
            canonical: currentUrl,
        },

        openGraph: {
            title: serviceSlug?.title,

            description:
                plainDescription,

            url: currentUrl,

            images: [
                {
                    url: imageUrl,
                },
            ],

            type: "website",
        },

        twitter: {
            card:
                "summary_large_image",

            title:
                serviceSlug?.title,

            description:
                plainDescription,

            images: [imageUrl],
        },
    };
}

const ServiceSlugPage = async ({
    params,
}: ServiceSlugPageProps) => {
    const { slug } = await params;

    const serviceSlug =
        await getServiceBySlug(slug);

    if (!serviceSlug) {
        notFound();
    }

    const {
        currentUrl,
        imageUrl,
        plainDescription,
    } = formatServiceData(
        serviceSlug,
        slug
    );

    const serviceSchema =
        generateServiceSchema(
            serviceSlug,
            currentUrl,
            imageUrl,
            plainDescription
        );

    return (
        <>
            <Script
                id="service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            serviceSchema
                        ),
                }}
            />

            <section className="flex justify-center py-5 lg:py-8 sm:py-10 px-8">

                <div className="md:container overflow-hidden">

                    <SectionViewHeader
                        header="Our Service"
                        title={serviceSlug?.title}
                    />

                    <Details
                        description={
                            serviceSlug?.description || ""
                        }
                        featuredImagePath={
                            imageUrl
                        }
                        header={""}
                    />

                </div>

            </section>

            <ServiceFeatureList
                datas={
                    serviceSlug?.serviceFeatures
                }
            />

            <ServiceHighlights
                datas={
                    serviceSlug?.serviceHighlights
                }
            />
        </>
    );
};

export default ServiceSlugPage;