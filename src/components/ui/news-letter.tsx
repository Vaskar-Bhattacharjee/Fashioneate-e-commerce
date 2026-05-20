"use client";

import { ChevronRight, Send } from "lucide-react";
import { Container } from "./container";
import { Heading, SubHeading } from "./header";
import { TypewriterEffectSmooth } from "./typewriter-effect";

export const Newsletter = () => {
    const words = [
    {
      text: "The",
    },
    {
      text: "Editorial",
    },
    {
      text: "Edit",
    },
  
  ];
  
  return (
    <section className="pt-20 lg:pt-30 lg:w-6xl bg-white">
      <Container
        className="relative border border-neutral-200 w-full lg:h-120 mx-auto p-5 text-center
      [--pattern-fg:var(--color-neutral-500)]/10"
      >
        <ChevronRight className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rotate-[225deg] text-neutral-700 size-5 z-20 bg-white" />
        <ChevronRight className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 -rotate-45 text-neutral-700 size-5 z-20 bg-white" />
        <ChevronRight className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rotate-45 text-neutral-700 size-5 z-20 bg-white" />
        <ChevronRight className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 rotate-[135deg] text-neutral-700 size-5 z-20 bg-white" />
        <div className="absolute top-0 left-0 w-full h-full  bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[12px_12px] bg-fixed"></div>
        <div className="w-full h-full border border-neutral-300 flex items-center justify-center flex-col relative bg-neutral-100 p-6 md:p-10 lg:p-0">
          <span className="text-[12px] text-neutral-400 tracking-widest font-inter mt-8 mb-4 lg:mb-0">
            Stay Connected
          </span>
          <TypewriterEffectSmooth words={words} />

          <div className="w-4/5 md:w-120 h-px bg-neutral-500 mx-auto mb-5" />

          <SubHeading className="text-center">
            Early access to new arrivals, behind-the-scenes craftsmanship,
            <br className="hidden md:block" /> and radical transparency —
            straight to your inbox.
          </SubHeading>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative w-full max-w-sm mx-auto flex justify-between px-4 md:px-0"
          >
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="w-full lg:w-full bg-transparent border border-dotted border-neutral-400 rounded-xs
             py-4 pl-4 pr-7 text-sm text-left
            placeholder:text-neutral-500 tracking-wider outline-none focus:border-neutral-900 transition-all duration-500
             font-inter uppercase font-semibold"
            />
            <button
              type="submit"
              className="absolute right-6 md:right-5 lg:right-3 bottom-4  text-neutral-700 hover:text-neutral-900 transition-colors"
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
        </div>
      </Container>
    </section>
  );
};
