import { memo } from "react";

function Phrase() {
  return (
    <section
      className="animation-scroll w-screen h-screen sticky top-0 p-10 text-white flex flex-col items-center font-[freeBold] 
      bg-[url(/img/5.webp)] bg-cover bg-no-repeat bg-bottom max-sm:bg-position-[40%]
      "
    >
      <h2 className="animate-on-scroll text-4xl max-lg:text-2xl">
        Many waters cannot
      </h2>
      <h3 className="animate-on-scroll font-[extraCursive] text-6xl max-lg:text-4xl">
        quench love
      </h3>
      <h4 className="animate-on-scroll text-4xl max-lg:text-2xl">
        Song of Solomon 8:7
      </h4>
    </section>
  );
}

export default memo(Phrase);
