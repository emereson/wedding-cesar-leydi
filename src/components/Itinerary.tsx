import { memo } from "react";
import { FaArrowDownLong } from "react-icons/fa6";

function Itinerary() {
  const data = [
    { id: 1, title: "Welcome", houre: "3:00 PM", img: "/icons/mano.webp" },
    {
      id: 2,
      title: "Ceremony",
      houre: "3:30 PM",
      img: "/icons/ceremonia.svg",
    },
    {
      id: 3,
      title: "Cocktail",
      houre: "5:00 PM",
      img: "/icons/coctel.svg",
    },
    {
      id: 4,
      title: "Dinner",
      houre: "5:30 PM / 8:30 PM",
      img: "/icons/cena.svg",
    },
    {
      id: 5,
      title: "Dancing",
      houre: "9:00 PM",
      img: "/icons/baile.svg",
    },
  ];
  return (
    <>
      <section
        className="animation-scroll relative w-screen   h-225   overflow-hidden  z-10   py-10 px-4 
     "
      >
        <div className=" w-7/12  m-auto max-sm:w-full  max-sm:flex max-sm:items-center ">
          <div className=" animate-on-scroll  bg-[url(/img/hoja.webp)]   bg-fixed bg-cover bg-no-repeat bg-start pt-10 text-[#8f8269] text-center z-10 max-lg:w-full max-lg:pt-4 max-lg:mt-0 max-lg:px-0">
            <h2 className="animate-on-scroll font-[extraCursive] text-5xl max-lg:text-6xl ">
              Itinerary
            </h2>
            <div className="h-full flex  flex-col  items-center gap-6 py-10">
              {data.map((item) => (
                <article
                  key={item.id}
                  className="w-full  animate-on-scroll flex flex-col items-center  justify-center gap-2"
                >
                  <div className="w-137.5  m-auto relative grid grid-cols-3  items-center  gap-2 max-sm:w-75  max-sm:gap-0">
                    <h3 className=" font-[extraCursive] row-start-1 text-4xl max-lg:text-2xl text-end">
                      {item.title}
                    </h3>
                    <img
                      className="w-12.5 h-12.5 row-span-1 m-auto "
                      src={item.img}
                      alt="asas"
                      width={90}
                      height={90}
                    />

                    <p className="text-start text-xl max-sm:text-sm text-nowrap row-span-2">
                      {item.houre}
                    </p>
                  </div>
                  <span className="relative w-0.5 h-5.5 bg-[#45524c]" />
                </article>
              ))}
            </div>
            <div className="animate-on-scroll w-full p-4 bg-[#45524c]  text-white">
              <h3 className="text-center text-xl max-lg:text-lg  flex items-center justify-center gap-2">
                &quot; The ceremony will be held at the same venue &quot;
              </h3>
              <FaArrowDownLong className="m-auto mt-2 animate-bounce text-2xl" />
            </div>
          </div>
        </div>
      </section>
      <div className="sticky top-0 left-0 w-screen h-225 -mt-225  ">
        <img
          src="/img/5.webp"
          alt="Foto"
          width={1920}
          height={1080}
          className=" w-full  h-225  object-cover"
        />
      </div>
    </>
  );
}

export default memo(Itinerary);
