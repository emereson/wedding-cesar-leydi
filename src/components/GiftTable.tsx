import { memo } from "react";

function GiftTable() {
  return (
    <section
      className="relative w-screen min-h-screen bg-[#45524c] flex overflow-hidden animation-scroll
 max-md:flex-col"
    >
      <div className="gitTable-section absolute top-0 left-0 w-screen h-screen max-md:h-[50vh] max-md:relative">
        <img
          src="/img/7.webp"
          alt="Photo"
          width={1920}
          height={1080}
          className="gitTable-image w-full h-full object-cover max-sm:object-[20%]"
        />
      </div>
      <div className="p-6 w-7/12 h-full m-auto py-10 max-md:w-full">
        <div
          className="animate-on-scroll w-full h-full m-auto mt-0 bg-[url(/img/hoja.webp)] bg-cover bg-no-repeat bg-center p-10 text-[#8f8269] text-center z-10
      max-lg:w-full max-sm:px-4 py-16"
        >
          <h2 className="animate-on-scroll font-[extraCursive] text-8xl max-lg:text-6xl">
            Gift
          </h2>
          <h3 className="animate-on-scroll text-4xl max-lg:text-2xl mt-3">
            TABLE
          </h3>
          <p className="animate-on-scroll text-xl mt-6 max-lg:text-base">
            If you wish to contribute to this new chapter of our lives, a cash
            or cash only would be greatly appreciated.
          </p>
        </div>
      </div>
    </section>
  );
}

export default memo(GiftTable);
