import { useEffect, useMemo, useState, memo, type JSX } from "react";
import { BsCalendarHeartFill } from "react-icons/bs";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeBoxProps {
  label: string;
  value: number;
}

function Chronometer(): JSX.Element {
  const targetDate = useMemo(() => new Date("2026-05-30T16:00:00"), []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // 1. Extraemos el cálculo a una función para poder llamarla inmediatamente
    const calculateTime = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return true; // Bandera para saber que ya terminó
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
      return false; // Aún no termina
    };

    // 2. La llamamos INMEDIATAMENTE para evitar el "00:00:00" de 1 segundo
    const isFinished = calculateTime();

    // 3. Si ya pasó la fecha, ni siquiera iniciamos el intervalo
    if (isFinished) return;

    // 4. Tipado seguro para la web
    const timer: ReturnType<typeof setInterval> = setInterval(
      calculateTime,
      1000,
    );

    return () => clearInterval(timer);
  }, [targetDate]);

  const formattedDate: string = (() => {
    const day = targetDate.getDate().toString().padStart(2, "0");
    const month = targetDate
      .toLocaleString("en-US", { month: "long" })
      .toUpperCase();
    const year = targetDate.getFullYear();

    return `${day} ${month} ${year}`;
  })();

  return (
    <>
      <section className="relative  z-10 w-screen h-dvh font-[freeBold] animation-scroll">
        <div className="absolute w-full top-0 z-10 px-10 pt-20 flex flex-col items-center justify-start max-lg:px-4 max-sm:pt-32">
          <h2 className="text-4xl text-white animate-on-scroll max-lg:text-3xl">
            {formattedDate}
          </h2>

          <div className="flex gap-4 mt-4 font-bold animate-on-scroll z-10">
            <TimeBox label="Days" value={timeLeft.days} />
            <TimeBox label="Hrs" value={timeLeft.hours} />
            <TimeBox label="Mins" value={timeLeft.minutes} />
            <TimeBox label="Secs" value={timeLeft.seconds} />
          </div>

          <a
            href="/evento.ics"
            download="evento.ics"
            className="animate-on-scroll mt-6 flex items-center gap-2 border border-[#45524c] text-[#ffffff] px-4 py-2 hover:bg-[#45524c] hover:text-white cursor-pointer transition"
          >
            <span role="img" aria-label="calendar">
              <BsCalendarHeartFill />
            </span>
            Add to Calendar
          </a>
        </div>
      </section>
      <div className="-mt-[100dvh] sticky top-0 left-0 w-screen min-h-dvh">
        <img
          src="/img/3.webp"
          alt="Photo"
          width={1920}
          height={1080}
          className=" w-full h-dvh object-cover max-sm:object-[40%]"
        />
      </div>
    </>
  );
}

// 🟢 CORRECCIÓN DE TYPESCRIPT AQUÍ: JSX.Element en lugar de Element
function TimeBox({ label, value }: TimeBoxProps): JSX.Element {
  return (
    <div className="bg-[#45524c] text-white px-6 py-4 text-center max-lg:px-4 max-lg:py-3">
      <div className="text-3xl font-bold max-lg:text-xl">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-lg max-lg:text-base">{label}</div>
    </div>
  );
}

export default memo(Chronometer);
