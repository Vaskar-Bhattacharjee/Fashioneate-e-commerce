import { motion } from "framer-motion"

export const SectionHeader = ({Subheading, }:{Subheading:string}) => {
    return (
            <div className=" flex flex-col items-center text-center">
                    <motion.span
                    initial={{ opacity: 0, y: 60, backdropFilter: "blur(15px)" }}
                    whileInView={{ opacity: 1, y: 0, backdropFilter: "blur(15px)" }}
                    transition={{ duration: 0.7 }}
                    className="text-sm md:text-md font-bold uppercase tracking-[0.2em] text-neutral-500 mb-0 md:mb-3">
                        {Subheading}
                    </motion.span>

                </div>
    )
}