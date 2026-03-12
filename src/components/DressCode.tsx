import { memo } from "react";

function DressCode() {
  return (
    <section
      className="relative w-screen h-[80vh] flex bg-[#45524c] py-10 z-10 
      max-lg:h-auto
    "
    >
      <div
        className="animation-scroll w-10/12 h-full m-auto bg-[url(/img/hoja.webp)] bg-cover bg-repeat bg-center p-10 text-[#8f8269] text-center flex
      max-lg:flex-col
      "
      >
        <article className="w-full h-full flex flex-col items-center justify-center max-lg:w-full max-lg:h-auto ">
          <h2 className="animate-on-scroll text-8xl max-lg:text-6xl font-[extraCursive]">
            Dress
          </h2>
          <h3 className="animate-on-scroll text-5xl max-lg:text-3xl mt-2">
            Code
          </h3>
          <h4 className="animate-on-scroll mt-10 text-7xl max-lg:text-5xl font-[extraCursive]">
            Formal
          </h4>

          <div className="flex gap-10 mt-6 animate-on-scroll">
            <img
              className="w-20"
              src={"/icons/dress1.svg"}
              alt="men's outfit"
              width={500}
              height={500}
            />
            <img
              className="w-20"
              src={"/icons/dress2.svg"}
              alt="women's outfit"
              width={500}
              height={500}
            />
          </div>
        </article>
      </div>
    </section>
  );
}

export default memo(DressCode);
