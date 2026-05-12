import React from 'react'
import { motion } from "framer-motion";
import { fadeIn } from '@/src/shared/animation/variants';
import { Network, Target, BarChartHorizontalBig } from "lucide-react";
import Link from 'next/link';

interface SiteInformation {
    id: string,
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

interface MissionStatementProps {
    siteInfo: SiteInformation[];
}

const MissionStatement = ({ siteInfo }: MissionStatementProps) => {
    return (
        <div>
            {siteInfo?.length > 0 && (
                <div className="flex flex-col w-full gap-6 px-5 pt-8 md:flex-row lg:flex-row lg:flex-wrap lg:justify-center">
                    <motion.div
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        exit={"hidden"}
                        viewport={{ once: false, amount: 0.1 }}
                        className="flex justify-around py-2 border-t md:flex-1 lg:w-1/4 border-slate-600 md:flex-col"
                    >
                        <div className="flex flex-col justify-center order-2 md:order-1">

                            <span
                                className="flex justify-center w-20 h-20 mt-5 bg-blue-100 rounded-full justify-item-center md:w-12 md:h-12">
                                <Network className="w-1/2 mx-auto my-auto text-blue-400 h-1/2" />
                            </span>
                        </div>
                        <div className="w-1/2 md:w-full md:order-2">
                            <h2 className="pt-2 text-lg font-bold">Vision</h2>
                            <p className="pt-2 pb-3 text-base">
                                {siteInfo[0]?.vision}
                            </p>
                            {/* <LinkButton
                                href={"/about"}
                                size={"xs"}
                                className="w-32 px-2 text-white bg-black "
                            >
                                Explore More
                            </LinkButton> */}
                            <Link href="/about" className="transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background flex items-center justify-center mt-4 text-sm font-bold border-1 h-7 rounded-md w-32 px-2 text-white bg-black relative group">
                                <span className="transition-transform duration-300 group-hover:-translate-x-3">Explore More</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right absolute w-4 h-4 transition-opacity duration-300 opacity-0 right-3 group-hover:opacity-100" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        exit={"hidden"}
                        viewport={{ once: false, amount: 0.1 }}
                        className="flex justify-around py-2 border-t md:flex-1 lg:w-1/4 border-slate-600 md:flex-col"
                    >
                        <div className="flex flex-col justify-center order-2 md:order-1">
                            <span
                                className="flex justify-center w-20 h-20 mt-5 bg-green-100 rounded-full justify-item-center md:w-12 md:h-12">

                                <Target className="w-1/2 mx-auto my-auto text-green-400 h-1/2" /> </span>
                        </div>
                        <div className="order-1 w-1/2 md:w-full md:order-2">
                            <h2 className="pt-2 text-lg font-bold">Mission</h2>
                            <p className="pt-2 pb-3 text-base">
                                {siteInfo[0]?.mission}
                            </p>
                            {/* <LinkButton
                                href={"/about"}
                                size={"xs"}
                                className="w-32 px-2 text-white bg-black "
                            >
                                Explore More
                            </LinkButton> */}


                            <Link href="/about" className="transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background flex items-center justify-center mt-4 text-sm font-bold border-1 h-7 rounded-md w-32 px-2 text-white bg-black relative group">
                                <span className="transition-transform duration-300 group-hover:-translate-x-3">Explore More</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right absolute w-4 h-4 transition-opacity duration-300 opacity-0 right-3 group-hover:opacity-100" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        exit={"hidden"}
                        viewport={{ once: false, amount: 0.1 }}
                        className="flex justify-around py-2 border-t md:flex-1 lg:w-1/4 border-slate-600 md:flex-col"
                    >
                        <div className="flex flex-col justify-center order-2 md:order-1">
                            <span
                                className="flex justify-center w-20 h-20 mt-5 bg-orange-100 rounded-full justify-item-center md:w-12 md:h-12">

                                <BarChartHorizontalBig className="w-1/2 mx-auto my-auto text-orange-400 h-1/2" /> </span>
                        </div>
                        <div className="order-1 w-1/2 md:w-full md:order-2">
                            <h2 className="pt-2 text-lg font-bold">Values</h2>
                            <p className="pt-2 pb-3 text-base">
                                {siteInfo[0]?.values}
                            </p>
                            {/* <LinkButton
                                href={"/about"}
                                size={"xs"}
                                className="w-32 px-2 text-white bg-black "
                            >
                                Explore More
                            </LinkButton> */}
                            <Link href="/about" className="transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background flex items-center justify-center mt-4 text-sm font-bold border-1 h-7 rounded-md w-32 px-2 text-white bg-black relative group">
                                <span className="transition-transform duration-300 group-hover:-translate-x-3">Explore More</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right absolute w-4 h-4 transition-opacity duration-300 opacity-0 right-3 group-hover:opacity-100" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            )}


        </div>
    )
}

export default MissionStatement
