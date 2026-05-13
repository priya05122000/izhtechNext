// Footer.tsx

"use client";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import LazyCaptcha from "@/src/shared/components/LazyCaptcha";
import LinkButton from "@/src/shared/components/LinkButton";

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

interface FooterProps {
    siteInfo: SiteInformation[];
}

export default function Footer({
    siteInfo,
}: FooterProps) {

    return (
        <footer className="bg-neutral-900 text-white">

            <div className="mx-auto px-4 py-14 md:px-14 lg:px-16 xl:px-14">

                <div className="grid gap-10 md:gap-5 lg:gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">

                    {/* Logo & Socials */}
                    <div>

                        <img
                            src="/Logo-white.png"
                            alt="Logo"
                            className="h-16 mb-4"
                        />

                        <h6 className="text-sm font-semibold">
                            Follow Us -
                            <a
                                href="https://www.instagram.com/izh_tech"
                                target="_blank"
                                className="ml-1"
                            >
                                /Ig.
                            </a>

                            <a
                                href="https://www.facebook.com/izhtech"
                                target="_blank"
                                className="ml-1"
                            >
                                /Fb.
                            </a>

                            <a
                                href="https://www.linkedin.com/company/izh-tech/"
                                target="_blank"
                                className="ml-1"
                            >
                                /In.
                            </a>
                        </h6>

                    </div>

                    {/* Address */}
                    <div>

                        <h2 className="font-semibold">
                            Address
                        </h2>

                        {siteInfo.length > 0 && (
                            <div className="pt-3 text-gray-300">
                                <p>{siteInfo[0]?.address}</p>
                            </div>
                        )}

                    </div>

                    {/* Work Enquiries */}
                    <div>

                        <h2 className="font-semibold">
                            Work Enquiries
                        </h2>

                        <div className="pt-3 text-gray-300">

                            <p>
                                Interested in working with us?
                            </p>

                            <a
                                href="mailto:celibadhanasekharan@izhtech.com"
                                className="font-bold"
                            >
                                celibadhanasekharan@izhtech.com
                            </a>

                        </div>

                        <LinkButton
                            href="/images/pdf/izhtech_profile.pdf"
                            className="text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 border-none h-8 py-1 mt-5 w-fit px-6"
                        >
                            Overview and Packages
                        </LinkButton>

                    </div>

                    {/* Newsletter */}
                    <div>

                        <h2 className="font-semibold">
                            Sign up for the newsletter
                        </h2>
                        <LazyCaptcha
                            form={"contact-us"}>
                            <NewsletterForm />
                        </LazyCaptcha>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center  pt-5 lg:pt-10 mt-5 lg:mt-10">
                    <div data-testid="flowbite-footer-copyright" className=" sm:text-center text-sm text-white text-start">© <a href="/" className="ml-1 hover:underline">izhtech 2024. All rights reserved</a>
                    </div>
                    <div className="flex flex-wrap justify-between sm:justify-center gap-2 mt-4 sm:mt-0 text-xs text-white list-none">
                        <li className="me-4 last:mr-0 md:mr-6">
                            <a href="./about" className="hover:underline">About Us</a>
                        </li>
                        <li className="me-4 last:mr-0 md:mr-6"><a href="./service" className="hover:underline">Our Service</a>
                        </li>
                        <li className="me-4 last:mr-0 md:mr-6"><a href="./contact" className="hover:underline">Contact Us</a>
                        </li>
                    </div>
                </div>

            </div>

        </footer>
    );
}