"use client";

import React, { useState } from "react";

import FilterJobs from "./FilterJobs";
import JobList from "./JobList";

interface JobRolesModel {
    id: string;
    roleName: string;
    roleStatus: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

interface CareerModel {
    id?: string;
    careerBannerImage?: string;
    careerDescription?: string;
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

interface CareerJobsWrapperProps {
    jobLists: Project[];
    jobRoles: JobRolesModel[];
    career?: CareerModel[];
}

const CareerJobsWrapper = ({
    jobLists,
    jobRoles,
    career = [],
}: CareerJobsWrapperProps) => {
    const [activeRoleId, setActiveRoleId] = useState<string | null>(null);

    return (
        <>
            <FilterJobs
                jobRoles={jobRoles}
                career={career}
                activeRoleId={activeRoleId}
                setActiveRoleId={setActiveRoleId}
            />

            <JobList
                jobLists={jobLists}
                jobRoles={jobRoles}
                activeRoleId={activeRoleId}
            />
        </>
    );
};

export default CareerJobsWrapper;