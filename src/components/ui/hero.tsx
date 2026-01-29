'use client'
import { IconArrowRight } from "@tabler/icons-react";
import { Container } from "./container";
import { Heading, SubHeading } from "./header";
import { ShootingStars } from "./shooting-stars";
import { motion } from "framer-motion";


export const Hero = () => {
    return (
        <Container>
            <div
           style={{ 
                    backgroundImage: `url('https://images.pexels.com/photos/9849633/pexels-photo-9849633.jpeg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
            
                }}
                
            className="w-full h-[98vh] grid grid-cols-3 grid-gap-1 px-18 items-center   ">
                <div className="absolute inset-0 bg-black/70" />
                <ShootingStars />
                <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=" flex flex-col col-span-2 items-start justify-center ml-23 z-10">
                    <Heading className="text-neutral-200 text-7xl tracking-wide"> Welcome to Fashioneate</Heading>
                    <SubHeading className="text-neutral-200"> Discover the latest fashion trends. Shop now and elevate your style. Discover the latest fashion trends. Shop now and elevate your style. </SubHeading>

                    <div className="relative w-85 p-px group  z-10 overflow-hidden h-10 rounded-full cursor-pointer lg:mt-5">
                        <div className="text-white bg-neutral-800/97 z-20 flex items-center justify-center gap-3 h-full rounded-full tracking-wide uppercase font-mono"> Find Your Best OutFit From Us <span><IconArrowRight className="size-3 group-hover:size-4 transition-all" /> </span> </div>
                        <div className="absolute inset-0 -z-10 scale-[12] bg-[conic-gradient(at_center,transparent,var(--color-yellow-300),10%,transparent_5%)] animate-[spin_8s_linear_infinite] "></div>
                        
                    </div>
                </motion.div>
                <div>

                </div>
            </div>
        </Container>
    );
}