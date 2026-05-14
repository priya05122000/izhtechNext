import Link from 'next/link'
import React from 'react'

import type { ComponentProps, ReactNode } from 'react'
import CustomObject from '@/src/shared/components/CustomObjects'
import LinkButton from './LinkButton'

interface SectionHeaderProps {
    title: string
    description?: string | ReactNode
    srOnlyText?: string
    buttonText?: string
    buttonHref?: string
    customObjectVariant?: ComponentProps<typeof CustomObject>['variants']
    customObjectClassName?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    description,
    srOnlyText,
    buttonText = "Contact Us",
    buttonHref = "/contact",
    customObjectVariant = "orange-disk",
    customObjectClassName = "absolute -z-10",
}) => (
    <section className="px-5 sm:px-8 mx-auto md:container">
        <div className="relative py-5  lg:py-10">
            <div className="flex-col justify-center gap-4 my-auto h-4/5 lg:flex lg:flex-row">
                <div className="w-full mx-auto">
                    <div className="flex flex-col justify-end h-full ">
                        <CustomObject className={customObjectClassName} variants={customObjectVariant} />
                        <h1 className="pt-4 text-5xl font-bold lg:w-3/4 2xl:text-7xl lg:text-4xl md:text-4xl sm:text-4xl">
                            {title}
                        </h1>
                        {srOnlyText && (
                            <p className="sr-only">{srOnlyText}</p>
                        )}
                        {description && (
                            <p className="pt-4 pb-4 text-base">{description}</p>
                        )}
                        {buttonText && buttonHref && (
                            <LinkButton
                                href={buttonHref}
                                className="text-white bg-black border h-8 py-1 px-4 w-32 mt-0"
                            >
                                {buttonText}
                            </LinkButton>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </section>

)

export default SectionHeader