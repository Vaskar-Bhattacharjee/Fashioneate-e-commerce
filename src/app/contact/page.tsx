'use client'
import { Container } from "@/src/components/ui/container";
import { Heading, SubHeading } from "@/src/components/ui/header";

import Image from "next/image";

const Contact = () => {
  return (
    <Container className="pt-10 md:pt-20 lg:pt-32 flex flex-col items-center justify-center">
      <Heading>Let us know how we can help you.</Heading>
      <SubHeading className="w-full md:text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum consequuntur eum quas molestias, nemo officia adipisci, repellendus omnis perspiciatis atque dolor, ab corrupti! Earum officiis natus qui. Porro!
      </SubHeading>

      {/* Main Card Container */}
      <div className="mt-16 w-full max-w-5xl min-h-150 bg-white border border-neutral-100 shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Form */}
        <div className="flex-1 flex flex-col justify-center items-start gap-8 p-8 md:p-16">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-4xl text-neutral-900 font-bold tracking-tight">
              Get in Touch
            </h1>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
              Have a question about our collections? Reach out and our style consultants will get back to you within 24 hours.
            </p>
          </div>

          <div className="w-full flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full h-12 px-4 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-black placeholder:text-neutral-400" 
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full h-12 px-4 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-black placeholder:text-neutral-400" 
            />
            <textarea 
              placeholder="Your Message" 
              className="w-full h-40 p-4 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-black placeholder:text-neutral-400 resize-none"
            ></textarea>  
            
            <button className="w-full h-12 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transform active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-neutral-200">
              Send Message
            </button>                  
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex-1 relative min-h-100 md:min-h-full">
          <Image 
            src="https://images.pexels.com/photos/7709296/pexels-photo-7709296.jpeg"
            alt="Contact Us Fashion"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </Container>
  );
}
export default Contact



// export const EmeraldShimmer = () => {
//   return (
//             <motion.h1
//                 className="relative inline-block bg-clip-text text-transparent ml-2 text-xl font-semibold md:text-5xl"
//                 style={{
//                     '--spread': '40px',
//                     backgroundImage: `linear-gradient(90deg, transparent calc(50% - var(--spread)), #10b981, transparent calc(50% + var(--spread))), linear-gradient(black, black)`,
//                     backgroundSize: '250% 100%, 100% 100%',
//                     backgroundRepeat: 'no-repeat',
//                     WebkitBackgroundClip: 'text',
//                 } as React.CSSProperties}
//                 // 2. This is the only "new" part: it slides the 250% wide background
//                 animate={{ backgroundPosition: ['200% center', '-200% center'] }}
//                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//                 >
//                 Let us know <br /> how we can help you
//             </motion.h1>
//   );
// };