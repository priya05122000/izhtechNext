import { Variants } from "framer-motion";

export const fadeIn = (
    direction: string,
    delay: number
): Variants => {
    return {
        hidden: {
            y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
            x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
            opacity: 0,
            // transition: {
            //     type: "tween",
            //     duration: 1.2,
            //     delay,
            //     ease: [0.25, 0.25, 0.25, 0.75],
            // },
        },

        show: {
            y: 0,
            x: 0,
            opacity: 1,
            // transition: {
            //     type: "tween",
            //     duration: 1.2,
            //     delay,
            //     ease: [0.25, 0.25, 0.25, 0.75],
            // },
            transition: {
                duration: 0.5,
                delay,
            },
        },
    };
};