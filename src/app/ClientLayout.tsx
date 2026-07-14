"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import CustomObject from "../shared/components/CustomObjects";
import Collaboration from "../shared/components/Collaboration";
import SocialMediaTag from "../shared/components/SocialMediaTag";


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

interface ClientLayoutProps {
    children: React.ReactNode;
    siteInfo: SiteInformation[];
}

export default function ClientLayout({
    children,
    siteInfo,
}: ClientLayoutProps) {

    const currentPath = usePathname();

    const isAboutPage = currentPath === "/about";
    const isBlogPage = currentPath === "/blog";

    // const [siteInfo, setSiteInfo] = useState<SiteInformation[]>([]);

    // useEffect(() => {

    //     async function fetchSiteInfo() {
    //         try {
    //             const data = await getAllSiteInfo();
    //             setSiteInfo(data || []);
    //         } catch (error) {
    //             console.error("Failed to fetch site info:", error);
    //         }
    //     }

    //     fetchSiteInfo();

    // }, []);

    return (
        <>
            <Navbar />

            <section
                className={`relative mx-auto container-fluid ${!isAboutPage && !isBlogPage ? "overflow-hidden" : ""}`}
            >
                {/* <CustomObject
                    className={`
                        ${isAboutPage || isBlogPage ? "hidden" : ""
                        }
                        absolute
                        -top-40
                        -right-40
                        -z-10

                        sm:max-w-7xl
                        sm:-top-20
                        sm:-right-20
                        sm:h-[40vh]
                        lg:-top-40
                        lg:-right-40
                        lg:h-[50vh]
                        2xl:block
                    `}
                    variants="circle-3"
                /> */}

                <CustomObject
                    className={`${isAboutPage || isBlogPage ? "hidden" : "block"} absolute -z-10 -top-16 -right-16 w-45 h-45 md:-top-40 md:-right-40 md:w-80 md:h-80`}
                    variants="circle-3"
                    priority
                />

                {/* <PageScroll /> */}

                {/* <section
                    className={`relative mx-auto container-fluid ${!isAboutPage && !isBlogPage ? "overflow-hidden" : ""}`}
                > */}
                <main id="main-content">
                    {children}
                </main>
                {/* </section> */}

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