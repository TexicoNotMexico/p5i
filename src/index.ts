import * as constants from "./constants";
import * as fonts from "./fonts";
import * as audio from "./audio";
import * as control from "./control";
import * as time from "./time";
import * as data from "./data";
import * as components from "./components";

export const preload = () => {
    fonts.fontPreload();
    audio.preload();
    data.preload();
};

export const resize = () => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    canvas.style.position = "absolute";
    canvas.style.top = "50%";
    canvas.style.left = "50%";
    const scale = Math.min(window.innerWidth / constants.canvasWidth, window.innerHeight / constants.canvasHeight);
    canvas.style.transform = `translate(-50%, -50%) scale(${scale})`;
};

export const setup = () => {
    p.createCanvas(constants.canvasWidth, constants.canvasHeight, p.WEBGL);
    p.pixelDensity(1);
    p.noSmooth();
    p.frameRate(constants.framerate);

    data.setup();
    control.setup();

    fonts.setLyricFont();

    resize();
};

export const draw = () => {
    p.background(255);

    // p.push();
    // {
    //     p.fill(0);
    //     p.textAlign(p.CENTER, p.CENTER);
    //     p.textSize(50);
    //     p.text(`${p.floor(time.currentTime() * (constants.bpm / 60))}`, 0, -300);
    // }
    // p.pop();

    data.items
        .filter((item) => {
            const beatDuration = 60 / constants.bpm;
            return time.currentTime() >= item.start * beatDuration;
        })
        .forEach((item, idx, arr) => {
            components.draw(item, idx, arr, 0);
            if ((item.start % 4) + item.end > 4.00001) {
                components.draw(item, idx, arr, p.floor((item.start % 4) + item.end) / 4);
            }
            components.filters(item, idx, arr);
        });
};
