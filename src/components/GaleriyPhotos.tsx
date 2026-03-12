import { memo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

function GaleriyPhotos() {
  const images = [
    { id: 1, src: "/img/1.webp" },
    { id: 2, src: "/img/2.webp" },
    { id: 3, src: "/img/3.webp" },
    { id: 4, src: "/img/9.webp" },
    { id: 5, src: "/img/13.webp" },
    { id: 6, src: "/img/4.webp" },
    { id: 7, src: "/img/7.webp" },
    { id: 8, src: "/img/8.webp" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <section
      className="relative w-screen min-h-screen bg-[#45524c] text-white flex flex-col items-center p-10
    max-lg:px-6"
    >
      <h2 className="font-[extraCursive] text-9xl max-lg:text-6xl">Gallery</h2>
      <h3 className="text-5xl uppercase max-lg:text-3xl">Photos</h3>

      {/* Galería */}
      <div
        className="w-4/10 h-125 grid grid-cols-3 grid-rows-3 gap-2 mt-10
      max-lg:w-full animation-scroll"
      >
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => openModal(index)}
            className={`w-full h-full relative overflow-hidden  animate-on-scroll ${
              index === 1 ? "col-span-2" : ""
            }`}
          >
            <img
              className="w-full h-full object-cover object-center hover:scale-110 transition duration-300"
              src={img.src}
              alt={`Foto ${img.id}`}
              width={1000}
              height={1000}
            />
          </button>
        ))}
      </div>

      {/* Logo */}
      <img
        className="m-auto mt-4 max-lg:w-30.5 max-lg:h-30.5"
        src="/img/logo.webp"
        alt="logo"
        width={120}
        height={120}
      />

      {/* Modal con Swiper */}
      {isOpen && (
        <div className="fixed  inset-0 bg-black/80 flex items-center justify-center z-50 ">
          {/* Cerrar */}
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 text-white text-3xl z-50"
          >
            ✕
          </button>

          <div className="relative w-full flex items-center p-10">
            <button className="swiper-button-prev-custom absolute left-10 cursor-pointer z-10  max-lg:left-2">
              <IoIosArrowDropleftCircle className="text-[#45524c] text-3xl" />
            </button>
            <button className="swiper-button-next-custom absolute right-10 cursor-pointer z-10 max-lg:right-2">
              <IoIosArrowDroprightCircle className="text-[#45524c] text-3xl" />
            </button>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              className="h-[80vh]"
              spaceBetween={4}
              slidesPerView={1}
              initialSlide={currentIndex}
              autoplay
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
            >
              {images.map((img) => (
                <SwiperSlide
                  key={img.id}
                  className="flex items-center justify-center"
                >
                  <div className="relative  h-full w-full flex items-center justify-center">
                    <img
                      src={img.src}
                      alt={`Foto ${img.id}`}
                      width={500}
                      height={500}
                      className=" w-auto h-full "
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </section>
  );
}

export default memo(GaleriyPhotos);
