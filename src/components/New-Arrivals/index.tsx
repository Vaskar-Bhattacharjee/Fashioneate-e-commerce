'use client'
import Link from "next/link"
import { Container } from "../ui/container"
import { Heading, SubHeading } from "../ui/header"
import { NewArrivalsItemCard as NewArrivalsItem, NewArrivalsItemCard } from "./new-arrivals"
import { motion } from "framer-motion"
import { IconArrowRight } from "@tabler/icons-react"



export const NewArrivals = () => {
    return (
         <section className="h-auto">
           <Container>
                    <div className="w-full min-h-96 pt-32 flex flex-col items-center justify-center">
                       <div className="flex flex-col items-center justify-center">
                       <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.5 }}
                       className="flex items-center justify-center gap-2">
                        <span className="w-8 bg-neutral-400 h-0.5"></span>
                        <Heading className="font-extrabold">New Arrivals</Heading>
                        <span className="w-8 bg-neutral-400 h-0.5"></span></motion.div>
                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-4 max-w-2xl"
                        ><SubHeading >Explore our latest collection of fashion-forward pieces that have just arrived. From trendy apparel to stylish accessories, discover the perfect additions to elevate your wardrobe.</SubHeading></motion.div>
                        
                      </div> 

                      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                       <NewArrivalsItemCard imgSrc="https://images.pexels.com/photos/30589837/pexels-photo-30589837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" productName="Men's Sweater" price={99.99} />
                       <NewArrivalsItemCard imgSrc="https://images.pexels.com/photos/10846833/pexels-photo-10846833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" productName="Women's Dress" price={89.99} />
                       <NewArrivalsItemCard imgSrc="https://images.pexels.com/photos/20365268/pexels-photo-20365268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" productName="Kid's Sweater" price={79.99} />
                        </div>
                        <div className="mt-12 flex items-center justify-center">
                            <Link href="/new-arrivals"><div className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md hover:bg-neutral-700">See More <span><IconArrowRight className="size-4" /> </span></div></Link>
                        </div>
                    </div>
                </Container>

          </section>
    )
}