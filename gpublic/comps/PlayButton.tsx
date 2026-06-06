"use client";
import { type SoundSource, type SoundOptions, playSound } from "../utils";
import { useState, type PropsWithChildren } from "react";
import { Button } from "./Button";

type Props = {
  src: SoundSource;
  className?: string;
  option?: SoundOptions;
} & PropsWithChildren;

export function PlayButton({ src, children = "Play", className }: Props) {
  const [playing, setPlaying] = useState(false);

  const handleClick = async () => {
    setPlaying(true);

    const audio = await playSound(src);
    // const audio = await playSound(src);

    if (audio) {
      audio.onended = () => setPlaying(false);
    } else {
      setPlaying(false);
    }
  };
  return (
    <Button onClick={handleClick} loading={playing} className={className}>
      {children}
    </Button>
  );
}
