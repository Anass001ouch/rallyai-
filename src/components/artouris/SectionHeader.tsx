import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function Eyebrow({ children, className, icon }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-terracotta-200 bg-terracotta-50/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta-700 backdrop-blur-sm",
        className
      )}
    >
      {icon && <span className="text-terracotta-500">{icon}</span>}
      {children}
    </span>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
      )}
      <h2
        className={cn(
          "font-display font-extrabold tracking-tight text-navy-800 text-balance text-3xl sm:text-4xl md:text-[2.85rem] md:leading-[1.08]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-base sm:text-lg leading-relaxed text-navy-600 text-pretty",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
