"use client";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Container } from "../ui/container";
import { SectionHeader } from "../ui/section-header";
export const FAQ_ITEMS = [
  {
    question: "How long does shipping typically take?",
    answer:
      "Our standard shipping takes 3-5 business days within the country. International orders may take 7-14 business days depending on customs processing in your region. You will receive a tracking link via email as soon as your package leaves our warehouse.",
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "We offer a 30-day return policy for all unworn items with original tags. Exchanges are free of charge, while returns for a refund incur a small processing fee. Please note that sale items are eligible for exchange or store credit only.",
  },
  {
    question: "How do I find the right size for me?",
    answer:
      "Each product page features a detailed size guide. We recommend measuring a similar garment you already own and comparing it to our size chart for the most accurate fit. If you are between sizes, we generally suggest sizing up for a more comfortable, relaxed fit.",
  },
  {
    question: "Are your materials sustainably sourced?",
    answer:
      "Yes, we prioritize ethical sourcing. 80% of our current collection is made from organic cotton or recycled materials, and we are working toward 100% by 2027.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Absolutely. We ship to over 50 countries worldwide. Shipping costs and delivery times vary by location and will be calculated automatically at checkout.",
  },
];
export const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Container className="md:16 lg:pt-32">
      <SectionHeader
        Subheading="Need Help?"
        Heading="Frequently Asked Questions"
      />
      <div className="w-full px-8 lg:px-0 lg:max-w-4xl lg:pt-10 mx-auto space-y-6">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = activeIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-b border-neutral-300 pb-6"
            >
              <div
                onClick={() => toggleItem(index)}
                className="flex items-center justify-between cursor-pointer lg:w-200 group"
              >
                <h3 className="text-lg md:text-[26px] font-semibold text-neutral-800 md:mb-2 group-hover:text-neutral-600 transition-colors">
                  {item.question}
                </h3>

                <div className="relative size-6 flex items-center justify-center">
                  <motion.div
                    animate={{
                      rotate: isOpen ? 90 : 0,
                      opacity: isOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    <IconPlus className="size-6 text-black" />
                  </motion.div>

                  <motion.div
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{
                      rotate: isOpen ? 0 : -90,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    <IconMinus className="size-6 text-black" />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-neutral-600 w-120 lg:w-190 pt-4 text-lg font-semibold">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Container>
  );
};
