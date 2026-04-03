import { cn } from "@/src/lib/utils";

export const Heading = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <h1 className={cn("w-full px-4 md:px-0 text-4xl md:text-5xl lg:text-[60px] text-left font-cormorantGaramond font-bold text-gray-700 py-4 tracking-tighter", className)}>
      {children}
    </h1>
  );
}

export const SubHeading = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <h2 className={cn("px-4 md:px-0 text-[16px] md:text-[18px] lg:text-[18px] font-inter text-left text-gray-600 py-4 font-normal w-full md:w-120 lg:w-160 tracking-tight", className)}>
      {children}
    </h2>
  );
}