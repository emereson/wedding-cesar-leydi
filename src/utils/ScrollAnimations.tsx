import { useEffect, memo } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
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

function ScrollFixedImage() {
  useEffect(() => {
    const sections = [
      { trigger: ".banner-section", target: ".banner-image" },
      { trigger: ".cro-section", target: ".cro-image" },
      { trigger: ".blessing-section", target: ".blessing-image" },
      { trigger: ".goodParents-section", target: ".goodParents-image" },
      { trigger: ".itinerary-section", target: ".itinerary-image" },
      { trigger: ".gitTable-section", target: ".gitTable-image" },
    ];

    // 1. Mapeamos y creamos los triggers
    const triggers = sections
      .map((sec) => {
        const el = document.querySelector(sec.trigger);
        if (!el) return null;

        return ScrollTrigger.create({
          trigger: sec.trigger,
          start: "top top",
          end: "bottom top",
          pin: sec.target,
          pinSpacing: false,
          pinType: "fixed",
          anticipatePin: 1,
        });
      })
      .filter((t): t is ScrollTrigger => t !== null); // 2. Filtramos los nulos correctamente

    return () => {
      // 3. Limpiamos solo los que existen
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}

export const MemoScrollAnimations = memo(ScrollAnimations);
export const MemoScrollFixedImage = memo(ScrollFixedImage);
