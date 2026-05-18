import React from "react";

import Script from "next/script";

import WhyWorkWithUs from "./components/WhyWorkWithUs";

import { getAllJobs } from "@/src/services/JobService";
import { getAllJobRoles } from "@/src/services/jobRoleService";
import { getAllCareer } from "@/src/services/careerService";

import CareerJobsWrapper from "./components/CareerJobsWrapper";

import SectionHeader from "@/src/shared/components/SectionHeader";

export const metadata = {
    title:
        "Career Opportunities in Web and App Development - IZH Tech",

    description:
        "Explore career opportunities at IZH Tech. Join our team and grow your career in web development, mobile app development, and digital marketing.",

    alternates: {
        canonical:
            "https://izhtech.com/career",
    },

    openGraph: {
        title:
            "Career Opportunities in Web and App Development - IZH Tech",

        description:
            "Explore career opportunities at IZH Tech. Join our team and grow your career in web development, mobile app development, and digital marketing.",

        url:
            "https://izhtech.com/career",

        type:
            "website",
    },

    twitter: {
        card:
            "summary_large_image",

        title:
            "Career Opportunities in Web and App Development - IZH Tech",

        description:
            "Explore career opportunities at IZH Tech. Join our team and grow your career in web development, mobile app development, and digital marketing.",
    },
};

const CareerPage = async () => {

    const [jobLists, jobRoles, career] =
        await Promise.all([
            getAllJobs(),
            getAllJobRoles(),
            getAllCareer(),
        ]);

    // filter active roles
    const filteredJobs =
        jobLists?.filter((job: any) => {

            const roleIds =
                Array.isArray(job.jobRolesId)
                    ? job.jobRolesId
                    : [job.jobRolesId];

            return roleIds.some((id: string) => {

                const matchedRole =
                    jobRoles?.find(
                        (role: any) =>
                            role.id === id
                    );

                return (
                    matchedRole?.roleStatus === true
                );
            });
        });

    // JobPosting Schema
    const jobSchema =
        filteredJobs &&
            filteredJobs.length > 0
            ? {
                "@context":
                    "https://schema.org",

                "@graph":
                    filteredJobs.map(
                        (job: any) => ({
                            "@type":
                                "JobPosting",

                            title:
                                job.title,

                            description:
                                job.shortNote,

                            datePosted:
                                new Date().toISOString(),

                            validThrough:
                                new Date(
                                    new Date().setMonth(
                                        new Date().getMonth() + 1
                                    )
                                ).toISOString(),

                            employmentType:
                                job.employmentMode,

                            workHours:
                                job.workMode,

                            hiringOrganization:
                            {
                                "@type":
                                    "Organization",

                                name:
                                    "IZH Tech",

                                sameAs:
                                    "https://izhtech.com",

                                logo:
                                    "https://izhtech.com/logo-primary.png",
                            },

                            jobLocation:
                            {
                                "@type":
                                    "Place",

                                address:
                                {
                                    "@type":
                                        "PostalAddress",

                                    addressCountry:
                                        "IN",
                                },
                            },

                            identifier:
                            {
                                "@type":
                                    "PropertyValue",

                                name:
                                    "IZH Tech",

                                value:
                                    job.id,
                            },

                            url:
                                `https://izhtech.com/career/${job.slug}`,
                        })
                    ),
            }
            : null;

    // AboutPage Schema
    const aboutSchema = {
        "@context":
            "https://schema.org",

        "@type":
            "AboutPage",

        name:
            "Careers at IZH Tech",

        url:
            "https://izhtech.com/career",

        description:
            "Career opportunities at IZH Tech. Join our creative team working on branding, web development, app development, and digital marketing projects.",

        mainEntity: {
            "@type":
                "Organization",

            name:
                "IZH Tech",

            url:
                "https://izhtech.com",

            logo:
                "https://izhtech.com/logo.png",

            description:
                "IZH Tech is a digital company providing branding, web development, app development, and digital marketing services.",
        },
    };

    return (
        <section className="mx-auto container-fluid">

            {/* Job Schema */}
            {jobSchema && (
                <Script
                    id="career-job-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html:
                            JSON.stringify(
                                jobSchema
                            ),
                    }}
                />
            )}

            {/* About Schema */}
            <Script
                id="career-about-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            aboutSchema
                        ),
                }}
            />

            <SectionHeader
                title="Career"
                description={
                    <>
                        Are you Looking for
                        Your Dream{" "}
                        <span className="text-[#0E3BF9]">
                            Job?
                        </span>
                    </>
                }
                srOnlyText="IZH Tech provides career opportunities in web development, mobile app development, branding and digital marketing."
                buttonText="Apply Now"
                customObjectVariant="orange-disk"
            />

            {/* <h2 className="sr-only">
                Jobs in Web Development, Branding and Digital Marketing
            </h2> */}

            <CareerJobsWrapper
                jobLists={jobLists}
                jobRoles={jobRoles}
                career={career}
            />

            <WhyWorkWithUs />

        </section>
    );
};

export default CareerPage;