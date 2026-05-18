import Counter from '@/src/shared/animation/Counter';
import React from 'react'



interface CountsProps {
    awards?: number;
    designers?: number;
}

const Counts = ({ awards, designers }: CountsProps) => {


    return (
        <section className="mx-auto md:px-0 overflow-hidden px-5 sm:px-0 py-5 sm:py-0">
            <div className="bg-center justify-end bg-cover bg-no-repeat
  h-96 sm:h-120 md:h-144 lg:h-180
  bg-[url('/images/Aboutpage/img/counts/bg.webp')]">

                <div className="container bottom-0 flex flex-col items-end justify-end h-full mx-auto lg:px-8">
                    <div className="flex items-end justify-center md:justify-end">
                        <div className="grid justify-center p-6 text-white bg-red-600 bg-linear-to-r to-pink-500 md:pr-32">
                            <div className="flex items-center justify-between">
                                <img src="images/Aboutpage/img/counts/diamond.webp" alt="Example Image" className="w-12 h-10 lg:w-8 lg:h-6" />
                                <h4 className="text-2xl font-bold lg:text-4xl">
                                    <Counter value={designers || 0} direction="up" />+
                                </h4>
                            </div>
                            <p className="pt-2">
                                designers <br /> and developers
                            </p>
                        </div>
                        <div className="grid justify-center p-6 text-white bg-black md:pr-32">
                            <div className="flex items-center ">
                                <img src="images/Aboutpage/img/counts/square.webp" alt="Example Image" className="w-10 h-10" />
                                <h4 className="text-2xl font-bold lg:text-4xl">
                                    <Counter value={awards || 0} direction="up" />+
                                </h4>
                            </div>
                            <p className="pt-2">
                                digital <br /> innovations
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Counts
