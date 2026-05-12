import ParallaxText from '@/src/shared/animation/paralax'
import React from 'react'

const IzhtechScroll = () => {
    return (
        <section className="flex items-center justify-center  bg-white">
            <section className="py-16">
                <ParallaxText baseVelocity={-1} className="font-bold text-8xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">Izhtech</ParallaxText>
                <ParallaxText baseVelocity={1} className="text-xl font-bold text-center bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">Innovation Ahead</ParallaxText>
            </section>
        </section>
    )
}

export default IzhtechScroll
