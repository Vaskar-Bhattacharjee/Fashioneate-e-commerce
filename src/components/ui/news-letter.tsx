"use client";

import { ChevronRight, Send } from "lucide-react";
import { Container } from "./container";

export const Newsletter = () => {
  return (
    <section className="py-24 w-full bg-white">
      <Container className="relative border border-dashed border-neutral-400 w-[90%] md:w-[70%] lg:w-[80%] mx-auto px-16 py-10 text-center">

         <ChevronRight className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rotate-[225deg] text-neutral-700 size-5 z-20 bg-white" />
        <ChevronRight className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 -rotate-45 text-neutral-700 size-5 z-20 bg-white" />
        <ChevronRight className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rotate-45 text-neutral-700 size-5 z-20 bg-white" />
        <ChevronRight className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 rotate-[135deg] text-neutral-700 size-5 z-20 bg-white" /> 

        <span className="text-xs tracking-[0.35em] font-inter font-medium text-neutral-400 uppercase">
          Stay Connected
        </span>
        <h2 className="font-cormorantGaramond text-5xl md:text-6xl text-neutral-900 font-bold tracking-normal mt-5 mb-5">
          The Editorial Edit
        </h2>

        <div className="w-120 h-px bg-neutral-500 mx-auto mb-5" />

        <p className="text-[18px] text-neutral-600 font-medium leading-relaxed font-inter  mx-auto mb-10 w-140">
          Early access to new arrivals, behind-the-scenes craftsmanship,
          and radical transparency — straight to your inbox.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative max-w-sm mx-auto"
        >
          <input
            type="email"
            placeholder="YOUR EMAIL ADDRESS"
            className="w-full bg-transparent border border-dotted border-neutral-400 rounded-xs
             py-4 pl-0 pr-10 text-sm text-left pl-4
            placeholder:text-neutral-500 tracking-wider outline-none focus:border-neutral-900 transition-all duration-500
             font-inter uppercase font-semibold"
          />
          <button
            type="submit"
            className="absolute right-3 bottom-4  text-neutral-700 hover:text-neutral-900 transition-colors"
            aria-label="Subscribe"
          >
            <Send
              style={{ transform: "rotateZ(45deg)" }}
              size={20}
              strokeWidth={1.5}
              className="cursor-pointer"
            />
          </button>
        </form>

        <p className="text-[12px] text-neutral-400  tracking-widest font-inter mt-8">
          By subscribing you agree to our Privacy Policy.
        </p>

      </Container>
    </section>
  );
};