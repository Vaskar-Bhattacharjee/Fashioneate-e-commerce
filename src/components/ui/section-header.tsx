import { motion } from "framer-motion"

export const SectionHeader = ({Subheading, }:{Subheading:string}) => {
    return (
            <div className=" flex flex-col items-center text-center">
                    <motion.span
                    initial={{ opacity: 0, y: 60, backdropFilter: "blur(15px)" }}
                    whileInView={{ opacity: 1, y: 0, backdropFilter: "blur(15px)" }}
                    transition={{ duration: 0.7 }}
                    className="text-md font-bold uppercase tracking-[0.3em] text-neutral-400 mb-3">
                        {Subheading}
                    </motion.span>

                </div>
    )
}