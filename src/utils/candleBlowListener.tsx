"use client";

import { useEffect, useRef, useState } from "react";

export default function CandleListener({ onBlow }: { onBlow: () => void }) {
  const [listening, setListening] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    let stream: MediaStream;

    const init = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;

        source.connect(analyser);

        // Hàm detect "thổi"
        const detect = () => {
          if (!analyserRef.current || !dataArrayRef.current) return;

          analyserRef.current.getByteFrequencyData(dataArray);
          const avg = dataArrayRef.current.reduce((acc, val) => acc + val, 0) / bufferLength;

          const threshold = 45;
          if (avg > threshold && avg < 75 && listening) {
            setListening(false);
            onBlow(); // Gọi callback khi phát hiện "thổi"
          }
        };

        const interval = setInterval(detect, 100);
        return () => clearInterval(interval);
      } catch (err) {
        console.error("Lỗi truy cập micro:", err);
      }
    };

    init();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      setListening(false);
    };
  }, [onBlow, listening]);

  return null; // Component không render gì, chỉ chạy ngầm
}
