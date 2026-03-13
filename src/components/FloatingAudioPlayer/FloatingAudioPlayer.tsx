import { useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import confetti from "canvas-confetti";
import { ScratchHeart } from "./components/ScratchHeart";

export const FloatingAudioPlayer = ({ audioSrc }: { audioSrc: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewFixed, setViewFixed] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isScratched, setIsScratched] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleComplete = () => {
    setIsScratched(true);

    // Explosión central
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#ffffff", "#8f8269"], // Ajusté al tono de tu paleta
      disableForReducedMotion: true,
    });

    // Ráfagas laterales
    let count = 0;
    const interval = setInterval(() => {
      confetti({
        particleCount: 20,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#d4af37", "#ffffff"],
      });
      confetti({
        particleCount: 20,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#d4af37", "#ffffff"],
      });

      count++;
      if (count > 4) {
        clearInterval(interval);
      }
    }, 400);

    setTimeout(() => setShowStartButton(true), 1200);
  };

  const handleStartInvitation = () => {
    audioRef.current?.play().catch(console.error);
    setIsPlaying(true);
    setIsExiting(true);
    setTimeout(() => {
      setViewFixed(false);
    }, 1000);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* 1. AUDIO ELEMENT OCULTO */}
      <audio ref={audioRef} src={audioSrc} preload="auto" loop />

      {/* 2. PANTALLA DE BIENVENIDA (OVERLAY FULL SCREEN) */}
      {viewFixed && (
        <div
          className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#fdfcf8] transition-opacity duration-1000 ${
            isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Textura sutil de fondo (opcional, le da un toque a papel antiguo) */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,transparent_0%,#f0eee5_100%)]"></div>

          <div className="relative z-10 flex flex-col items-center w-full px-6">
            {/* Título Elegante */}
            <div className="h-24 mb-4 flex justify-center items-end w-full">
              <h1
                className={`text-center transition-all duration-1000 ${
                  isScratched
                    ? "text-[#d4af37] text-3xl md:text-4xl uppercase tracking-[0.3em] font-serif"
                    : "text-[#8f8269] text-6xl md:text-7xl font-[extraCursive]"
                }`}
              >
                {isScratched ? "Our Wedding" : "Welcome"}
              </h1>
            </div>

            {/* Componente Raspa y Gana */}
            <div className="my-6 drop-shadow-xl">
              <ScratchHeart
                isScratched={isScratched}
                onComplete={handleComplete}
              />
            </div>

            {/* Texto de Instrucción (con animación de pulso sutil para invitar a la acción) */}
            {!isScratched && (
              <p className="-mt-6 text-xs md:text-sm uppercase tracking-[0.3em] text-[#8f8269] animate-pulse">
                Scratch to reveal
              </p>
            )}

            {/* Botón de Inicio Elegante */}
            <div className="-mt-6 h-16 flex items-center justify-center w-full relative">
              <button
                onClick={handleStartInvitation}
                className={`flex items-center gap-3 px-10 py-3 bg-transparent border border-[#d4af37] text-[#d4af37] font-serif text-sm tracking-widest uppercase rounded-full transition-all duration-700 hover:bg-[#d4af37] hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] ${
                  showStartButton
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 pointer-events-none"
                }`}
              >
                Enter Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. REPRODUCTOR FLOTANTE (MINI BOTÓN POST-START) */}
      {!viewFixed && (
        <div className="fixed bottom-6 right-6 z-90 animate-in fade-in zoom-in slide-in-from-bottom-5 duration-1000">
          <div className="relative group">
            {/* Efecto de onda (ripple) cuando está reproduciendo música */}
            {isPlaying && (
              <div className="absolute inset-0 rounded-full bg-[#d4af37] opacity-40 animate-ping"></div>
            )}

            <button
              onClick={togglePlay}
              className={`relative w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center border transition-all duration-500 hover:scale-110 ${
                isPlaying
                  ? "bg-[#fdfcf8] border-[#d4af37]/30"
                  : "bg-[#d4af37] border-transparent"
              }`}
              aria-label="Toggle Audio"
            >
              {isPlaying ? (
                // Girando lentamente mientras suena la música (estilo disco de vinilo)
                <FaPause className="w-5 h-5 text-[#d4af37] transition-colors" />
              ) : (
                <FaPlay className="w-5 h-5 text-white ml-1 transition-colors" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
