import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/common/utils/utils";

const authButtonVariants = cva(
  "text-[14px] font-medium rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-blue-400 text-white hover:bg-blue-500",
        outline: "text-blue-400 bg-white border border-blue-400 hover:text-blue-500",
      },
      display: {
        desktop: "px-4 py-2",
        mobile: "block text-center px-4 py-2.5 md:py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      display: "desktop",
    },
  }
);

interface IAuthButtonProps extends VariantProps<typeof authButtonVariants> {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export const AuthButton = ({
  children,
  href,
  variant,
  display,
  className,
}: IAuthButtonProps) => {
  return (
    <a
      href={href}
      className={cn(authButtonVariants({ variant, display }), className)}
    >
      {children}
    </a>
  );
};
