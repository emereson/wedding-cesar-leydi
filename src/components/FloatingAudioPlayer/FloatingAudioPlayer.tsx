import { useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import confetti from "canvas-confetti";
import { ScratchHeart } from "./components/ScratchHeart";

export const FloatingAudioPlayer = ({ audioSrc }: { audioSrc: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewFixed, setViewFixed] = useState(true);
  const [isScratched, setIsScratched] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleComplete = () => {
    setIsScratched(true);

    // --- MASSIVE CONFETTI RAIN ---
    // 1. Central Explosion
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#ffffff", "#45524c"],
    });

    // 2. Side Cannons with slight delay
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#d4af37", "#ffffff"],
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#d4af37", "#ffffff"],
      });
    }, 300);

    // 3. Continuous rain for 2 seconds
    const end = Date.now() + 2000;
    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#d4af37", "#ffffff"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#d4af37", "#ffffff"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    setTimeout(() => setShowStartButton(true), 1200);
  };

  const handleStartInvitation = () => {
    audioRef.current?.play().catch(console.error);
    setIsPlaying(true);
    setViewFixed(false);
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
    <div className="fixed bottom-3 right-3 z-50">
      <audio ref={audioRef} src={audioSrc} preload="auto" loop />

      {viewFixed && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-all duration-1000">
          <div className="relative z-10 flex flex-col items-center w-full px-4">
            {/* Unified Title */}
            <div className="relative h-16 mb-6 flex justify-center items-center w-full">
              <h1
                className={`text-center font-serif transition-all duration-1000 tracking-widest font-black ${
                  isScratched
                    ? "text-[#d4af37] text-2xl md:text-4xl uppercase tracking-[0.4em]"
                    : "text-[#d4af37] text-4xl"
                }`}
              >
                {isScratched ? "Our Wedding" : "Welcome!"}
              </h1>
            </div>

            <ScratchHeart
              isScratched={isScratched}
              onComplete={handleComplete}
            />

            {/* Start Button */}
            <div className="mt-12 h-16 flex items-center justify-center w-full relative">
              <button
                onClick={handleStartInvitation}
                className={`px-10 py-3 bg-[#d4af37] cursor-pointer text-white font-serif font-bold tracking-widest uppercase rounded-full shadow-lg shadow-[#d4af37]/40 transform transition-all duration-1000 hover:scale-105 ${
                  showStartButton
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10 pointer-events-none"
                }`}
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post-Start Floating Player */}
      {!viewFixed && (
        <div className="relative animate-in fade-in zoom-in duration-700">
          <div
            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center border border-gray-100 bg-white cursor-pointer"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <FaPause className="w-5 h-5 text-[#d4af37]" />
            ) : (
              <FaPlay className="w-5 h-5 text-[#d4af37] ml-1" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
