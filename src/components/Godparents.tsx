import { Swiper, SwiperSlide } from "swiper/react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { memo } from "react";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";

interface GodparentSlide {
  title: string;
  icon: string;
  names: string[];
}

const godparentsData: GodparentSlide[] = [
  {
    title: "Veil Ceremony",
    icon: "/icons/mano.webp",
    names: ["Gaby Zuñiga", "Ruben Curiel"],
  },
  {
    title: "Rings",
    icon: "/icons/anillos.svg",
    names: ["Nadya Curiel", "José López"],
  },
  {
    title: "Unity Coins",
    icon: "/icons/arras.svg",
    names: ["Kathya Curiel", "Ricardo Limon"],
  },
  {
    title: "Wedding Lasso",
    icon: "/icons/lazo.svg",
    names: ["Reyna", "Miguel del Toro"],
  },
  {
    title: "Bible",
    icon: "/icons/mano.webp",
    names: ["Lulu Zuñiga"],
  },
  {
    title: "Rosary",
    icon: "/icons/mano.webp",
    names: ["Carmen Mondragon"],
  },
  {
    title: "Bouquet",
    icon: "/icons/mano.webp",
    names: ["Maricela Olvera"],
  },
];

function Godparents() {
  return (
    <>
      <div className="sticky top-0 left-0 w-screen min-h-screen  flex  justify-start">
        <img
          className=" w-6/10 h-screen max-lg:w-full object-cover object-top-right"
          src="/img/8.webp"
          alt="sasas"
          width={1000}
          height={1000}
        />
      </div>

      <section className="relative -mt-[100vh]  w-screen min-h-screen  flex justify-end overflow-hidden max-lg:h-auto">
        <div className=" animation-scroll bg-[#45524c] relative w-4/10 flex items-center justify-start max-lg:w-full max-lg:px-6 ">
          <div
            className="animate-on-scroll  -ml-20 w-97.5 h-122.5 bg-[url(/img/hoja.webp)] bg-fixed bg-cover bg-no-repeat bg-center py-10 text-[#45524c] text-center z-10
        max-lg:ml-0 max-lg:w-full max-lg:-mt-10 max-lg:h-auto
         "
          >
            <h2 className="animate-on-scroll font-[extraCursive] text-7xl max-lg:text-5xl">
              Sponsors
            </h2>

            <div className="relative w-full flex items-center">
              <button className="swiper-button-prev-custom absolute left-2 cursor-pointer z-10 ">
                <IoIosArrowDropleftCircle className="text-[#45524c] text-3xl" />
              </button>
              <button className="swiper-button-next-custom absolute right-2 cursor-pointer z-10">
                <IoIosArrowDroprightCircle className="text-[#45524c] text-3xl" />
              </button>

              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                className="animate-on-scroll w-full mt-10"
                spaceBetween={0}
                slidesPerView={1}
                autoplay
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
              >
                {godparentsData.map((slide, index) => (
                  <SwiperSlide key={index} className="w-full cursor-pointer">
                    <div className="flex flex-col items-center justify-center">
                      <img
                        className="m-auto"
                        src={slide.icon}
                        alt={slide.title}
                        width={100}
                        height={100}
                      />
                      <h3 className="font-[extraCursive] text-6xl mt-6 max-lg:text-4xl">
                        {slide.title}
                      </h3>
                      <ul className="text-xl mt-4">
                        {slide.names.map((name, idx) => (
                          <li key={idx}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(Godparents);
