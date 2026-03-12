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

// JSON array with story data
const storyData = [
  {
    img: "/img/ourStories/01.webp",
    icon: "/img/ourStories/A02.webp",
    title: "FIRST DATE",
    description: "July, 2012",
  },
  {
    img: "/img/ourStories/02.webp",
    icon: "/img/ourStories/A02.webp",
    title: "FIRST DODGERS  GAME",
    description: "Agust, 2012",
  },
  {
    img: "/img/ourStories/03.webp",
    icon: "/img/ourStories/A03.webp",
    title: "OUR FIRST VEGAS",
    description: "Our first Vegas trip Sept 2012",
  },
];

function OurStory() {
  return (
    <section className="relative w-screen h-dvh bg-[#45524c] pt-20 max-sm:py-10 max-lg:px-6 max-sm:h-auto">
      <div
        className="animation-scroll w-8/10 flex justify-end items-center text-[#8f8269] bg-[url(/img/hoja.webp)] bg-cover text-center p-4 space-y-2
        max-lg:m-auto max-lg:w-full max-lg:flex-col max-lg:h-auto"
      >
        <article className="w-4/10 max-lg:w-full">
          <h2 className="animate-on-scroll text-7xl max-lg:text-4xl">OUR</h2>
          <h3 className="animate-on-scroll font-[extraCursive] text-9xl max-lg:text-7xl">
            Story
          </h3>
        </article>
        <div
          className="w-6/10 pl-10 py-10 text-[#8f8269] text-center z-10
          max-lg:w-full max-lg:pl-0 max-lg:pt-0"
        >
          <div className="relative w-full flex items-center pb-4 max-lg:h-min">
            <button className="swiper-button-prev-custom absolute left-2 cursor-pointer z-10 max-lg:-left-2">
              <IoIosArrowDropleftCircle className="text-[#8f8269] text-3xl" />
            </button>
            <button className="swiper-button-next-custom absolute right-2 cursor-pointer z-10 max-lg:-right-2">
              <IoIosArrowDroprightCircle className="text-[#8f8269] text-3xl" />
            </button>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              className="animate-on-scroll w-full mt-10 max-lg:mt-2"
              spaceBetween={0}
              slidesPerView={1}
              autoplay
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
            >
              {storyData.map((item, index) => (
                <SwiperSlide key={index} className="w-full">
                  <div className="flex flex-col items-center justify-center gap-4 px-10 max-lg:px-6">
                    <img
                      className={`${index === 0 ? "rotate-90" : ""} w-62.5 h-62.5 rounded-sm shadow-md shadow-neutral-800 `}
                      src={item.img}
                      alt={item.title}
                      width={500}
                      height={500}
                    />
                    <img
                      className="w-20 h-20"
                      src={item.icon}
                      alt={item.title}
                      width={500}
                      height={500}
                    />
                    <h4 className="text-4xl max-lg:text-2xl">{item.title}</h4>
                    <p className="text-xl max-lg:text-lg">{item.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(OurStory);
