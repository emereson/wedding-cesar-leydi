import { Suspense } from "react";
// Los primeros componentes se dejan normales para que carguen rápido al inicio (LCP)
import Title from "./components/Title";
import Banner from "./components/Banner";

import { FloatingAudioPlayer } from "./components/FloatingAudioPlayer/FloatingAudioPlayer";
import { MemoScrollAnimations } from "./utils/ScrollAnimations";
import Godparents from "./components/Godparents";
import Chronometer from "./components/Chronometer";
import Blessing from "./components/Blessing";
import Itinerary from "./components/Itinerary";
import DressCode from "./components/DressCode";
import Mimbre from "./components/Mimbre";
import SuggestionH from "./components/SuggestionH";
import GiftTable from "./components/GiftTable";
import GaleriyPhotos from "./components/GaleriyPhotos";
import ShareMoments from "./components/ShareMoments";
import GoodWishes from "./components/GoodWishes";
import OurStory from "./components/OurStory";
import Contacts from "./components/Contacts";
import Phrase from "./components/Phrase";
import FormBoda from "./components/FormBoda";

export default function Home() {
  return (
    <>
      <div className="fixed top-4 right-4 z-50 text-white flex rounded-sm shadow-md">
        <a
          className="p-1 px-2 opacity-90 bg-[#45524c] hover:bg-[#9a8262]"
          href="URL_ES"
        >
          ES
        </a>
        <a
          className="border-l p-1 px-2 bg-[#45524c] hover:bg-[#9a8262]"
          href="URL_EN"
        >
          En
        </a>
      </div>

      <FloatingAudioPlayer audioSrc="/love.mp3" />
      <MemoScrollAnimations />

      <Title />

      <article className="relative z-10 w-full p-8 bg-[#45524c] animate-scroll ">
        <h2 className="animate-on-scroll  text-center font-[free] text-white text-4xl max-lg:text-2xl">
          Our love is the greatest adventure
        </h2>
      </article>

      <Banner />

      <Chronometer />
      <Blessing />
      <Godparents />

      <Itinerary />
      <DressCode />
      <Mimbre />
      <SuggestionH />
      <GiftTable />
      <GaleriyPhotos />
      <ShareMoments />
      <GoodWishes />
      <OurStory />
      <Contacts />
      <Phrase />
      <FormBoda />
    </>
  );
}
