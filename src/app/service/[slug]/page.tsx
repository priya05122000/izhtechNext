import { getProjectBySlug } from '@/src/services/projectService';
import React from 'react';
import ServiceHeader from './component.tsx/ServiceHeader';
import { getServiceBySlug } from '@/src/services/mainService';
import Details from './component.tsx/Details';
import ServiceFeatureList from './component.tsx/ServiceFeatureList';
import ServiceHighlights from './component.tsx/ServiceHighlights';

interface ServiceSlugPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const ServiceSlugPage = async ({ params }: ServiceSlugPageProps) => {

    const { slug } = await params;

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const serviceSlug = await getServiceBySlug(slug);


    return (
        <>
            <ServiceHeader title={serviceSlug?.title} />
            <Details
                description={serviceSlug?.description || ""}
                featuredImagePath={`${BASE_URL}/${serviceSlug?.featuredImagePath}`}
                header={""}
            />
            <ServiceFeatureList datas={serviceSlug?.serviceFeatures} />
            <ServiceHighlights datas={serviceSlug?.serviceHighlights} />

        </>
    );
};

export default ServiceSlugPage;