"use client";

import * as Icons from "lucide-react";

import {
  LucideIcon,
  LucideProps,
} from "lucide-react";

interface DynamicIconProps extends LucideProps {
  iconName?: string;
}

export default function DynamicIcon({
  iconName,
  className,
  ...props
}: DynamicIconProps) {

  const IconComponent = iconName
    ? (Icons[
      iconName as keyof typeof Icons
    ] as LucideIcon)
    : null;

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      className={className}
      {...props}
    />
  );
}