import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-gradient-accent text-white shadow-soft hover:shadow-hover hover:scale-105",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary/20",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80 shadow-soft",
        outline: "text-foreground border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5",
        success: "bg-accent text-accent-foreground shadow-soft hover:shadow-hover",
        warning: "bg-warning text-warning-foreground shadow-soft",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
