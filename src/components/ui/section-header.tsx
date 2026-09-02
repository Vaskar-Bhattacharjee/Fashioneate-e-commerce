import { motion } from "framer-motion"

export const SectionHeader = ({Subheading, }:{Subheading:string}) => {
    return (
            <div className=" flex flex-col items-center text-center">
                    <motion.span
                    initial={{ opacity: 0, y: 60, backdropFilter: "blur(15px)" }}
                    animate={{ opacity: 1, y: 0, backdropFilter: "blur(15px)" }}
                    transition={{ duration: 0.7 }}
                    className="text-xs md:text-md font-bold uppercase tracking-[0.2em] text-neutral-500 mb-0 md:mb-3">
                        {Subheading}
                    </motion.span>

                </div>
    )
}

export const SectionHeading = ({heading, }:{heading:string}) => {
    return (
            <div className=" flex flex-col items-center text-center">
                    <motion.span
                    initial={{ opacity: 0, y: 60, backdropFilter: "blur(15px)" }}
                    animate={{ opacity: 1, y: 0, backdropFilter: "blur(15px)" }}
                    transition={{ duration: 0.7 }}
                    className="text-2xl md:text-5xl font-semibold uppercase tracking-tight  md:tracking-[0.01em] text-gray-700 mb-9 mt-2 md:mt-0 md:mb-3 font-cormorantGaramond">
                        {heading}
                    </motion.span>

                </div>
    )
}