"use client";

import React, { useEffect, useRef } from 'react'

const PlaySong = () => {

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch((err) => {
                console.warn("Cần cho phép âm tahnh để có thể phát nhạc.", err);
            });
        }
    }, []);

        return (
        <>
            {/* Audio chạy ẩn */}
            <audio ref={audioRef} src="/Synthesia-Romantic-Happy-Birthday.m4a" loop />
        </>
    );
}

export default PlaySong