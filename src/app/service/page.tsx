import { getAllServices } from "@/src/services/mainService";
import CustomObject from "@/src/shared/components/CustomObjects";
import Link from "next/link";
import React from "react";
import ImageFirstServiceBlock from "./components/ImageFirstServiceBlock";
import ImageSecondServiceBlock from "./components/ImageSecondServiceBlock";
import SectionHeader from "@/src/shared/components/SectionHeader";

interface ServiceFeature {
    isFeatured?: boolean;
    isActive?: boolean;
    order?: number;
    [key: string]: any;
}

interface Services {
    id: string;
    slug: string;
    title?: string;
    shortNote?: string;
    description?: string;
    icon?: string;
    order?: number;
    isActive?: boolean;
    featuredImagePath?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    serviceFeatures?: ServiceFeature[];
}

const ServicePage = async () => {
    const services = await getAllServices();

    const sortedServices: Services[] = services
        ? [...services].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        : [];

    return (
        <section className="mx-auto overflow-hidden container-fluid">
            {/* HEADER */}

            <SectionHeader
                title="Our Services"
                description="Leave us a little info, and we’ll be in touch."
                srOnlyText="IZH Tech provides web development, mobile app development, branding and digital marketing services."
                buttonText="Contact Us"
                buttonHref="/contact"
                customObjectVariant="green-disk"
            />


            <section className="px-5 mx-auto">
                {sortedServices?.map(
                    (serviceDetail: Services, index: number) => {
                        if (index % 2 === 0) {
                            return (
                                <ImageFirstServiceBlock
                                    key={serviceDetail.id}
                                    {...serviceDetail}
                                />
                            );
                        }

                        return (
                            <ImageSecondServiceBlock
                                key={serviceDetail.id}
                                {...serviceDetail}
                            />
                        );
                    }
                )}
            </section>
        </section>
    );
};

export default ServicePage;