import { useEffect, useRef, useState } from 'react';

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

const FRAME_MS = 25;
/** Characters resolved per frame. */
const REVEAL_RATE = 0.5;
/** How far ahead of the reveal cursor random characters keep churning. */
const NOISE_AHEAD = 3;

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

interface ScrambleInProps {
  text: string;
  /** Milliseconds to wait after `triggered` flips before the reveal starts. */
  delay: number;
  triggered: boolean;
}

/**
 * Entrance reveal: characters resolve left to right out of a band of noise.
 */
export default function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);
  const textRef = useRef(text);
  textRef.current = text;

  useEffect(() => {
    if (!triggered) return;

    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      setStarted(true);
      let revealed = 0;

      interval = setInterval(() => {
        revealed += REVEAL_RATE;
        const cursor = Math.floor(revealed);
        const source = textRef.current;

        let output = '';
        for (let i = 0; i < source.length; i++) {
          if (source[i] === ' ') {
            output += ' ';
          } else if (i < cursor) {
            output += source[i];
          } else if (i < cursor + NOISE_AHEAD) {
            output += randomChar();
          }
        }
        setDisplay(output);

        if (cursor >= source.length) {
          setDisplay(source);
          if (interval) clearInterval(interval);
        }
      }, FRAME_MS);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [triggered, delay]);

  if (!started) return <>&nbsp;</>;

  return <>{display}</>;
}
