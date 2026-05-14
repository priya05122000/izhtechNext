"use client";

import { fadeIn } from "@/src/shared/animation/variants";
import CustomObject from "@/src/shared/components/CustomObjects";
import DynamicIcon from "@/src/shared/components/Icon";
import { motion } from "framer-motion";

interface ServicesFeaturesModal {
    id: string;
    title: string;
    description: string;
    imagePath?: string;
    icon?: string;
    isFeatured: boolean;
    order: number;
    isActive: boolean;
    serviceId: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

interface ServiceFeatureListProps {
    datas?: ServicesFeaturesModal[];
}

export default function ServiceFeatureList({
    datas = [],
}: ServiceFeatureListProps) {

    const replaceStrings = (str: string) => {
        return str
            .replace(
                /background-color:\s*rgb\(0,\s*0,\s*0\);?/g,
                ""
            )
            .replace(
                /color:\s*rgb\(255,\s*255,\s*255\);?/g,
                ""
            );
    };

    const filteredDatas = [...datas]
        .filter((item) => item.isActive)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return (
        <section className="w-full px-5 mx-auto bg-black">
            <div className="grid items-center justify-center mx-auto text-white">
                <div className="md:container relative overflow-hidden">

                    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 lg:p-13 py-[4rem] p-0 sm:p-8 gap-[3.3rem]">

                        {filteredDatas.map((item) => {

                            const description = replaceStrings(
                                item?.description || ""
                            );

                            return (
                                <motion.li
                                    key={item?.id}
                                    className="list-none"
                                    variants={fadeIn("up", 0.3)}
                                    initial="hidden"
                                    whileInView="show"
                                    exit="hidden"
                                >

                                    <div className="w-[50px] h-[50px] bg-neutral-600 flex justify-center items-center rounded-full">

                                        <DynamicIcon
                                            iconName={item?.icon as string}
                                        />

                                    </div>

                                    <h6 className="text-slate-50 font-bold text-[1.2rem] py-3">
                                        {item?.title}
                                    </h6>

                                    <div
                                        className="!text-white services-description"
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />

                                </motion.li>
                            );
                        })}
                    </ul>

                    <motion.span
                        variants={fadeIn("right", 0.5)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.1 }}
                        className="absolute right-0 bottom-80"
                    >
                        <CustomObject
                            className="absolute hidden lg:block right-0 -xl h-[60vw] lg:h-[40vh] opacity-25"
                            variants="half-dash-yellow"
                        />
                    </motion.span>

                </div>
            </div>
        </section>
    );
}