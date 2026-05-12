"use client";

import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Clients {
    id: string;
    name: string;
    companyName: string;
    industry: string;
    description: string;
    isActive: boolean | string;
    logo?: string;
    serviceId: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

interface PartnerCompanyProps {
    clients: Clients[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function PartnerCompany({
    clients,
}: PartnerCompanyProps) {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        arrows: true,
        dots: false,
        centerMode: true,
        centerPadding: "0px",

        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    arrows: false,
                },
            },
        ],
    };

    if (!clients?.length) {
        return null;
    }

    return (
        <section className="py-8 bg-white">
            <div className="relative w-full px-4 mx-auto max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">

                <Slider {...settings}>
                    {clients.map((client, idx) => (
                        <div
                            key={client.id || idx}
                            className="flex items-center justify-center px-2"
                        >
                            <div className="flex items-center justify-center w-full h-full">

                                {client?.logo && (
                                    <Image
                                        src={`${BASE_URL}/${client.logo.replace(/\\/g, "/")}`}
                                        alt={client?.name || "Client Logo"}
                                        width={120}
                                        height={80}
                                        className="object-contain w-full h-16 transition-all filter grayscale hover:grayscale-0 lg:h-20 max-w-30"
                                    />
                                )}

                            </div>
                        </div>
                    ))}
                </Slider>

            </div>
        </section>
    );
}