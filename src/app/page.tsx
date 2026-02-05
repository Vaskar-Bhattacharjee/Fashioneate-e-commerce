import { FAQs } from "../components/FAQs";
import { FeaturesFirst } from "../components/Features-first";
import { NewArrivals } from "../components/New-Arrivals";
import { Hero } from "../components/ui/hero";
import { WhyUs } from "../components/whyUs";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 min-h-screen items-center justify-center ">
      <Hero />
      <FeaturesFirst />
      <NewArrivals />
      <WhyUs />
      <FAQs />
      
    </div>
  );
}
