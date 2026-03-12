import { useEffect, memo } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollAnimations() {
  useEffect(() => {
    // 1. Obtener la referencia del contenedor root
    const rootElement =
      document.getElementById("root") || document.documentElement;

    // 2. Inicializar Lenis apuntando al contenedor específico
    const lenis = new Lenis({
      wrapper: rootElement, // El elemento que tiene el overflow
      content: rootElement, // El elemento que tiene el contenido (en root suele ser el mismo)
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
    });

    // 3. Sincronizar ScrollTrigger para que "escuche" a #root y no a la ventana global
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(rootElement, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value || 0, { immediate: true })
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // 4. Animaciones de entrada configuradas para el scroller #root
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
            scroller: rootElement, // 👈 CRÍTICO: Indica que el scroll sucede en #root
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Refrescar para que ScrollTrigger recalcule con el proxy
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}

export const MemoScrollAnimations = memo(ScrollAnimations);
