
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

const PlatformInsights = ({ siteInfo }: MissionStatementProps) => {
    return (
        <section className="relative  mx-auto bg-gray-50 container-fluid z-0 px-8">
            <div className="mx-auto container-fluid xl:container z-0">
                <div className="lg:px-10 pb-16 pt-16 bg-[#F5F1F5] rounded relative">
                    <div className="flex-col justify-center gap-4 px-5 my-auto h-4/5 lg:flex lg:flex-row">
                        <div className="flex flex-col self-center h-full sm:px-2 mx-auto lg:w-3/6 sm:w-full">
                            <img className="justify-center h-auto mx-auto " src="/images/platforminsights/img.webp" alt="pic" />
                        </div>
                        <div className="lg:w-3/6 sm:w-[75%] sm:px-2 lg:px-2 mx-auto">
                            <div className="flex flex-col justify-center h-full pb-1">
                                <div>
                                    <p className="pt-10 text-base">COMPREHENSIVE DIGITAL SOLUTION</p>
                                    <h3 className="pt-4 text-4xl font-bold lg:text-6xl md:text-3xl sm:text-3xl">
                                        A One Stop Destination
                                    </h3>
                                    <p className="pt-4 text-base md:text-xl">
                                        Our expert branding and digital marketing services help your brand shine and stand out in the digital world.
                                    </p>
                                </div>
                                {siteInfo?.length > 0 && (
                                    <div className="flex flex-row w-full gap-6 pt-8 lg:justify-start">
                                        <div className="flex flex-col w-2/5 pt-2 border-t border-slate-600">
                                            <h2 className="pt-2 text-3xl font-bold">
                                                {siteInfo[0].teamCount}{" "}
                                                <span className="text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
                                                    +
                                                </span>
                                            </h2>
                                            <p className="pt-2 pb-3 text-xs">
                                                Designers <br /> and Developers
                                            </p>
                                        </div>
                                        <div className="flex flex-col w-2/5 pt-2 border-t border-slate-600">
                                            <h2 className="pt-2 text-3xl font-bold">
                                                {siteInfo[0].projectHandled}{" "}
                                                <span className="text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
                                                    +
                                                </span>
                                            </h2>
                                            <p className="pt-2 pb-3 text-xs">
                                                Projects <br /> Handled
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default PlatformInsights
