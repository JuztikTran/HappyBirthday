"use client";

import { useEffect } from "react";
import { Fireworks } from "fireworks-js";

export default function Firework() {
    useEffect(() => {
        const positions = [
            { top: "0px", left: "0px" },
            { top: "0px", right: "0px" },
            { bottom: "0px", left: "0px" },
            { bottom: "0px", right: "0px" },
        ];

        const containers: HTMLDivElement[] = [];
        const instances: Fireworks[] = [];

        positions.forEach((pos) => {
            const container = document.createElement("div");
            Object.assign(container.style, {
                position: "fixed",
                width: "225px",
                height: "225px",
                zIndex: "9999",
                pointerEvents: "none",
                ...pos,
            });

            document.body.appendChild(container);
            containers.push(container);

            const fireworks = new Fireworks(container, {
                hue: { min: 0, max: 360 },
                delay: { min: 200, max: 600 }, // tạo nhịp bắn
                rocketsPoint: { min: 50, max: 50 }, // kiểu đúng là object min-max
                // speed: 2,
                acceleration: 1.05,
                friction: 0.97,
                gravity: 1.2,
                particles: 50,
                explosion: 3,
                intensity: 20,
                flickering: 50,
                lineStyle: "round",
                autoresize: true,
            });

            fireworks.start();
            instances.push(fireworks);
        });

        return () => {
            instances.forEach((fw) => fw.stop());
            containers.forEach((el) => el.remove());
        };
    }, []);

    return null;
}
