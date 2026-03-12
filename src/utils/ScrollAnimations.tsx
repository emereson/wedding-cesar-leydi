import { useEffect, memo } from "react";
import Lenis from "lenis";

function ScrollAnimations() {
  useEffect(() => {
    // 1. INICIALIZAR LENIS (Solo para el scroll suave, sin enredarlo con animaciones)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Al usar requestAnimationFrame nativo, evitamos conflictos en iOS
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. INTERSECTION OBSERVER (Reemplaza a GSAP ScrollTrigger)
    const observerOptions = {
      root: null, // Usa el viewport del navegador (Evita bugs en iOS)
      rootMargin: "0px",
      threshold: 0.1, // Se activa cuando el 10% del elemento es visible (similar a top 90%)
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Entra en pantalla -> Animamos hacia adentro
          entry.target.classList.add("is-visible");
        } else {
          // Sale de pantalla -> Revertimos la animación
          entry.target.classList.remove("is-visible");
        }
      });
    }, observerOptions);

    // 3. OBSERVAR TODOS LOS ELEMENTOS
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    // 4. LIMPIEZA AL DESMONTAR
    return () => {
      lenis.destroy();
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return null;
}

export const MemoScrollAnimations = memo(ScrollAnimations);
