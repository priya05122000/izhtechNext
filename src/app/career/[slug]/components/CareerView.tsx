"use client";

import React from "react";
import Link from "next/link";

import CustomObject from "@/src/shared/components/CustomObjects";
import SectionHeader from "@/src/shared/components/SectionHeader";
import LinkButton from "@/src/shared/components/LinkButton";

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

            <SectionHeader
                title={jobSlug?.title}
                description={jobSlug.shortNote}
                // description={<>Are you Looking for Your Dream <span className="text-[#0E3BF9]">Job?</span></>}
                srOnlyText={`Job opportunity at IZH Tech in web development, mobile app development, branding and digital marketing. Apply now for career growth. ${jobSlug?.title || "Job opening at IZH Tech"}`}
                buttonText="View more"
                buttonHref="/contact"
                customObjectVariant="orange-disk"
            />


            {/* Content Section */}
            <section className="px-5 sm:px-8 mb-20 mx-auto md:container">


                {/* Description */}
                <div className="mt-10">
                    <h2 className="text-[#0E3BF9] font-bold text-[15.84px]">
                        {jobSlug?.title} Required Skills
                    </h2>

                    {renderHTMLBulletPoints(jobSlug?.description)}
                </div>

                {/* Open Positions */}
                <div className="mt-10">
                    <h3 className="text-[#0E3BF9] font-bold text-[15.84px]">
                        Open Positions
                    </h3>

                    <p className="mt-2">
                        {jobSlug?.openPositions}
                    </p>
                </div>

                {/* Education */}
                <div className="mt-10">
                    <h3 className="text-[#0E3BF9] font-bold text-[15.84px]">
                        Education & Qualification
                    </h3>

                    <p className="mt-2">
                        {jobSlug?.educationAndQualification instanceof Date
                            ? jobSlug.educationAndQualification.toDateString()
                            : jobSlug?.educationAndQualification}
                    </p>
                </div>

                {/* Experience */}
                <div className="mt-10">
                    <h3 className="text-[#0E3BF9] font-bold text-[15.84px]">
                        Years of Experience
                    </h3>

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
                    {/* <Link
                        href={`mailto:celibadhanasekharan@izhtech.com?subject=Job Application for ${jobSlug?.title}`}
                        className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-white transition-all rounded-md bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
                    >
                        Apply
                    </Link> */}

                    <LinkButton
                        href={`mailto:celibadhanasekharan@izhtech.com?subject=Job Application for ${jobSlug?.title}`}
                        className="h-10 px-6 text-sm font-medium text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md"
                    >
                        Apply
                    </LinkButton>
                </div>
            </section>
        </section>
    );
};

export default CareerView;