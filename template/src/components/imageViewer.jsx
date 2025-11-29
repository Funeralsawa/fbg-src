import { useEffect, useRef, useState } from "react";

export default function ImageViewer({ images, index, onClose }) {
    const [current, setCurrent] = useState(index);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setDragging] = useState(false);
    const startPos = useRef({ x: 0, y: 0 });

    // 禁止滚动
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    // 左右切图
    const prev = () => {
        setScale(1);
        setOffset({ x: 0, y: 0 });
        setCurrent((c) => (c - 1 + images.length) % images.length);
    };

    const next = () => {
        setScale(1);
        setOffset({ x: 0, y: 0 });
        setCurrent((c) => (c + 1) % images.length);
    };

    // 键盘左右切换、ESC退出
    useEffect(() => {
        const key = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", key);
        return () => window.removeEventListener("keydown", key);
    }, []);

    // 鼠标拖拽
    const onMouseDown = (e) => {
        setDragging(true);
        startPos.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        setOffset({
            x: e.clientX - startPos.current.x,
            y: e.clientY - startPos.current.y,
        });
    };

    const onMouseUp = () => setDragging(false);

    // 滚轮缩放
    useEffect(() => {
        const overlay = document.querySelector(".iv-overlay");
        if (!overlay) return;

        const handleWheel = (e) => {
            e.preventDefault();
            let s = scale - e.deltaY * 0.001;
            s = Math.min(Math.max(s, 0.5), 5);
            setScale(s);
        };

        overlay.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            overlay.removeEventListener("wheel", handleWheel);
        };
    }, [scale]);

    // 双击复位
    const reset = () => {
        setScale(1);
        setOffset({ x: 0, y: 0 });
    };

    return (
        <div
            className="iv-overlay"
            onClick={onClose} 
        >
            <div className="iv-container" onClick={(e) => e.stopPropagation()}>
                <img
                    src={images[current]}
                    className="iv-img"
                    style={{
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    }}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    onDoubleClick={reset}
                    draggable="false"
                />

                <button className="iv-close" onClick={onClose}>×</button>
                <button className="iv-left" onClick={prev}>‹</button>
                <button className="iv-right" onClick={next}>›</button>
            </div>
        </div>
    );
}
