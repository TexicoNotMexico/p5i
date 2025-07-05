import type p5 from "p5";

export let audio: p5.SoundFile;

export const preload = () => {
    audio = p.loadSound("ihanaifull.wav");
};
