import Image from "next/image";

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

function CustomObject({
  variants,
  className,
}: CustomObjectProps) {

  const objectVariants = {
    "line-purple-left":
      "/images/objects/purple-line-left.webp",

    "circle-2":
      "/images/objects/circle-2.gif",

    "half-dash-yellow":
      "/images/objects/half-dash-yellow.gif",

    "full":
      "/images/objects/izhtech_animation.gif",

    "green":
      "/images/objects/green.gif",

    "orange-half-circle-lines":
      "/images/objects/orange-half-circle-lines.webp",

    "hero-left-full":
      "/images/objects/hero-full.webp",

    "hero-left-full-gif":
      "/images/objects/hero-full.gif",

    "purple-dots":
      "/images/objects/purple-dots.webp",

    "blue-dots":
      "/images/objects/blue-dots.webp",

    "line-orange-left":
      "/images/objects/orange-line-left.webp",

    "long-line-orange-left":
      "/images/objects/orange-line-long-left.webp",

    "long-line-teal-left":
      "/images/objects/teal-line-long-left.webp",

    "green-disk":
      "/images/objects/green-disk.webp",

    "orange-disk":
      "/images/objects/orange-right.webp",

    "line-teal-up":
      "/images/objects/line-up-teal.webp",

    "teal-disk":
      "/images/objects/teal-disk.webp",

    "purple-line-small-right":
      "/images/objects/purple-line-right-small.gif",

    "vector_one":
      "/images/objects/Vector1.webp",

    "vector_fixed":
      "/images/objects/purple-line-right-small-rename.webp",

    "blue-short-line-left":
      "/images/objects/blue-short-line-left.gif",

    "text-rotate":
      "/images/objects/text-rotate.gif",

    "green-doted":
      "/images/objects/green-doted.webp",

    "yellow-doted":
      "/images/objects/yellow-doted.webp",
  };

  // Only Lighthouse warning images
  const objectSizes = {
    "circle-2": {
      width: 360,
      height: 1000,
    },

    "text-rotate": {
      width: 1100,
      height: 1000,
    },

    "orange-disk": {
      width: 70,
      height: 70,
    },

    "yellow-doted": {
      width: 250,
      height: 1000,
    },

    "green-disk": {
      width: 70,
      height: 70,
    },

    "blue-short-line-left": {
      width: 500,
      height: 500,
    },

    "full": {
      width: 500,
      height: 1000,
    },

    "orange-half-circle-lines": {
      width: 150,
      height: 1000,
    },

    "green": {
      width: 500,
      height: 500,
    },

    "line-teal-up": {
      width: 500,
      height: 500,
    },

    "half-dash-yellow": {
      width: 600,
      height: 600,
    },
  };

  const imageSrc: string =
    objectVariants[variants] ||
    "/images/objects/purple-line-left.webp";

  const size = objectSizes[
    variants as keyof typeof objectSizes
  ];

  return (
    <img
      className={className}
      src={imageSrc}
      alt={`Custom object variant: ${variants}`}
      loading="lazy"
      decoding="async"
      width={size?.width}
      height={size?.height}
    />
  );
}

export default CustomObject;