import {
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  ChevronRight,
  CircleUser,
  Search,
  Network,
  Target,
  BarChartHorizontalBig,
  MoveLeft,
  MoveRight,
  Minus,
  Plus,
  ArrowUpRightSquare,
  Facebook,
  Youtube,
  LucideIcon,
  LucideProps,
} from "lucide-react";

export const iconMap = {
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  ChevronRight,
  CircleUser,
  Search,
  Network,
  Target,
  BarChartHorizontalBig,
  MoveLeft,
  MoveRight,
  Minus,
  Plus,
  ArrowUpRightSquare,
  Facebook,
  Youtube,
};

export type IconName = keyof typeof iconMap;

interface DynamicIconProps extends LucideProps {
  iconName?: IconName;
}

export default function DynamicIcon({
  iconName,
  className,
  ...props
}: DynamicIconProps) {

  console.log(iconName);

  if (!iconName) return null;

  const IconComponent =
    iconMap[iconName] as LucideIcon;

  if (!IconComponent) return null;

  return (
    <IconComponent
      className={className}
      {...props}
    />
  );
}