// "use client";

// import dynamic from "next/dynamic";
// import type {
//   LucideProps,
// } from "lucide-react";

// interface DynamicIconProps
//   extends LucideProps {
//   iconName?: string;
// }

// export default function DynamicIcon({
//   iconName,
//   className,
//   ...props
// }: DynamicIconProps) {

//   if (!iconName) return null;

//   const Icon = dynamic(async () => {

//     const icons =
//       await import("lucide-react");

//     return (
//       icons[
//       iconName as keyof typeof icons
//       ] as React.ComponentType<LucideProps>
//     );

//   }, {
//     ssr: false,

//     loading: () => (
//       <span className="w-4 h-4" />
//     ),
//   });

//   return (
//     <Icon
//       className={className}
//       {...props}
//     />
//   );
// }

"use client";

import type { LucideProps } from "lucide-react";
import { ICONS, IconName } from "./icons";

interface DynamicIconProps extends LucideProps {
  iconName?: string;
}

export default function DynamicIcon({
  iconName,
  className,
  ...props
}: DynamicIconProps) {
  if (!iconName) return null;

  const Icon =
    ICONS[
    iconName as IconName
    ];

  if (!Icon) {
    console.warn(
      `Lucide icon "${iconName}" not found in ICONS map`
    );

    return null;
  }

  return (
    <Icon
      className={className}
      {...props}
    />
  );
}