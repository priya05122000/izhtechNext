"use client";

import Link from "next/link";
import React from "react";

interface JobRolesModel {
    id: string;
    roleName: string;
    roleStatus: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

interface Project {
    id: string;
    slug: string;
    title: string;
    shortNote: string;
    workMode: string;
    employmentMode: string;
    yearOfExperience: number;
    openPositions: number;
    description: string;
    educationAndQualification: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    jobRolesId: string[] | string;
}

interface JobListProps {
    jobLists: Project[];
    jobRoles?: JobRolesModel[];
    activeRoleId: string | null;
}

const JobList = ({
    jobLists,
    jobRoles = [],
    activeRoleId,
}: JobListProps) => {

    const parseArray = (value: unknown) => {
        try {
            const parsed =
                typeof value === "string"
                    ? JSON.parse(value)
                    : value;

            return Array.isArray(parsed)
                ? parsed.join(", ")
                : String(parsed);
        } catch {
            return String(value);
        }
    };

    const TagButton = ({
        children,
    }: {
        children: React.ReactNode;
    }) => (
        <button className="px-2 py-1 text-xs font-bold border rounded bg-white text-black border-black uppercase">
            {children}
        </button>
    );

    // Filter Jobs
    const filteredJobs = jobLists
        ?.filter((job) => {
            if (!activeRoleId) return true;

            const roleIds = Array.isArray(job.jobRolesId)
                ? job.jobRolesId
                : [job.jobRolesId];

            return roleIds.includes(activeRoleId);
        })
        ?.filter((job) => {
            const roleIds = Array.isArray(job.jobRolesId)
                ? job.jobRolesId
                : [job.jobRolesId];

            return roleIds.some((id) => {
                const matchedRole = jobRoles?.find(
                    (role) => role.id === id
                );

                return matchedRole?.roleStatus;
            });
        });

    return (
        <section className="md:container mt-20 px-0 sm:px-5 mx-auto justify-center">
            {filteredJobs?.length > 0 ? (
                filteredJobs.map((job) => (
                    <div key={job.id}>
                        <div className="grid grid-cols-1 md:grid-cols-12 my-10 px-5 gap-5">

                            {/* Job Info */}
                            <div className="col-span-12 md:col-span-10">
                                <p className="text-3xl sm:text-5xl font-bold">
                                    {job.title}
                                </p>

                                <p className="text-sm sm:text-base mt-3">
                                    {job.shortNote}
                                </p>

                                <div className="flex flex-wrap mt-5 gap-5">
                                    <TagButton>
                                        {parseArray(job.workMode)}
                                    </TagButton>

                                    <TagButton>
                                        {parseArray(job.employmentMode)}
                                    </TagButton>

                                    <TagButton>
                                        {job.yearOfExperience < 1
                                            ? "Fresher"
                                            : `${job.yearOfExperience} ${job.yearOfExperience > 1
                                                ? "Years"
                                                : "Year"
                                            } Experience`}
                                    </TagButton>

                                    {/* <TagButton>
                                        {job.openPositions} Open Position
                                        {job.openPositions > 1 ? "s" : ""}
                                    </TagButton> */}
                                </div>
                            </div>

                            {/* Apply Button */}
                            <div className="col-span-12 md:col-span-2 flex items-start md:items-end md:justify-end">

                                <Link href={`/career/${job.slug}`} className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-sm text-white rounded bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2l h-8 py-1 px-4 w-32 mt-5 relative group"><span className="transition-transform duration-300 group-hover:-translate-x-3">Apply</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right absolute w-4 h-4 transition-opacity duration-300 opacity-0 right-3 group-hover:opacity-100" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></Link>
                            </div>
                        </div>

                        <hr className="border-t-2 border-gray-300" />
                    </div>
                ))
            ) : (
                <div className="text-center py-20">
                    <p className="text-2xl font-semibold">
                        No jobs found
                    </p>
                </div>
            )}
        </section>
    );
};

export default JobList;