import { useEffect } from "react";
import site from "fbg-generated";

export default function ClickAnime() {
    const root = document.getElementById("global-effects");
    useEffect(() => {
        const handler = (e) => {
            const particleCount = site.ui.particleNum; // 每次点击生成的粒子数
            for (let i = 0; i < particleCount; i++) {
                const p = document.createElement("div");
                p.style.position = "fixed";
                p.style.width = "10px";
                p.style.height = "10px";
                p.style.borderRadius = "50%";
                p.style.pointerEvents = "none";
                p.style.left = e.clientX + "px";
                p.style.top = e.clientY + "px";
                p.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
                p.style.mixBlendMode = "screen";
                p.style.zIndex = "9999";

                // 随机方向和速度
                const angle = Math.random() * 2 * Math.PI;
                const distance = 60 + Math.random() * 60;
                const duration = 800 + Math.random() * 400; // 动画时间
                const scale = 0.2 + Math.random() * 0.8;

                p.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
                p.style.transform = "translate(0,0) scale(1)";
                p.style.opacity = "1";

                root.appendChild(p);

                // 强制浏览器触发一次布局，保证 transition 生效
                requestAnimationFrame(() => {
                    p.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(${scale})`;
                    p.style.opacity = "0";
                });

                // 动画结束后删除
                setTimeout(() => {
                    p.remove();
                }, duration);
            }
        };

        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    return null;
}
