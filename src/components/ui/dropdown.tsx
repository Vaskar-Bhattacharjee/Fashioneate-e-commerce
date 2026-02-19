import { cn } from "@/src/lib/utils"
import {  IconCaretDownFilled, IconFilter } from "@tabler/icons-react"
import { useState } from "react"
import {motion} from 'framer-motion'


interface DropdownItem {
  label: string;
  icon?: React.ReactNode; // Optional so your second dropdown still works
}
export const Dropdown = ({
    sortname,
    items,
    onSelect,

}:{
    sortname: string,
    items: DropdownItem[],
    onSelect: (val: string) => void,

}) => {
      const [open, setOpen] = useState<boolean>(false)
      const [display, setDisplay] = useState<string>("")

    return(
            <div className={cn("relative z-20",
                open && "z-50"
            )}>  
            <div
            onClick={()=> {
              setOpen(!open)
              
            }}
            
            className="flex items-center justify-center gap-2 cursor-pointer border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 rounded-lg px-6 ">
              <IconFilter className="text-neutral-800 size-4" />
              <p className="text-neutral-600 text-[16px] font-bold">
                {display ? display : `${sortname}`} 
              </p>
              <span>
                <IconCaretDownFilled className={cn("text-neutral-900 size-4",
                    open === true? "rotate-180 transition-all duration-200" : 'rotate-0 transition-all duration-200'
                )} />
              </span>
            </div>

            {open && 
            <motion.div
            initial={{y:30, opacity: 0 }}   
            animate={{y:0, opacity: 1}}
            transition={{duration: 0.2}}
            className="flex flex-col items-start px-4 gap-4 justify-center w-35 md:w-48 bg-white border border-neutral-300 rounded-lg py-3 absolute top-9 md:top-10">
             
             {
                items.map((item, index)=>{
                  return(
                    <motion.div
                    key={item.label}
                    initial={{y:30, opacity: 0 }}   
                    animate={{y:0, opacity: 1}}
                    transition={{ 
                    delay: index * 0.05, // 0.05 is the sweet spot for "snappy" fashion sites
                    duration: 0.3,
                    ease: "easeOut"
                    }}
                    onClick={()=>{
                      setDisplay(item.label)
                      setOpen(false)
                      onSelect(item.label)
                    }}
                    className="text-neutral-500 font-semibold text-[14px] cursor-pointer hover:text-neutral-800 flex items-center gap-2  w-full">
                      {item.icon}{item.label}
                    </motion.div>
                  )
                })
             }
            </motion.div>            
            }

          </div>
    )
}