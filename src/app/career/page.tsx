import React from "react";
import WhyWorkWithUs from "./components/WhyWorkWithUs";

import { getAllJobs } from "@/src/services/JobService";
import { getAllJobRoles } from "@/src/services/jobRoleService";
import { getAllCareer } from "@/src/services/careerService";
import CareerJobsWrapper from "./components/CareerJobsWrapper";
import SectionHeader from "@/src/shared/components/SectionHeader";

const CareerPage = async () => {
    const [jobLists, jobRoles, career] = await Promise.all([
        getAllJobs(),
        getAllJobRoles(),
        getAllCareer(),
    ]);

    return (
        <section className="mx-auto container-fluid">

            <SectionHeader
                title="Career"
                description={<>Are you Looking for Your Dream <span className="text-[#0E3BF9]">Job?</span></>}
                srOnlyText="IZH Tech provides career opportunities in web development, mobile app development, branding and digital marketing."
                buttonText="Apply Now"
                customObjectVariant="orange-disk"
            />

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