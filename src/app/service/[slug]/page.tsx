import { getServiceBySlug } from '@/src/services/mainService';
import Details from './component.tsx/Details';
import ServiceFeatureList from './component.tsx/ServiceFeatureList';
import ServiceHighlights from './component.tsx/ServiceHighlights';
import SectionViewHeader from '@/src/shared/components/SectionViewHeader';

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

            <section className="flex justify-center py-5 lg:py-8 sm:py-10 px-8">
                <div className="md:container overflow-hidden">
                    <SectionViewHeader header="Our Service" title={serviceSlug?.title} />
                    <Details
                        description={serviceSlug?.description || ""}
                        featuredImagePath={`${BASE_URL}/${serviceSlug?.featuredImagePath}`}
                        header={""}
                    />
                </div>
            </section>

            <ServiceFeatureList datas={serviceSlug?.serviceFeatures} />
            <ServiceHighlights datas={serviceSlug?.serviceHighlights} />


        </>
    );
};

export default ServiceSlugPage;