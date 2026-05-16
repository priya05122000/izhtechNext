import React from 'react';

import Script from "next/script";

import { getServiceBySlug } from '@/src/services/mainService';

import Details from './component.tsx/Details';

import ServiceFeatureList from './component.tsx/ServiceFeatureList';

import ServiceHighlights from './component.tsx/ServiceHighlights';

import SectionViewHeader from '@/src/shared/components/SectionViewHeader';

import { notFound } from "next/navigation";

interface ServiceSlugPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: ServiceSlugPageProps) {

    const { slug } = await params;

    const serviceSlug =
        await getServiceBySlug(slug);

    if (!serviceSlug) {
        notFound();
    }

    const currentUrl =
        `https://izhtech.com/service/${slug}`;

    const imageUrl =
        serviceSlug?.featuredImagePath
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${serviceSlug.featuredImagePath.replace(
                /\\/g,
                "/"
            )}`
            : "";

    return {
        title:
            serviceSlug?.title ||
            "Service",

        description:
            serviceSlug?.description ||
            "IZH Tech service details",

        alternates: {
            canonical:
                currentUrl,
        },

        openGraph: {
            title:
                serviceSlug?.title,

            description:
                serviceSlug?.description,

            url:
                currentUrl,

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
                serviceSlug?.description,

            images: [imageUrl],
        },
    };
}

const ServiceSlugPage = async ({
    params,
}: ServiceSlugPageProps) => {

    const { slug } = await params;

    const BASE_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL;

    const serviceSlug =
        await getServiceBySlug(slug);

    if (!serviceSlug) {
        notFound();
    }


    const currentUrl =
        `https://izhtech.com/service/${slug}`;

    const imageUrl =
        serviceSlug?.featuredImagePath
            ? `${BASE_URL}/${serviceSlug.featuredImagePath.replace(
                /\\/g,
                "/"
            )}`
            : "";

    // Service Schema
    const serviceSchema =
        serviceSlug
            ? [
                {
                    "@context":
                        "https://schema.org",

                    "@type":
                        "Service",

                    "@id":
                        currentUrl,

                    name:
                        serviceSlug.title,

                    description:
                        serviceSlug.description,

                    provider: {
                        "@type":
                            "Organization",

                        name:
                            "IZH Tech",

                        url:
                            "https://izhtech.com",

                        logo:
                            "https://izhtech.com/logo-primary.png",
                    },

                    image:
                        imageUrl,
                },

                {
                    "@context":
                        "https://schema.org",

                    "@type":
                        "BreadcrumbList",

                    itemListElement: [
                        {
                            "@type":
                                "ListItem",

                            position: 1,

                            name:
                                "Home",

                            item:
                                "https://izhtech.com",
                        },

                        {
                            "@type":
                                "ListItem",

                            position: 2,

                            name:
                                "Services",

                            item:
                                "https://izhtech.com/service",
                        },

                        {
                            "@type":
                                "ListItem",

                            position: 3,

                            name:
                                serviceSlug.title,

                            item:
                                currentUrl,
                        },
                    ],
                },
            ]
            : null;

    return (
        <>

            {/* Service Schema */}
            {serviceSchema && (
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
            )}

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