import React, { useRef, useEffect, useMemo } from "react";
import { GiRing } from "react-icons/gi";

interface ScratchHeartProps {
  onComplete: () => void;
  isScratched: boolean;
}

const HEART_PATH =
  "M150,55 C150,55 120,15 70,15 C30,15 0,50 0,95 C0,165 150,255 150,255 C150,255 300,165 300,95 C300,50 270,15 220,15 C170,15 150,55 150,55 Z";

// 1. Campo de destellos aleatorios (Versión Ultra-Optimizada con CSS puro)
const GoldFlaresField: React.FC<{ count: number }> = ({ count }) => {
  const flares = useMemo(() => {
    const flareArray = [];
    for (let i = 0; i < count; i++) {
      flareArray.push({
        id: i,
        x: Math.random() * 240 + 30,
        y: Math.random() * 200 + 30,
        size: Math.random() * 30 + 15,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        rotation: Math.random() * 90,
      });
    }
    return flareArray;
  }, [count]);

  return (
    <div className="absolute inset-0 z-0">
      <style>{`
        /* Efecto de destello cruzado hecho 100% en CSS para no saturar la memoria del iPhone */
        .css-flare-inner {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, #ffffff 0%, rgba(255,246,217,0.8) 20%, rgba(212,175,55,0) 70%);
        }
        .css-flare-inner::before, .css-flare-inner::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          background: #ffffff;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          box-shadow: 0 0 4px #fff6d9, 0 0 10px #d4af37;
        }
        .css-flare-inner::before {
          width: 100%;
          height: 2px;
        }
        .css-flare-inner::after {
          width: 2px;
          height: 100%;
        }
      `}</style>

      {flares.map((flare) => (
        <div
          key={flare.id}
          className="absolute opacity-0"
          style={{
            top: `${flare.y}px`,
            left: `${flare.x}px`,
            width: `${flare.size}px`,
            height: `${flare.size}px`,
            animation: `goldSparkle ${flare.duration}s infinite ease-in-out`,
            animationDelay: `${flare.delay}s`,
            transformOrigin: "center center",
            willChange: "opacity, transform", // Le dice a Safari que use la GPU
          }}
        >
          {/* El contenedor interno maneja la rotación base para no pelear con la animación */}
          <div
            className="css-flare-inner"
            style={{ transform: `rotate(${flare.rotation}deg)` }}
          />
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

    // NOTA: No usamos preventDefault() porque Safari maneja esto con el CSS touch-action.

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
          {/* Mantenemos el blur solo para la sombra estática del fondo, lo cual no afecta el rendimiento */}
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
          WebkitUserSelect: "none", // Previene selección de texto en iOS Safari
          userSelect: "none", // Previene selección de texto en otros navegadores
          filter: "drop-shadow(0px 6px 8px rgba(0,0,0,0.5))",
        }}
      />

      {/* 4. CAMPO DE DESTELLOS DORADOS OPTIMIZADO */}
      {!isScratched && (
        <div
          className="absolute inset-0 z-25 pointer-events-none"
          style={{
            clipPath: "url(#heart-clip)",
            mixBlendMode: "screen",
          }}
        >
          {/* Se redujo de 25 a 20 para mejorar un poco más el rendimiento en celulares viejos */}
          <GoldFlaresField count={20} />
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
