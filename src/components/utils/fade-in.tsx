
'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  as?: keyof JSX.IntrinsicElements;
};

export function FadeIn({ children, className, delay, direction = 'up', as: Component = 'div' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const directionClasses = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
  };

  return (
    <Component
      ref={ref}
      className={cn(
        'transition-all duration-1000',
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0',
        direction && !isVisible && directionClasses[direction],
        delay,
        className
      )}
    >
      {children}
    </Component>
  );
}
