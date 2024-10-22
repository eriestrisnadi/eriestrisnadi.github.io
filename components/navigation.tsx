import { cloneElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationConfig } from "@/config/navigation";
import { cn, HORIZONTAL, type Position } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavigationProps extends Partial<Pick<HTMLElement, "className">> {
  position?: Position;
}

export function Navigation({
  className,
  position = HORIZONTAL,
}: NavigationProps) {
  const isHorizontal = position === HORIZONTAL;
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex flex-row space-x-1 text-sm items-center",
        !isHorizontal && "flex-col items-start space-x-0 space-y-1",
        className
      )}
    >
      {navigationConfig.mainNav?.map(
        (item) =>
          item.href && (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                "justify-start w-full space-x-2",
                pathname === item.href && "bg-accent text-accent-foreground",
                isHorizontal && "justify-center"
              )}
            >
              <Link href={item.href}>
                {cloneElement(item.icon, { className: "-ml-2" })}
                <span className="leading-none">{item.title}</span>
              </Link>
            </Button>
          )
      )}
    </nav>
  );
}
