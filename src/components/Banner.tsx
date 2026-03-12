export default function Banner() {
  return (
    <>
      <article className="relative z-10 w-full p-8 bg-[#45524c] animate-scroll ">
        <h2 className="animate-on-scroll text-center font-[free] text-white text-4xl max-lg:text-2xl">
          Our love is the greatest adventure
        </h2>
      </article>
      <div className="sticky top-0 left-0 w-screen h-screen animate-on-scroll">
        <img
          src="/img/2.webp"
          alt="Banner"
          className="  h-screen w-screen object-cover object-center max-sm: max-sm:object-[55%] "
        />
      </div>
    </>
  );
}
