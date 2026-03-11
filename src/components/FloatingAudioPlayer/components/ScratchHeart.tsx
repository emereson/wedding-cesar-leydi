import React, { useRef, useEffect, useMemo } from "react";
import { GiRing } from "react-icons/gi";

interface ScratchHeartProps {
  onComplete: () => void;
  isScratched: boolean;
}

const HEART_PATH =
  "M150,55 C150,55 120,15 70,15 C30,15 0,50 0,95 C0,165 150,255 150,255 C150,255 300,165 300,95 C300,50 270,15 220,15 C170,15 150,55 150,55 Z";

// 1. El SVG del destello suave (La versión que te gustó)
const GoldFlareSVG: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient
          id="flareGradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="30%" stopColor="#fff6d9" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#d4af37" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>

        {/* El filtro de desenfoque que le da el toque mágico */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle
        cx="50"
        cy="50"
        r="30"
        fill="url(#flareGradient)"
        filter="url(#glow)"
      />

      <g filter="url(#glow)">
        <ellipse cx="50" cy="50" rx="50" ry="2" fill="#ffffff" opacity="0.8" />
        <ellipse cx="50" cy="50" rx="30" ry="6" fill="#fff6d9" opacity="0.4" />
        <ellipse cx="50" cy="50" rx="2" ry="50" fill="#ffffff" opacity="0.8" />
        <ellipse cx="50" cy="50" rx="6" ry="30" fill="#fff6d9" opacity="0.4" />
      </g>
    </svg>
  );
};

// 2. Campo de destellos aleatorios
const GoldFlaresField: React.FC<{ count: number }> = ({ count }) => {
  const flares = useMemo(() => {
    const flareArray = [];
    for (let i = 0; i < count; i++) {
      flareArray.push({
        id: i,
        x: Math.random() * 240 + 30,
        y: Math.random() * 200 + 30,
        size: Math.random() * 25 + 15,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        rotation: Math.random() * 90,
      });
    }
    return flareArray;
  }, [count]);

  return (
    <div className="absolute inset-0 z-0">
      {flares.map((flare) => (
        <div
          key={flare.id}
          className="absolute opacity-0 gold-flare-point"
          style={{
            top: `${flare.y}px`,
            left: `${flare.x}px`,
            width: `${flare.size}px`,
            height: `${flare.size}px`,
            animation: `goldSparkle ${flare.duration}s infinite ease-in-out`,
            animationDelay: `${flare.delay}s`,
            transformOrigin: "center center",
          }}
        >
          <div style={{ transform: `rotate(${flare.rotation}deg)` }}>
            <GoldFlareSVG size={flare.size} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ScratchHeart: React.FC<ScratchHeartProps> = ({
  onComplete,
  isScratched,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const initialPixels = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 300;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const img = new Image();
    img.src = "/img/624.webp";
    img.onload = () => {
      const path = new Path2D(HEART_PATH);
      ctx.save();
      ctx.clip(path);
      ctx.drawImage(img, 0, 0, size, size);
      ctx.restore();

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let count = 0;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] > 128) count++;
      }
      initialPixels.current = count;
    };
  }, []);

  const getPos = (e: any) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const draw = (e: any) => {
    if (!isDrawing.current || isScratched) return;
    if (e.cancelable) e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 45; // Tamaño del borrador
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastPos.current?.x || pos.x, lastPos.current?.y || pos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };

  const handleEnd = () => {
    isDrawing.current = false;
    lastPos.current = null;
    checkProgress();
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || initialPixels.current === 0) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let currentOpaque = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] > 128) currentOpaque++;
    }

    const percent = 100 - (currentOpaque / initialPixels.current) * 100;
    // Se completa al raspar el 55%
    if (percent > 55) onComplete();
  };

  return (
    <div className="relative w-75 h-75 flex items-center justify-center transition-transform duration-500 hover:scale-105">
      <style>{`
        @keyframes goldSparkle {
          0%, 100% { opacity: 0; transform: scale(0.1) rotate(0deg); }
          10%, 20% { opacity: 1; transform: scale(1.1) rotate(15deg); }
          30% { opacity: 0; transform: scale(0.1) rotate(30deg); }
        }
      `}</style>

      {/* 1. Sombra Profunda */}
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="absolute inset-0 z-0"
      >
        <defs>
          <filter id="deep-inset">
            <feOffset dx="0" dy="5" />
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite
              operator="out"
              in="SourceGraphic"
              in2="blur"
              result="inverse"
            />
            <feFlood floodColor="black" floodOpacity="0.65" result="color" />
            <feComposite
              operator="in"
              in="color"
              in2="inverse"
              result="shadow"
            />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
          <clipPath id="heart-clip">
            <path d={HEART_PATH} />
          </clipPath>
        </defs>
        <path d={HEART_PATH} fill="#ffffff" filter="url(#deep-inset)" />
      </svg>

      {/* 2. Nombres y Anillo */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-center">
        <div className="flex flex-col items-center">
          <h2
            className={`font-[extraCursive] text-[42px] leading-none transition-all duration-1000 ${isScratched ? "text-[#d4af37] scale-105 -translate-y-4" : "text-[#d4af378a]"}`}
          >
            Cesar <span className="text-[28px]">&</span> Leydi
          </h2>
          <div
            className={`mt-2 transition-all duration-1000 ${isScratched ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
          >
            <GiRing className="text-[#d4af37] text-[45px] drop-shadow-md" />
          </div>
        </div>
      </div>

      {/* 3. Canvas para Raspar */}
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => {
          isDrawing.current = true;
          lastPos.current = getPos(e);
        }}
        onMouseMove={draw}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => {
          isDrawing.current = true;
          lastPos.current = getPos(e);
        }}
        onTouchMove={draw}
        onTouchEnd={handleEnd}
        className={`absolute inset-0 z-20 cursor-pointer transition-opacity duration-1000 ${isScratched ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{
          touchAction: "none",
          filter: "drop-shadow(0px 6px 8px rgba(0,0,0,0.5))",
        }}
      />

      {/* 4. CAMPO DE DESTELLOS DORADOS */}
      {!isScratched && (
        <div
          className="absolute inset-0 z-25 pointer-events-none"
          style={{
            clipPath: "url(#heart-clip)",
            mixBlendMode: "screen",
          }}
        >
          <GoldFlaresField count={25} />
        </div>
      )}

      {/* 5. Borde Dorado */}
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="absolute inset-0 pointer-events-none z-30"
      >
        <path
          d={HEART_PATH}
          fill="none"
          stroke="#d4af37"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
