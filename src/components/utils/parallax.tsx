
'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ParallaxProps = {
  children?: ReactNode;
  className?: string;
  speed?: number;
};

export function Parallax({ children, className, speed = 0.5 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { top, height } = ref.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const elementScrollY = scrollY + top;
        const elementCenter = elementScrollY + height / 2;
        const viewportCenter = scrollY + window.innerHeight / 2;
        const newTranslateY = (viewportCenter - elementCenter) * speed;
        setTranslateY(newTranslateY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={cn('transition-transform duration-100 ease-out', className)}
      style={{ transform: `translateY(${translateY}px)` }}
    >
      {children}
    </div>
  );
}
