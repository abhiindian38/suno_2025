import React from "react";
import { cn } from "../../lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    fluid?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, fluid = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "w-full mx-auto px-4 tablet:px-6 laptop:px-8",
                    !fluid && "max-w-screen-tablet laptop:max-w-screen-laptop desktop:max-w-screen-desktop large:max-w-[1600px]",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Container.displayName = "Container";

export { Container };
