import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: { x: number; y: number };
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
  type: 'spark' | 'star' | 'diamond' | 'circle' | 'line';
}

interface ParticleFieldProps {
  particleCount?: number;
  className?: string;
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  colors?: string[];
  interactive?: boolean;
}

const ParticleField: React.FC<ParticleFieldProps> = ({
  particleCount = 150,
  className = '',
  intensity = 'medium',
  colors = ['#00f3ff', '#bf00ff', '#ff0099', '#00ff41', '#ff8c00', '#60a5fa'],
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const [isMouseActive, setIsMouseActive] = useState(false);

  const intensitySettings = {
    low: { speed: 0.5, size: { min: 1, max: 3 }, life: { min: 120, max: 240 } },
    medium: { speed: 1, size: { min: 2, max: 5 }, life: { min: 180, max: 360 } },
    high: { speed: 1.5, size: { min: 3, max: 7 }, life: { min: 240, max: 480 } },
    extreme: { speed: 2.5, size: { min: 4, max: 10 }, life: { min: 300, max: 600 } },
  };

  const settings = intensitySettings[intensity];

  const createParticle = (x?: number, y?: number): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Particle;

    const types: Particle['type'][] = ['spark', 'star', 'diamond', 'circle', 'line'];

    return {
      id: Math.random(),
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      size: Math.random() * (settings.size.max - settings.size.min) + settings.size.min,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: {
        x: (Math.random() - 0.5) * settings.speed,
        y: (Math.random() - 0.5) * settings.speed,
      },
      opacity: Math.random() * 0.8 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      life: Math.random() * (settings.life.max - settings.life.min) + settings.life.min,
      maxLife: Math.random() * (settings.life.max - settings.life.min) + settings.life.min,
      type: types[Math.floor(Math.random() * types.length)],
    };
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity * (particle.life / particle.maxLife);
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);
    ctx.fillStyle = particle.color;
    ctx.shadowColor = particle.color;
    ctx.shadowBlur = particle.size * 2;

    switch (particle.type) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'star':
        drawStar(ctx, particle.size);
        break;
      case 'diamond':
        drawDiamond(ctx, particle.size);
        break;
      case 'spark':
        drawSpark(ctx, particle.size);
        break;
      case 'line':
        drawLine(ctx, particle.size);
        break;
    }
    ctx.restore();
  };

  const drawStar = (ctx: CanvasRenderingContext2D, size: number) => {
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size * 0.4;

    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  };

  const drawDiamond = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size, 0);
    ctx.lineTo(0, size);
    ctx.lineTo(-size, 0);
    ctx.closePath();
    ctx.fill();
  };

  const drawSpark = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineWidth = size * 0.3;
    ctx.beginPath();
    ctx.moveTo(-size, 0);
    ctx.lineTo(size, 0);
    ctx.moveTo(0, -size);
    ctx.lineTo(0, size);
    ctx.stroke();
  };

  const drawLine = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineWidth = size * 0.2;
    ctx.beginPath();
    ctx.moveTo(-size * 2, 0);
    ctx.lineTo(size * 2, 0);
    ctx.stroke();
  };

  const updateParticle = (particle: Particle, canvas: HTMLCanvasElement) => {
    // 寿命管理
    particle.life--;
    if (particle.life <= 0) {
      return createParticle();
    }

    // マウス相互作用
    if (interactive && isMouseActive) {
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = (100 - distance) / 1000;
        particle.velocity.x += dx * force;
        particle.velocity.y += dy * force;
      }
    }

    // 重力と摩擦
    particle.velocity.y += 0.01;
    particle.velocity.x *= 0.99;
    particle.velocity.y *= 0.99;

    // 位置更新
    particle.x += particle.velocity.x;
    particle.y += particle.velocity.y;

    // 回転更新
    particle.rotation += particle.rotationSpeed;

    // 境界処理（循環）
    if (particle.x < 0) particle.x = canvas.width;
    if (particle.x > canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = canvas.height;
    if (particle.y > canvas.height) particle.y = 0;

    return particle;
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // キャンバスクリア（トレイル効果）
    ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // パーティクル更新・描画
    particlesRef.current = particlesRef.current.map(particle => {
      const updatedParticle = updateParticle(particle, canvas);
      drawParticle(ctx, updatedParticle);
      return updatedParticle;
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setIsMouseActive(true);
  };

  const handleMouseLeave = () => {
    setIsMouseActive(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // クリック位置に爆発パーティクル生成
    for (let i = 0; i < 15; i++) {
      const particle = createParticle(x, y);
      particle.velocity.x = (Math.random() - 0.5) * 4;
      particle.velocity.y = (Math.random() - 0.5) * 4;
      particle.size *= 1.5;
      particle.opacity = 1;
      particlesRef.current.push(particle);
    }
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();

    // 初期パーティクル生成
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle());

    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-auto ${className}`}
      style={{ zIndex: -1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    />
  );
};

export default ParticleField;