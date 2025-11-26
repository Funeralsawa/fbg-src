import React, { useState, useRef, useCallback, useEffect } from 'react';
import TypeWriter from './typeWriter';
import site from 'fbg-generated';

const Head = () => {
    const words = site.ui.typeWriterWords || ["welcome to fbg!"];

    const [textIndex, setTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState(words[0]);

    const textNum = site.ui.typeWriterWords.length;

    const ref = useRef(null);

    const onTypingEnd = useCallback(() => {
        setTextIndex((prevIndex) => (prevIndex + 1) % textNum);
    }, [words.length]);

    useEffect(() => {
        setCurrentText(site.ui.typeWriterWords[textIndex]);
    }, [textIndex]);

    const handleClick = () => {
        const el = ref.current;
        const rect = el.getBoundingClientRect();
        const offset = rect.bottom;

        window.scrollBy({
            top: offset,
            behavior: 'smooth',
        });
    };

    return (
        <React.Fragment>
            <div className="head" ref={ref}>
                <div className='head-overray'></div>

                <div className='head-text'>
                    <div className="title">
                        {`${site.site.title}`.split("").map((char, index) => (
                            <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                                {char}
                            </span>
                        ))}
                    </div>

                    <div className="subtitle">
                        <TypeWriter
                            texts={[currentText]}
                            speed={200}
                            pause={1500}
                            onTypingEnd={onTypingEnd}
                        />
                    </div>
                </div>

                <p className='float-arrow' onClick={handleClick}>
                    <i className="bi bi-caret-down"></i>
                </p>
            </div>
        </React.Fragment>
    );
};

export default Head;
