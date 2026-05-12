import { getAllServices } from "@/src/services/mainService";
import CustomObject from "@/src/shared/components/CustomObjects";
import Link from "next/link";
import React from "react";
import ImageFirstServiceBlock from "./components/ImageFirstServiceBlock";
import ImageSecondServiceBlock from "./components/ImageSecondServiceBlock";

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
            <section className="px-8 mx-auto md:container">
                <section className="relative py-5 bg-transparent lg:py-10">
                    <div className="flex-col justify-center gap-4 my-auto h-4/5 lg:flex lg:flex-row">
                        <div className="w-full mx-auto">
                            <div className="flex flex-col justify-end h-full">
                                <CustomObject
                                    className="absolute -z-10"
                                    variants="green-disk"
                                />

                                <h1 className="pt-4 text-5xl font-bold lg:w-3/4 2xl:text-7xl lg:text-4xl md:text-4xl sm:text-4xl">
                                    Our Services
                                </h1>

                                <p className="sr-only">
                                    IZH Tech provides web development, mobile app
                                    development, branding and digital marketing
                                    services.
                                </p>

                                <p className="pt-4 pb-4 text-base">
                                    Leave us a little info, and we’ll be in touch.
                                </p>

                                <Link
                                    href="/contact"
                                    className="transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background flex items-center justify-center text-sm font-bold text-white rounded border h-8 py-1 px-4 w-32 mt-0 bg-black relative group"
                                >
                                    <span className="transition-transform duration-300 group-hover:-translate-x-3">
                                        Contact Us
                                    </span>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-arrow-right absolute w-4 h-4 transition-opacity duration-300 opacity-0 right-3 group-hover:opacity-100"
                                        aria-hidden="true"
                                    >
                                        <path d="M5 12h14"></path>
                                        <path d="m12 5 7 7-7 7"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

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