/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ArrowUpRightSquare } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AccordionItem = ({ header, content, i, expanded, setExpanded }: any) => {
  const isOpen = i === expanded;

  return (
    <>
      <motion.button
        className="flex items-center justify-between w-full px-0 lg:px-5  py-2 xl:py-5 font-medium text-left text-black first:rounded-t-lg last:rounded-b-lg dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-900 dark:focus:ring-gray-800"
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
      >

        <div className="flex items-center gap-2">
          <ArrowUpRightSquare className="text-gray-600 " />
          <h5 className=" text-black-800 uppercase"> {header}</h5>
        </div>
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <Minus /> : <Plus />}
        </motion.span>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {/* <p className="p-5 text-sm text-black">{content}</p> */}
            <div className="p-5 text-sm text-black" dangerouslySetInnerHTML={{ __html: content }} />
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Accordion({ items }: { items: any[] }) {
  const [expanded, setExpanded] = useState<false | number>(0);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item: any, index: number) => {
        // console.log(items)
        return (
          <AccordionItem
            key={index}
            i={index}
            expanded={expanded}
            setExpanded={setExpanded}
            header={item.title}
            content={item.description}
          />
        );
      })}
    </div>
  );
}
