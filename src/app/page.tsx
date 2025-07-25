"use client";

import Cake from "@/components/cake";
import CountDown from "@/components/countDown";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState<"countdown" | "cake">("countdown");

  return (
    <>
      {step === "countdown" && <CountDown onFinish={() => setStep("cake")} />}
      {step === "cake" && (
        <div className="h-screen flex items-center justify-center bg-pink-100">
          {/* Bánh sinh nhật sẽ hiển thị ở đây */}
          <Cake />
        </div>
      )}
    </>
  );
}
