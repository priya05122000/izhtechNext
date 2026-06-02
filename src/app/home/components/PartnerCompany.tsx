"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import styles from "./partner.module.css"

import "swiper/css";

interface Clients {
    id: string;
    name: string;
    logo?: string;
}

interface PartnerCompanyProps {
    clients: Clients[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function PartnerCompany({
    clients,
}: PartnerCompanyProps) {
    if (!clients?.length) return null;

    return (
        <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    speed={4000}
                    allowTouchMove={false}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 30,
                        },
                    }}
                    className={styles["partner-swiper"]}
                >
                    {clients.map((client) => (
                        <SwiperSlide key={client.id}>
                            <div className="flex items-center justify-center h-20">
                                {client.logo && (
                                    <Image
                                        src={`${BASE_URL}/uploads/${client.logo.replace(/\\/g, "/")}`}
                                        alt={client.name}
                                        width={120}
                                        height={80}
                                        loading="lazy"
                                        quality={60}
                                        sizes="120px"
                                        className="object-contain  h-14 w-auto grayscale hover:grayscale-0 transition-all"
                                        unoptimized={true}
                                    />
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}