'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface ScrolledImageProps {
  src: string;
  fadeDuration: number;
  className?: string;
  easing?: string;
}

export default function ScrolledImage({
  src,
  fadeDuration,
  className = "",
  easing = "ease-in-out"
}: ScrolledImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [nextSrc, setNextSrc] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);
  const topLayerRef = useRef<HTMLDivElement>(null);

  // First Effect: Queue the Next Image
  useEffect(() => {
    if (src !== currentSrc && nextSrc === null) {
      setNextSrc(src);
    }
  }, [src, currentSrc, nextSrc]);

  // Second Effect: Trigger the Fade
  useEffect(() => {
    if (nextSrc !== null) {
      const trigger = requestAnimationFrame(() => {
        setIsFading(true);
      });
      return () => cancelAnimationFrame(trigger);
    }
  }, [nextSrc]);

  const handleTransitionEnd = () => {
    if (isFading && nextSrc) {
      setCurrentSrc(nextSrc);
      setNextSrc(null);
      setIsFading(false);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-black/20 z-30"></div>

      {/* Bottom layer - current image */}
      <div className="absolute inset-0">
        <Image
          src={currentSrc}
          alt="Background"
          fill
          className="object-cover"
          style={{
            opacity: isFading ? 0 : 1,
            transition: isFading
              ? `opacity ${fadeDuration}ms ${easing}`
              : 'none',
          }}
          priority
        />
      </div>

      {/* Top layer - next image (when fading) */}
      {nextSrc && (
        <div
          ref={topLayerRef}
          className="absolute inset-0"
          style={{
            opacity: isFading ? 1 : 0,
            transition: `opacity ${fadeDuration}ms ${easing}`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          <Image
            src={nextSrc}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </div>
  );
}
