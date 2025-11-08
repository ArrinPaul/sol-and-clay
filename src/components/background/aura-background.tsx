
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
    const gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
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
  
  const colors = theme === 'dark' 
    ? ['hsl(22, 36%, 15%, 0.2)', 'hsl(21, 33%, 13%, 0.2)', 'hsl(0, 73%, 88%, 0.05)']
    : ['hsl(22, 36%, 15%, 0.05)', 'hsl(36, 56%, 95%, 0.1)', 'hsl(0, 73%, 88%, 0.1)'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { willReadFrequently: false });
    if (!context) return;

    let animationFrameId: number;
    let orbs: Orb[] = [];
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      orbs = colors.map(color => new Orb(canvas.width, canvas.height, color));
    };

    resizeCanvas();
    
    if (reducedMotion) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = 'lighter';
      orbs.forEach(orb => orb.draw(context));
      return;
    }

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = 'lighter'; // Additive blending
      
      orbs.forEach(orb => {
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
  }, [theme, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full opacity-50"
      style={{ isolation: 'isolate' }}
    />
  );
}
