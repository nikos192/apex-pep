"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
}

export function ProductImage({ src, alt, fill = true, priority = false, className }: ProductImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      className={className}
      onError={() => {
        setImageSrc("/images/placeholder.png");
      }}
    />
  );
}
