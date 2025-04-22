"use client";

import { forwardRef, useEffect, useState } from "react";
import { Cross2Icon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MenuToggleProps extends Omit<ButtonProps, "children" | "value" | "onToggle"> {
  onToggle?: (value: boolean) => void;
  value?: boolean;
}

const MenuToggle = forwardRef<HTMLButtonElement, MenuToggleProps>(
  ({ onToggle, onClick, className, ...restProps }, ref) => {
    const [value, setValue] = useState<boolean>(restProps.value || false);

    function toggleMenu() {
      const newValue = !value;

      if (!("value" in restProps)) {
        setValue(newValue);
      }

      onToggle?.(newValue);
    }

    useEffect(() => {
      if ("value" in restProps) {
        setValue(restProps.value || false);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restProps.value]);

    return (
      <Button
        ref={ref}
        variant="outline"
        size="icon"
        className={cn("shrink-0 lg:hidden bg-transparent", className)}
        onClick={(e) => (onClick?.(e), toggleMenu())}
      >
        {!value ? (
          <DotsVerticalIcon className="w-6 h-6 animate-rise-down" />
        ) : (
          <Cross2Icon className="w-6 h-6 animate-rise-up" />
        )}
      </Button>
    );
  }
);

MenuToggle.displayName = "MenuToggle";

export default MenuToggle;
