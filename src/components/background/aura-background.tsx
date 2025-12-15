
'use client';

import { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

class Orb {
  x: number;
  y: number;
  radius: number;
  xVelocity: number;
  yVelocity: number;
  color: string;

  constructor(canvasWidth: number, canvasHeight: number, color: string) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.radius = Math.random() * 200 + 150; // Orbs are large
    this.xVelocity = (Math.random() - 0.5) * 0.3;
    this.yVelocity = (Math.random() - 0.5) * 0.3;
    this.color = color;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    const gradient = context.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius
    );
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, 'transparent');
    context.fillStyle = gradient;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    if (this.x - this.radius > canvasWidth || this.x + this.radius < 0) {
      this.xVelocity *= -1;
    }
    if (this.y - this.radius > canvasHeight || this.y + this.radius < 0) {
      this.yVelocity *= -1;
    }
  }
}

export function AuraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { willReadFrequently: false });
    if (!context) return;

    const colors =
      theme === 'dark'
        ? [
            'hsl(30, 28%, 42%, 0.15)', // Warm Terra Cotta Brown
            'hsl(25, 35%, 65%, 0.12)', // Soft Caramel
            'hsl(183, 45%, 65%, 0.08)', // Muted Teal
          ]
        : [
            'hsl(30, 28%, 42%, 0.06)', // Warm Terra Cotta Brown
            'hsl(15, 55%, 75%, 0.08)', // Warm Terracotta
            'hsl(25, 35%, 65%, 0.06)', // Soft Caramel
          ];

    let animationFrameId: number;
    let orbs: Orb[] = [];
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      orbs = colors.map((color) => new Orb(canvas.width, canvas.height, color));
    };

    resizeCanvas();

    if (reducedMotion) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = 'lighter';
      orbs.forEach((orb) => orb.draw(context));
      return;
    }

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = 'lighter'; // Additive blending

      orbs.forEach((orb) => {
        orb.update(canvas.width, canvas.height);
        orb.draw(context);
      });

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full opacity-50"
      style={{ isolation: 'isolate' }}
    />
  );
}

    