"use client";

import React, { useEffect, useState } from 'react'

const targetDate = new Date(process.env.NEXT_PUBLIC_TARGET_DATE ?? "2025-07-29T00:00:00");
// const targetDate = new Date("2025-07-25T14:27:00");

const CountDown = ({
    onFinish
}: {
    onFinish: () => void
}) => {
    const [timeLeft, setTimeLeft] = useState<string>("");

    useEffect(() => {
        const counter = setInterval(() => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                clearInterval(counter);
                onFinish();
                return;
            }

            const totalSeconds = Math.floor(diff / 1000);
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            if (totalSeconds <= 60)
                setTimeLeft(`${totalSeconds}`);
            else
                setTimeLeft(
                    `${hours.toString().padStart(2, "0")}:${minutes
                        .toString()
                        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
                );
        }, 1000);

        return () => clearInterval(counter);
    }, [onFinish]);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 to-yellow-200 text-center">
            <h1 className="text-4xl md:text-6xl text-cyan-800 font-bold mb-4 flex items-center justify-center gap-2 drop-shadow-lg">
                <span>🎉</span>
                <span>Countdown to birthday</span>
                <span>🎉</span>
            </h1>
            <p className="text-2xl md:text-4xl text-blue-950 font-mono tracking-widest bg-white/50 px-6 py-3 rounded-xl shadow-lg">
                {timeLeft}
            </p>
            <p className="mt-4 text-sm text-gray-700">Countdown to 0h {targetDate.getDate()}/{targetDate.getMonth() + 1}/{targetDate.getFullYear()}</p>
        </div>
    )
}

export default CountDown