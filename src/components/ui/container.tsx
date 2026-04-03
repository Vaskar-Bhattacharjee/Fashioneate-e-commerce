import { cn } from "../../lib/utils";

export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("w-full lg:max-w-7xl lg:mx-auto  relative", className)}>
            {children}
        </div>
    );
}