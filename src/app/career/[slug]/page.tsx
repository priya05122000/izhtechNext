import React from "react";

import Script from "next/script";

import { getJobBySlug } from "@/src/services/JobService";

import CareerView from "./components/CareerView";
import { notFound } from "next/navigation";

interface JobSlugPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: JobSlugPageProps) {

    const { slug } = await params;

    const jobSlug =
        await getJobBySlug(slug);

    const currentUrl =
        `https://izhtech.com/career/${slug}`;

    return {
        title:
            jobSlug?.title
                ? `${jobSlug.title} Career Opportunities - Izh Tech`
                : "Career Opportunities - Izh Tech",

        description:
            jobSlug?.shortNote ||
            "Career opportunity at Izh Tech",

        alternates: {
            canonical:
                currentUrl,
        },

        openGraph: {
            title:
                `${jobSlug?.title} Career Opportunities - Izh Tech`,

            description:
                jobSlug?.shortNote,

            url:
                currentUrl,

            type:
                "website",
        },

        twitter: {
            card:
                "summary_large_image",

            title:
                `${jobSlug?.title} Career Opportunities - Izh Tech`,

            description:
                jobSlug?.shortNote,
        },
    };
}

const CareerSlugPage = async ({
    params,
}: JobSlugPageProps) => {

    const { slug } = await params;

    const jobSlug =
        await getJobBySlug(slug);

    if (!jobSlug) {
        notFound();
    }

    const currentUrl =
        `https://izhtech.com/career/${slug}`;

    // JobPosting Schema
    const jobSchema =
        jobSlug
            ? {
                "@context":
                    "https://schema.org",

                "@type":
                    "JobPosting",

                title:
                    jobSlug.title,

                description:
                    jobSlug.shortNote,

                employmentType:
                    jobSlug.employmentMode,

                workHours:
                    jobSlug.workMode,

                datePosted:
                    new Date().toISOString(),

                validThrough:
                    new Date(
                        new Date().setMonth(
                            new Date().getMonth() + 1
                        )
                    ).toISOString(),

                hiringOrganization:
                {
                    "@type":
                        "Organization",

                    name:
                        "Izh Tech",

                    sameAs:
                        "https://izhtech.com",

                    logo:
                        "https://izhtech.com/logo-primary.png",
                },

                jobLocation: {
                    "@type": "Place",

                    address: {
                        "@type": "PostalAddress",

                        streetAddress:
                            "III Floor, Nixon Pinnacle, North, Sarguna Veethi St, Cruz Enclave, Simon Nagar",

                        addressLocality:
                            "Nagercoil",

                        addressRegion:
                            "Tamil Nadu",

                        postalCode:
                            "629001",

                        addressCountry:
                            "IN",
                    },
                },
                baseSalary: {
                    "@type": "MonetaryAmount",

                    currency: "INR",

                    value: {
                        "@type": "QuantitativeValue",

                        minValue: 10000,

                        maxValue: 40000,

                        unitText: "MONTH",
                    },
                },

                identifier:
                {
                    "@type":
                        "PropertyValue",

                    name:
                        "Izh Tech",

                    value:
                        jobSlug.id,
                },

                url:
                    currentUrl,
            }
            : null;

    return (
        <>

            {/* JobPosting Schema */}
            {jobSchema && (
                <Script
                    id="career-slug-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html:
                            JSON.stringify(
                                jobSchema
                            ),
                    }}
                />
            )}

            <CareerView
                jobSlug={jobSlug}
            />

        </>
    );
};

export default CareerSlugPage;