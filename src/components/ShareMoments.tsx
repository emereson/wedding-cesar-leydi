import { memo } from "react";
import { TbCameraHeart } from "react-icons/tb";

function ShareMoments() {
  return (
    <>
      <section
        className="relative w-screen h-dvh flex bg-[#45524c]  overflow-hidden max-sm:py-10
     max-lg:justify-end max-sm:h-auto"
      >
        <div
          className="animation-scroll w-4/10 h-full p-4 flex items-center z-10 
      max-lg:w-full max-lg:items-start  max-lg:h-auto"
        >
          <div className="animate-on-scroll w-full h-auto pb-10 text-[#45524c] bg-[url(/img/hoja.webp)] bg-cover bg-no-repeat bg-center text-center p-4 space-y-2">
            <h2 className="animate-on-scroll text-4xl max-lg:text-2xl">
              Share your best
            </h2>
            <h3 className="animate-on-scroll font-[extraCursive] text-8xl max-lg:text-6xl">
              Moments
            </h3>
            <TbCameraHeart className="hidden m-auto text-5xl max-lg:flex" />

            <img
              className="w-60 mx-auto rounded-2xl  max-sm:mt-4"
              src="/img/qr.jpeg"
              alt=""
            />
          </div>
        </div>
      </section>
      <div className="sticky top-0 left-0 w-screen h-dvh -mt-[100dvh] flex justify-end max-sm:mt-0 max-sm:h-[50vh]">
        <img
          className="w-6/10 h-full sticky top-0 max-sm:w-full max-sm:h-[50vh]"
          src="/img/8.webp"
          alt="Photo"
          width={1000}
          height={1000}
        />
      </div>
    </>
  );
}

export default memo(ShareMoments);
