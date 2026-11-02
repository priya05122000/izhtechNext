import InquiryForm from './InquiryForm'

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

interface InquiryProps {
    siteInfo: SiteInformation[];
    services: string[];
}

const Inquiry = ({ siteInfo, services }: InquiryProps) => {

    return (
        <>

            <section className="md:container relative px-5 pt-1 pb-6 mx-auto ">

                <div
                    aria-hidden="true"
                    className="absolute w-[45%] lg:w-[17%] h-full right-4 -z-10 hidden md:block bg-contain bg-no-repeat pointer-events-none"
                    style={{
                        backgroundImage: "url('/images/objects/line-up-teal.webp')",
                    }}
                />

                <div className="py-8">
                    <section>
                        <div className="flex flex-col lg:flex-row md:flex-row lg:lg:px-8 gap-6">
                            <div
                                className="lg:w-4/12 md:w-6/12"
                            >
                                <h2 className="mb-3 text-xl font-black">Our Offices</h2>
                                <p>Schedule your visit with us</p>
                            </div>
                            <div
                            >
                                <h3 className="mb-3 text-xl font-black">Head Office</h3>
                                {siteInfo[0]?.address}
                                <p className="mb-5 font-black">Call us: {siteInfo[0]?.mobilePrimary}</p>
                                <p>Monday-Friday</p>
                            </div>
                        </div>
                    </section>

                    <InquiryForm services={services} />
                </div>
            </section>
        </>
    )
}

export default Inquiry
