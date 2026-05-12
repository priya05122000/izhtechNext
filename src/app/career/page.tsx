import React from "react";

import Career from "./components/Career";
import WhyWorkWithUs from "./components/WhyWorkWithUs";

import { getAllJobs } from "@/src/services/JobService";
import { getAllJobRoles } from "@/src/services/jobRoleService";
import { getAllCareer } from "@/src/services/careerService";
import CareerJobsWrapper from "./components/CareerJobsWrapper";

const CareerPage = async () => {
    const [jobLists, jobRoles, career] = await Promise.all([
        getAllJobs(),
        getAllJobRoles(),
        getAllCareer(),
    ]);

    return (
        <section className="mx-auto container-fluid">
            <Career />

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