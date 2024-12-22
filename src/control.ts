import * as audio from "./audio";

export const playToggle = () => {
    if (audio.audio.isPlaying()) {
        audio.audio.pause();
    } else {
        audio.audio.play(0, 1, 0.1, 0);
    }
};

export const setup = () => {
    document.querySelector("canvas")!.addEventListener("click", () => {
        playToggle();
    });
};
