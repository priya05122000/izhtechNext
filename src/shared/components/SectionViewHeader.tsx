import React from "react";
import CustomObject from "@/src/shared/components/CustomObjects";
import { div } from "framer-motion/client";

interface SectionViewHeaderProps {
    header?: string
    title?: string;
}

const SectionViewHeader: React.FC<SectionViewHeaderProps> = ({ title, header }) => (

    <div className="relative pt-5  lg:pt-10">
        <div className="flex-col justify-center gap-4 my-auto h-4/5 lg:flex lg:flex-row">
            <div className="w-full mx-auto relative  ">
                <div className="flex flex-col justify-end h-full">
                    <CustomObject
                        className="absolute top-0 -z-10"
                        variants="green-disk"
                    />
                    <p className="pt-4 text-base">
                        {header}
                    </p>
                    <h1 className="pt-4 pb-4 text-5xl font-bold 2xl:text-7xl lg:text-4xl md:text-4xl sm:text-4xl">
                        {title}
                    </h1>
                    <p className="sr-only">
                        IZH Tech project showcasing web development,
                        mobile application development, branding and digital solutions.
                    </p>
                </div>
            </div>
        </div>

    </div>

);

export default SectionViewHeader;