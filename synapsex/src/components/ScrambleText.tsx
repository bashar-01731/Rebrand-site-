import { useEffect, useState } from 'react';

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

const FRAME_MS = 25;
/** Frames spent scrambling before each successive character locks in. */
const FRAMES_PER_CHAR = 4;

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

/**
 * Hover-driven scramble: everything goes to noise, then resolves left to right.
 * Leaving the element snaps straight back to the original string.
 */
export default function ScrambleText({ text, isHovered, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    const interval = setInterval(() => {
      const revealed = Math.floor(frame / FRAMES_PER_CHAR);

      let output = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          output += ' ';
        } else if (i < revealed) {
          output += text[i];
        } else {
          output += randomChar();
        }
      }
      setDisplay(output);

      if (revealed >= text.length) {
        setDisplay(text);
        clearInterval(interval);
      }
      frame++;
    }, FRAME_MS);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span className={className}>{display}</span>;
}
