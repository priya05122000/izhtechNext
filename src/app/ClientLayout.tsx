"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import CustomObject from "../shared/components/CustomObjects";
import PageScroll from "../shared/components/PageScroll";
import Collaboration from "../shared/components/Collaboration";
import SocialMediaTag from "../shared/components/SocialMediaTag";

import { getAllSiteInfo } from "../services/siteInfoService";

interface SiteInformation {
    id: string;
    companyName?: string;
    professionalExperience?: string;
    teamCount?: string;
    vision?: string;
    mission?: string;
    values?: string;
    projectHandled?: string;
    mobilePrimary?: string;
    mobileSecondary?: string;
    mobileSales?: string;
    mobileHR?: string;
    emailPrimary?: string;
    emailSecondary?: string;
    emailSales?: string;
    emailHR?: string;
    address?: string;
}

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const currentPath = usePathname();

    const isAboutPage = currentPath === "/about";
    const isBlogPage = currentPath === "/blog";

    const [siteInfo, setSiteInfo] = useState<SiteInformation[]>([]);

    useEffect(() => {

        async function fetchSiteInfo() {
            try {
                const data = await getAllSiteInfo();
                setSiteInfo(data || []);
            } catch (error) {
                console.error("Failed to fetch site info:", error);
            }
        }

        fetchSiteInfo();

    }, []);

    return (
        <>
            <Navbar />

            <section
                className={`relative mx-auto container-fluid`}
            >

                <CustomObject
                    className="
                        absolute
                        -top-40
                        -right-40
                        -z-10
                        h-[100vw]
                        max-w-7xl
                        sm:-top-20
                        sm:-right-20
                        sm:h-[40vh]
                        lg:-top-40
                        lg:-right-40
                        lg:h-[50vh]
                        2xl:block
                    "
                    variants="circle-2"
                />

                <PageScroll />

                <section
                    className={`relative mx-auto ${!isAboutPage && !isBlogPage
                        ? ""
                        : ""
                        } container-fluid`}
                >
                    {/* <section className="container-fluid relative mx-auto"> */}
                    {children}
                    {/* </section> */}
                </section>
                {/* <section
                    className={`relative mx-auto ${!isAboutPage && !isBlogPage
                            ? "overflow-hidden"
                            : ""
                        } container-fluid`}
                >
                    <section className="container-fluid relative mx-auto overflow-hidden">
                        {children}
                    </section>
                </section> */}

                <section
                    className={`relative mx-auto ${!isAboutPage && !isBlogPage
                        ? "overflow-hidden"
                        : ""
                        } container-fluid`}
                >
                    {currentPath !== "/contact" && (
                        <section className="py-12 bg-black md:py-20">
                            <div className="px-4 mx-auto md:container md:px-0">
                                <Collaboration />
                            </div>
                        </section>
                    )}
                </section>

                <SocialMediaTag />

            </section>

            <Footer siteInfo={siteInfo} />
        </>
    );
}