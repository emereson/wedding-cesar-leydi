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

    // 2. INTERSECTION OBSERVER
    const observerOptions = {
      root: null, // Usa el viewport del navegador (Evita bugs en iOS)
      rootMargin: "0px",
      threshold: 0.1, // Se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 1. Entra en pantalla -> Animamos hacia adentro
          entry.target.classList.add("is-visible");

          // 2. Dejar de observar este elemento para que solo se anime una vez
          obs.unobserve(entry.target);
        }
        // Eliminamos el 'else' para que no le quite la clase al salir de pantalla
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
