"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export default function BirthdayLetter({ onClose }: { onClose: () => void }) {

    return (
        <div
            onClick={onClose}
            className={`fixed p-2 inset-0 flex items-center justify-center bg-black/40 z-[10000] ${pacifico.className}`}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-fit h-fit bg-yellow-100 rounded-xl shadow-2xl overflow-hidden cursor-pointer transition-all duration-700"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose()
                }}
            >
                <div className="relative">
                    <img
                        className="w-full lg:w-[600px]" // tùy chỉnh chiều rộng phù hợp
                        src="/letter_layout.png"
                        alt="letter layout"
                    />
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] text-base text-center"
                    >
                        <p className="text-cyan-900 text-sm leading-relaxed bg-white rounded-2xl">
                            {process.env.NEXT_PUBLIC_CONTENT}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>

    );
}
