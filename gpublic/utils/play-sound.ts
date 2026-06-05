export type SoundSource = string | Blob | File;
export type SoundOptions = {
  volume?: number;
  loop?: boolean;
  playbackRate?: number;
};

export const playSound = async (
  sound: SoundSource,
  options: SoundOptions = {},
): Promise<HTMLAudioElement | null> => {
  if (typeof window === "undefined") return null;

  let src: string;
  src = typeof sound === "string" ? sound : URL.createObjectURL(sound);

  const audio = new Audio(src);

  if (options.volume !== undefined) audio.volume = options.volume;
  if (options.loop) audio.loop = options.loop;
  if (options.playbackRate) audio.playbackRate = options.playbackRate;

  try {
    await audio.play();
    return audio;
  } catch (err) {
    // autoplay might be blocked or file invalid
    console.warn("Audio playback failed:", err);
    return null;
  }
};
