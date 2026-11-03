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

interface ContactDetailsProps {
    siteInfo: SiteInformation[];
}

const formatPhone = (raw?: string) => {
    if (!raw) return "";
    const digits = raw.replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) {
        return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
    }
    return `+${digits}`;
};


const ContactDetails = ({ siteInfo }: ContactDetailsProps) => {

    const info = siteInfo?.[0];

    const address =
        info?.address ||
        "Nixon Pinnacle III Floor, Cruz Enclave, North Sargunaveethi, Nagercoil 629001.";

    const primaryPhone = info?.mobilePrimary || "918355990274";
    const salesPhone = info?.mobileSales || "918355990274";
    const secondaryPhone = info?.mobileSecondary || "919969495943";

    const primaryEmail = info?.emailPrimary || "celibadhanasekharan@izhtech.com";
    const salesEmail = info?.emailSales || "adlin@izhtech.com";
    const hrEmail = info?.emailHR || "admin@izhtech.com";

    return (
        <section className="sr-only" aria-label="Contact information for Izh Tech">

            <h2>Contact Izh Tech</h2>

            <p>
                Izh Tech is a digital solutions company helping businesses grow through
                software development, web development, mobile app development, UI/UX design,
                branding, digital marketing, SEO, e-commerce and custom software. Whether you
                are launching a startup, modernising an established business or scaling a new
                venture, our team provides practical, measurable support from first
                consultation through delivery and ongoing improvement.
            </p>

            <h3>Office and location</h3>
            <address>
                <strong>Head Office &ndash; Nagercoil, Tamil Nadu, India</strong>
                <br />
                {address}
                <br />
                We also maintain a presence in Sharjah, Muweilah &ndash; 96648, United Arab
                Emirates.
            </address>

            <h3>Phone</h3>
            <ul>
                <li>
                    General enquiries:{" "}
                    <a href={`tel:+${primaryPhone.replace(/\D/g, "")}`}>
                        {formatPhone(primaryPhone)}
                    </a>
                </li>
                <li>
                    Sales and new projects:{" "}
                    <a href={`tel:+${salesPhone.replace(/\D/g, "")}`}>
                        {formatPhone(salesPhone)}
                    </a>
                </li>
                <li>
                    Alternate line:{" "}
                    <a href={`tel:+${secondaryPhone.replace(/\D/g, "")}`}>
                        {formatPhone(secondaryPhone)}
                    </a>
                </li>
            </ul>

            <h3>Email</h3>
            <ul>
                <li>
                    General and support:{" "}
                    <a href={`mailto:${primaryEmail}`}>{primaryEmail}</a>
                </li>
                <li>
                    Sales and quotes: <a href={`mailto:${salesEmail}`}>{salesEmail}</a>
                </li>
                <li>
                    Careers and HR: <a href={`mailto:${hrEmail}`}>{hrEmail}</a>
                </li>
            </ul>

            <h3>Business hours</h3>
            <p>
                Monday to Friday, 9:30 AM to 6:30 PM India Standard Time (IST). We are closed
                on Saturdays, Sundays and Indian public holidays. Messages sent outside these
                hours are answered on the next working day.
            </p>

            <h3>What you can contact us about</h3>
            <ul>
                <li>Free consultation and project quotes</li>
                <li>Web development and web application projects</li>
                <li>Mobile app development for Android and iOS</li>
                <li>UI/UX design and product design</li>
                <li>Branding, logo and identity design</li>
                <li>Digital marketing, SEO and paid advertising</li>
                <li>E-commerce stores and integrations</li>
                <li>Custom software and workflow automation</li>
                <li>Ongoing support, maintenance and retainer engagements</li>
            </ul>

            <h3>Directions to the Nagercoil office</h3>
            <p>
                Our head office is on North Sargunaveethi in central Nagercoil, near the Cruz
                Enclave area, a short drive from the Nagercoil Junction railway station and the
                town bus stand. Use the map on this page to open the exact location in Google
                Maps for turn-by-turn directions. On-street parking is available nearby.
            </p>

            <h3>Contact FAQs</h3>
            <dl>
                <dt>How do I get a price for my project?</dt>
                <dd>
                    Send us a short brief using the enquiry form on this page or email
                    {" "}
                    <a href={`mailto:${salesEmail}`}>{salesEmail}</a>. We reply with initial
                    questions and an estimate, usually within one working day.
                </dd>

                <dt>How quickly will I get a response?</dt>
                <dd>
                    Enquiries received during business hours are typically answered the same
                    day, and always within one working day.
                </dd>

                <dt>Do you work with clients outside India?</dt>
                <dd>
                    Yes. We work with clients across India, the United Arab Emirates and
                    internationally, collaborating remotely with regular calls and progress
                    updates.
                </dd>

                <dt>Can we meet in person?</dt>
                <dd>
                    Yes. You are welcome to schedule a visit to our Nagercoil office during
                    business hours &ndash; contact us first so the right team members are
                    available.
                </dd>

                <dt>Which services does Izh Tech offer?</dt>
                <dd>
                    Software development, web and mobile app development, UI/UX design,
                    branding, digital marketing, SEO, e-commerce and custom software.
                </dd>
            </dl>
        </section>
    );
};

export default ContactDetails;
