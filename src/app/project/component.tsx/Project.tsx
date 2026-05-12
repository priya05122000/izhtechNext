import CustomObject from '@/src/shared/components/CustomObjects'
import Link from 'next/link'
import React from 'react'


const Project = () => {
    return (
        <section className="px-8 mx-auto md:container">
            {/* <Careerpg /> */}
            <section className="relative py-5 bg-transparent lg:py-10 ">
                <div className="flex-col justify-center gap-4 my-auto h-4/5 lg:flex lg:flex-row">
                    <div className="w-full mx-auto ">
                        <div className="flex flex-col justify-end h-full ">
                            <CustomObject className="absolute -z-10" variants="green-disk" />
                            <h1 className="pt-4 text-5xl font-bold lg:w-3/4 2xl:text-7xl lg:text-4xl md:text-4xl sm:text-4xl">
                                Our Projects
                            </h1>
                            <p className="pt-4 pb-4 text-base">
                                Leave us a little info, and we’ll be in touch.
                            </p>
                            <Link href="/contact" className="transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background flex items-center justify-center text-sm font-bold text-white rounded border-1 h-8 py-1 px-4 w-32 bg-black mt-0 relative group"><span className="transition-transform duration-300 group-hover:-translate-x-3">Contact Us</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right absolute w-4 h-4 transition-opacity duration-300 opacity-0 right-3 group-hover:opacity-100" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></Link>

                        </div>
                    </div>
                </div>

            </section>
        </section>
    )
}

export default Project
