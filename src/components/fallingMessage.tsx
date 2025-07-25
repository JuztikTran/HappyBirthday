"use client";

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

export const FallingMessage = () => {
    const [messages, setMessages] = useState<
        { text: string; top: string; left: string }[]
    >([]);

    const birthdateMessages = [
        "Chúc mừng sinh nhật! 🎂",
        "Tuổi mới vui vẻ, luôn tươi cười nhé!",
        "Chúc bạn đạt được mọi điều mong ước!",
        "Happy Birthday to you! 💐",
        "Mãi luôn hạnh phúc và thành công!",
        "Thêm tuổi mới, thêm nhiều trải nghiệm đẹp!",
        "Chúc mừng sinh nhật! 🎂",
        "Tuổi mới vui vẻ, luôn tươi cười nhé!",
        "Chúc bạn đạt được mọi điều mong ước!",
        "Happy Birthday to you! 💐",
        "Mãi luôn hạnh phúc và thành công!",
        "Thêm tuổi mới, thêm nhiều trải nghiệm đẹp!",
    ];

    useEffect(() => {
        // Shuffle và gán vị trí ngẫu nhiên
        const shuffled = [...birthdateMessages]
            .sort(() => Math.random() - 0.5)
            .map((msg) => {
                const top = Math.random() * 50;
                const left = Math.random() * 50;
                return {
                    text: msg,
                    top: `${top}%`,
                    left: `${left}%`,
                };
            });
        setMessages(shuffled);
    }, []);

    return (
        <div className="fixed inset-0 z-[0] overflow-hidden">
            {/* Các dòng lời chúc */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                {messages.map((msg, idx) => (
                    <motion.p
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: [0, 0.7, 0], y: [20, 0, -30] }}
                        transition={{ duration: 5, delay: idx * 2, repeat: Infinity }}
                        // animate={{ opacity: 1, y: 0 }}
                        // transition={{ delay: idx * 1, duration: 1 }}
                        className="absolute text-sm lg:text-base font-light text-center text-pink-100 drop-shadow-lg bg-pink-400 rounded-2xl p-1"
                        style={{
                            top: msg.top,
                            left: msg.left,
                            transform: "translate(-50%, -50%)",
                            pointerEvents: "none",
                        }}
                    >
                        {msg.text}
                    </motion.p>
                ))}
            </div>
        </div>
    );
}
