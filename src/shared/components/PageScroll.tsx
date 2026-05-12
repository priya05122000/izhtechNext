import { motion, useScroll } from "framer-motion";

export default function PageScroll() {
  const { scrollYProgress } = useScroll();

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="fixed z-50  top-[40%] flex-col cursor-pointer -m-3 h-2/6 justify-end hidden md:block ">
        <p
          className="text-gray-600 -rotate-90 "
          onClick={handleScrollToTop}
        >
          Back to top
        </p>
        <motion.div
          className="w-1 bg-gray-600 h-25  ml-10 mt-9  rounded-2xl"
          style={{ scaleY: scrollYProgress, transformOrigin: "top" }} />

      </div>

    </>
  );
}
