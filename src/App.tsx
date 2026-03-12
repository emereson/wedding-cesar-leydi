import { lazy, Suspense } from "react";
import Title from "./components/Title";
import Banner from "./components/Banner";

// Importaciones con Lazy Loading
const Chronometer = lazy(() => import("./components/Chronometer"));
const Mimbre = lazy(() => import("./components/Mimbre"));
const Blessing = lazy(() => import("./components/Blessing"));
const Itinerary = lazy(() => import("./components/Itinerary"));
const SuggestionH = lazy(() => import("./components/SuggestionH"));
const GiftTable = lazy(() => import("./components/GiftTable"));
const GaleriyPhotos = lazy(() => import("./components/GaleriyPhotos"));
const ShareMoments = lazy(() => import("./components/ShareMoments"));
const GoodWishes = lazy(() => import("./components/GoodWishes"));
const OurStory = lazy(() => import("./components/OurStory"));
const Contacts = lazy(() => import("./components/Contacts"));
const Phrase = lazy(() => import("./components/Phrase"));
const FormBoda = lazy(() => import("./components/FormBoda"));
const DressCode = lazy(() => import("./components/DressCode"));

import { FloatingAudioPlayer } from "./components/FloatingAudioPlayer/FloatingAudioPlayer";
import { MemoScrollAnimations } from "./utils/ScrollAnimations";
import Godparents from "./components/Godparents";

export default function Home() {
  return (
    <main className=" w-screen  overflow-x-hidden overflow-y-visible ">
      <Suspense
        fallback={
          <div className="h-screen bg-white flex items-center justify-center text-white">
            Loading...
          </div>
        }
      >
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

        <article className="  w-full p-8 bg-[#45524c]">
          <h2 className="  text-center font-[free] text-white text-4xl max-lg:text-2xl">
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
      </Suspense>
    </main>
  );
}
