"use client";

import React from "react";
import Link from "next/link";

import CustomObject from "@/src/shared/components/CustomObjects";

interface JobRolesModel {
    id: string;
    roleName: string;
    roleStatus: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

interface Job {
    id: string;
    slug: string;
    title: string;
    shortNote: string;
    workMode: string;
    employmentMode: string;
    yearOfExperience: number;
    openPositions: number;
    description: string;
    educationAndQualification: string | Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    jobRolesId: JobRolesModel[];
}

interface CareerViewProps {
    jobSlug: Job;
}

const CareerView = ({
    jobSlug,
}: CareerViewProps) => {

    const renderHTMLBulletPoints = (html?: string) => {
        if (!html) return null;

        const formattedHtml = html
            .replace(/<p>/g, "<li>")
            .replace(/<\/p>/g, "</li>")
            .replace(/&nbsp;/g, " ")
            .trim();

        return (
            <ul
                className="list-disc pl-5 space-y-2 mt-2"
                dangerouslySetInnerHTML={{
                    __html: formattedHtml,
                }}
            />
        );
    };

    return (
        <section className="mx-auto container-fluid">

            {/* Hero Section */}
            <section className="px-8 mx-auto md:container">
                <section className="relative py-5 lg:py-10">
                    <div className="flex-col justify-center gap-4 my-auto h-4/5 lg:flex lg:flex-row">

                        <div className="w-full mx-auto">
                            <div className="flex flex-col justify-end h-full">

                                <CustomObject
                                    className="absolute -z-10"
                                    variants="orange-disk"
                                />

                                <h1 className="pt-4 text-5xl font-bold lg:w-3/4 2xl:text-7xl lg:text-4xl md:text-4xl sm:text-4xl">
                                    Career
                                </h1>

                                <p className="sr-only">
                                    Job opportunity at IZH Tech in web development,
                                    mobile app development, branding and digital
                                    marketing. Apply now for career growth.
                                </p>

                                <h2 className="sr-only">
                                    {jobSlug?.title || "Job opening at IZH Tech"}
                                </h2>

                                <p className="pt-4 pb-4 text-base">
                                    Are you Looking for Your Dream{" "}
                                    <span className="text-[#0E3BF9]">
                                        Job?
                                    </span>
                                </p>

                                {/* <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center h-10 px-6 mt-0 text-sm font-medium text-white bg-black rounded-md w-fit"
                                >
                                    View more
                                </Link> */}

                                <Link href="/contact" className="transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background flex items-center justify-center text-sm font-bold text-white rounded border h-8 py-1 px-4 w-32 mt-0 bg-black relative group"><span className="transition-transform duration-300 group-hover:-translate-x-3">View more</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right absolute w-4 h-4 transition-opacity duration-300 opacity-0 right-3 group-hover:opacity-100" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></Link>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            {/* Content Section */}
            <section className="px-8 mb-20 mx-auto md:container">

                {/* Description */}
                <div className="mt-10">
                    <p className="text-[#0E3BF9] font-bold text-[15.84px]">
                        Required Skills
                    </p>

                    {renderHTMLBulletPoints(jobSlug?.description)}
                </div>

                {/* Open Positions */}
                <div className="mt-10">
                    <p className="text-[#0E3BF9] font-bold text-[15.84px]">
                        Open Positions
                    </p>

                    <p className="mt-2">
                        {jobSlug?.openPositions}
                    </p>
                </div>

                {/* Education */}
                <div className="mt-10">
                    <p className="text-[#0E3BF9] font-bold text-[15.84px]">
                        Education & Qualification
                    </p>

                    <p className="mt-2">
                        {jobSlug?.educationAndQualification instanceof Date
                            ? jobSlug.educationAndQualification.toDateString()
                            : jobSlug?.educationAndQualification}
                    </p>
                </div>

                {/* Experience */}
                <div className="mt-10">
                    <p className="text-[#0E3BF9] font-bold text-[15.84px]">
                        Years of Experience
                    </p>

                    <p className="mt-2">
                        {jobSlug?.yearOfExperience < 1
                            ? "Fresher"
                            : `${jobSlug?.yearOfExperience} ${jobSlug?.yearOfExperience > 1
                                ? "Years"
                                : "Year"
                            } Experience`}
                    </p>
                </div>

                {/* Apply Button */}
                <div className="mt-10 flex justify-end">
                    <Link
                        href={`mailto:celibadhanasekharan@izhtech.com?subject=Job Application for ${jobSlug?.title}`}
                        className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-white transition-all rounded-md bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
                    >
                        Apply
                    </Link>
                </div>
            </section>
        </section>
    );
};

export default CareerView;