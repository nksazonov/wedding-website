'use client';

import { useEffect, useRef } from 'react';

let imageChangeCallback: ((src: string) => void) | null = null;

export function setImageChangeCallback(callback: (src: string) => void) {
  imageChangeCallback = callback;
}

export function useImageObserver<T extends HTMLElement>(imageUrl?: string) {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    if (!imageUrl || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imageChangeCallback) {
            imageChangeCallback(imageUrl);
          }
        });
      },
      {
        threshold: (() => {
          const viewportHeight = window.innerHeight;
          const sectionHeight = elementRef.current?.offsetHeight || viewportHeight;
          return Math.min(viewportHeight / sectionHeight / 2, 1);
        })(),
      }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [imageUrl]);

  return elementRef;
}
