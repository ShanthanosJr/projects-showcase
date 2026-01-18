import { useEffect, useState, useRef } from "react";

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

export const useScrambleText = (text: string, speed = 30) => {
    const [displayText, setDisplayText] = useState(text);
    const iteration = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayText((_) =>
                text
                    .split("")
                    .map((_, index) => {
                        if (index < iteration.current) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration.current >= text.length) {
                clearInterval(interval);
            }

            iteration.current += 1 / 3;
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return displayText;
};
