import { memo } from "react";
import { FaWhatsapp } from "react-icons/fa";

function Contacts() {
  return (
    <>
      <div className="sticky top-0 left-0 w-screen h-[50vh] hidden max-sm:block">
        <img
          className="w-full h-[50vh]"
          src={"/img/10.webp"}
          alt="cover"
          width={1000}
          height={1000}
        />
      </div>
      <section className=" w-screen h-dvh flex bg-[#45524c] justify-end  max-md:h-auto  max-sm:py-10 ">
        <div
          className=" w-4/10  flex items-center animation-scroll
        max-sm:w-full max-sm:p-4"
        >
          <div
            className=" -left-10 bg-[url(/img/hoja.webp)] bg-cover bg-center p-10 text-[#8f8269] text-center space-y-4 z-10 animate-on-scroll
          max-sm:left-0 max-sm:w-full
        "
          >
            <h2 className="font-[extraCursive] text-7xl animate-on-scroll max-sm:text-5xl">
              Contacts
            </h2>

            <div className="w-full flex items-center justify-center gap-10">
              <article className="flex flex-col items-center animate-on-scroll">
                <img
                  className="m-auto h-30 w-30 max-sm:h-25 max-sm:w-25"
                  style={{ objectFit: "fill" }}
                  src="/icons/p1.png"
                  alt="Bride"
                  width={150}
                  height={150}
                />
                <a
                  href="https://wa.me/+16615927141"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp to LAURA GONZÁLEZ"
                  className="h-12.5 flex items-center gap-2 bg-[#8f8269] text-white text-2xl rounded-xl px-6
                  max-sm:text-xl
                "
                >
                  <FaWhatsapp />
                  Bride
                </a>
              </article>

              <article className="flex flex-col items-center animate-on-scroll">
                <img
                  className="m-auto h-30 w-30 max-sm:h-25 max-sm:w-25"
                  style={{ objectFit: "fill" }}
                  src="/icons/p2.png"
                  alt="Groom"
                  width={150}
                  height={150}
                />
                <a
                  href="https://wa.me/18185999064"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp to SANTOS"
                  className="h-12.5 flex items-center gap-2 bg-[#8f8269] text-white text-2xl rounded-xl px-6
                  max-sm:text-xl
                "
                >
                  <FaWhatsapp />
                  Groom
                </a>
              </article>
            </div>

            <p className="text-2xl mt-6 max-sm:text-xl">
              If in doubt, you can contact us!
            </p>
          </div>
        </div>
      </section>
      <div className="sticky top-0 left-0 w-screen h-dvh -mt-[100dvh] max-sm:h-[50vh] max-sm:hidden">
        <img
          className="w-6/10 h-dvh  max-sm:w-full max-sm:h-[50vh]"
          src={"/img/10.webp"}
          alt="cover"
          width={1000}
          height={1000}
        />
      </div>
    </>
  );
}

export default memo(Contacts);
