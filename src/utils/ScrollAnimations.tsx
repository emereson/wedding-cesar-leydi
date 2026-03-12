import { useEffect, memo } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollAnimations() {
  useEffect(() => {
    // 1. Inicializar Lenis dejando que use el window y document por defecto.
    // Esto es CRÍTICO para que iOS Safari no colapse al hacer zoom.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // autoRaf: true suele funcionar, pero sincronizarlo con el ticker de GSAP es más estable
    });

    // 2. Sincronizar ScrollTrigger con Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Sincronizar el requestAnimationFrame de Lenis con el de GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 3. Animaciones
    const elements = document.querySelectorAll(".animate-on-scroll");

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            // Eliminamos scroller: rootElement para que use el window nativo
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf); // Limpiar el ticker
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}

export const MemoScrollAnimations = memo(ScrollAnimations);
