"use client";

import Cake from "@/components/cake";
import CountDown from "@/components/countDown";
import PlaySong from "@/components/playSong";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState<"countdown" | "cake">("countdown");
  const [start, setStart] = useState(false);

  return (
    <>
      {step === "countdown" && <CountDown onFinish={() => setStep("cake")} />}
      {step === "cake" && (
        <>
          {
            start ? (<div className="h-screen flex items-center justify-center bg-pink-100">
              {/* Bánh sinh nhật sẽ hiển thị ở đây */}
              <Cake />
              <PlaySong />
            </div>) : (
              <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 to-yellow-200 text-center">
                <button
                  onClick={() => setStart(true)}
                  className="py-3 px-6 rounded-full text-white text-2xl font-semibold shadow-lg bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 hover:scale-105 hover:brightness-110 transition-all duration-300"
                >
                  🎂Start Birthday Party 
                </button>
              </div>
            )
          }
        </>
      )}
    </>
  );
}
