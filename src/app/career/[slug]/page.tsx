// page.tsx

import React from "react";

import { getJobBySlug } from "@/src/services/JobService";

import CareerView from "./components/CareerView";

interface JobSlugPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const CareerSlugPage = async ({
    params,
}: JobSlugPageProps) => {

    const { slug } = await params;

    const jobSlug = await getJobBySlug(slug);

    return (
        <CareerView jobSlug={jobSlug} />
    );
};

export default CareerSlugPage;