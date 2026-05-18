interface CustomObjectProps {
  variants:
  | "line-purple-left"
  | "full"
  | "green"
  | "orange-half-circle-lines"
  | "hero-left-full"
  | "circle-2"
  | "blue-short-line-left"
  | "hero-left-full-gif"
  | "purple-dots"
  | "purple-line-small-right"
  | "green-disk"
  | "orange-disk"
  | "blue-dots"
  | "line-orange-left"
  | "long-line-orange-left"
  | "long-line-teal-left"
  | "line-teal-up"
  | "teal-disk"
  | "vector_one"
  | "half-dash-yellow"
  | "text-rotate"
  | "yellow-doted"
  | "green-doted"
  | "vector_fixed";


  className: string;
}

function CustomObject({ variants, className }: CustomObjectProps) {
  const objectVariants = {
    "line-purple-left": "/images/objects/purple-line-left.webp",
    "circle-2": "/images/objects/circle-2.gif",
    "half-dash-yellow": "/images/objects/half-dash-yellow.gif",
    "full": "/images/objects/izhtech_animation.gif",
    "green": "/images/objects/green.gif",
    "orange-half-circle-lines": "/images/objects/orange-half-circle-lines.webp",
    "hero-left-full": "/images/objects/hero-full.webp",
    "hero-left-full-gif": "/images/objects/hero-full.gif",
    "purple-dots": "/images/objects/purple-dots.webp",
    "blue-dots": "/images/objects/blue-dots.webp",
    "line-orange-left": "/images/objects/orange-line-left.webp",
    "long-line-orange-left": "/images/objects/orange-line-long-left.webp",
    "long-line-teal-left": "/images/objects/teal-line-long-left.webp",
    "green-disk": "/images/objects/green-disk.webp",
    "orange-disk": "/images/objects/orange-right.webp",
    "line-teal-up": "/images/objects/line-up-teal.webp",
    "teal-disk": "/images/objects/teal-disk.webp",
    "purple-line-small-right": "/images/objects/purple-line-right-small.gif",
    "vector_one": "/images/objects/Vector1.webp",
    "vector_fixed": "/images/objects/purple-line-right-small-rename.webp",
    "blue-short-line-left": "/images/objects/blue-short-line-left.gif",
    "text-rotate": "/images/objects/text-rotate.gif",
    "green-doted": "/images/objects/green-doted.webp",
    "yellow-doted": "/images/objects/yellow-doted.webp"
  };



  const imageSrc: string =
    objectVariants[variants] || "/images/objects/purple-line-left.webp";

  return (
    <img
      className={` ${className}`}
      src={imageSrc}
      alt={`Custom object variant: ${variants}`}
    />
  );
}

export default CustomObject;
