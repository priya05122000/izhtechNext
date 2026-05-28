import { motion } from "framer-motion";
import { fadeIn } from "@/src/shared/animation/variants";

import {
    Network,
    Target,
    BarChartHorizontalBig,
    LucideIcon,
} from "lucide-react";

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

interface MissionStatementProps {
    siteInfo: SiteInformation[];
}

interface CardItem {
    title: string;
    description?: string;
    icon: LucideIcon;
    bgColor: string;
    iconColor: string;
}

const MissionStatement = ({
    siteInfo,
}: MissionStatementProps) => {

    const info = siteInfo?.[0];

    const cards: CardItem[] = [
        {
            title: "Vision",
            description: info?.vision,
            icon: Network,
            bgColor: "bg-blue-100",
            iconColor: "text-blue-400",
        },
        {
            title: "Mission",
            description: info?.mission,
            icon: Target,
            bgColor: "bg-green-100",
            iconColor: "text-green-400",
        },
        {
            title: "Values",
            description: info?.values,
            icon: BarChartHorizontalBig,
            bgColor: "bg-orange-100",
            iconColor: "text-orange-400",
        },
    ];

    if (!siteInfo?.length) return null;

    return (
        <div className="
            flex
            flex-col
            w-full
            gap-6
            px-5
            pt-8
                items-stretch

            md:flex-row
            md:items-stretch
            lg:justify-center
        ">
            {cards.map((card, index) => {

                const Icon = card.icon;

                return (
                    <motion.div
                        key={card.title}
                        variants={fadeIn(
                            "up",
                            index * 0.08
                        )}
                        initial="hidden"
                        whileInView="show"
                        viewport={{
                            once: true,
                            amount: 0.15,
                        }}
                        className="
                             flex h-full justify-around items-stretch py-2 border-t border-slate-600 md:flex-1 flex-col  flex-1  sm:min-h-65 lg:min-h-55"
                    >
                        <div className="
                            flex
                            flex-col
                            justify-center

                        ">
                            <span
                                className={`
                                    flex
                                    justify-center
                                    items-center
                                    w-14
                                    h-14
                                    sm:w-16
                                    sm:h-16
                                    md:w-12
                                    md:h-12
                                    mt-5
                                    rounded-full
                                    ${card.bgColor}
                                `}
                            >
                                <Icon
                                    className={`
                                        w-1/2
                                        h-1/2
                                        ${card.iconColor}
                                    `}
                                />
                            </span>
                        </div>

                        <div className="flex flex-col flex-1 h-full order-1 md:order-2">
                            <div>
                                <p className="pt-2 text-xl font-bold">
                                    {card.title}
                                </p>

                                <p className=" pt-2 pb-3 text-base leading-relaxed">
                                    {card.description}
                                </p>
                            </div>

                            <div className="mt-auto">
                                <LinkButton href="/about">
                                    Explore More
                                </LinkButton>
                            </div>
                        </div>

                    </motion.div>
                );
            })}
        </div>
    );
};

export default MissionStatement;