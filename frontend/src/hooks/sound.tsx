
import { useCallback, useRef } from 'react';


const MOVE_SOUND = 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3';
const CAPTURE_SOUND = 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3';
const CHECK_SOUND = "https://images.chesscomfiles.com/chess-themes/sounds/_standard/move-check.mp3";
export function  useChessSound () {
  const moveAudio = useRef(new Audio(MOVE_SOUND));
  const captureAudio = useRef(new Audio(CAPTURE_SOUND));
  const checkAudio = useRef(new Audio(CHECK_SOUND));

  const playMove = useCallback(() => {
    moveAudio.current.currentTime = 0;
    moveAudio.current.play().catch(e => console.error("Audio play failed", e));
  }, []);

  const playCapture = useCallback(() => {
    captureAudio.current.currentTime = 0;
    captureAudio.current.play().catch(e => console.error("Audio play failed", e));
  }, []);

  const playCheck = useCallback(() => {
    checkAudio.current.currentTime = 0;
    checkAudio.current.play().catch(e => console.error("Audio play failed", e));
  }, []);

  return { playMove, playCapture, playCheck };
};
