import { memo } from "react";

function Title() {
  return (
    <section
      className="relative w-screen h-screen  p-20 animation-scroll
    max-lg:pt-20 max-lg:px-6"
    >
      <div className=" absolute top-0 left-0 w-screen h-screen  animate-on-scroll   ">
        <img
          src="/img/1.webp"
          alt="Foto"
          width={1920}
          height={1080}
          className=" w-full h-full object-cover object-top max-sm:object-fill max-sm:object-[40%]  "
        />
      </div>
      <h1 className="relative animate-on-scroll  z-10 font-[extraCursive]  text-9xl text-white text-center max-lg:text-5xl">
        Cesar & Leydi
      </h1>
    </section>
  );
}

export default memo(Title);
