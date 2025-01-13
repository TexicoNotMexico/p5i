import * as constants from "./constants";
import * as fonts from "./fonts";
import * as audio from "./audio";
import * as control from "./control";
import * as time from "./time";
import * as data from "./data";
import * as camera from "./camera";
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
    camera.setup();

    fonts.setLyricFont();

    resize();
};

export const draw = () => {
    if (p.keyIsDown(87)) {
        camera.camera.move(0, 0, -10);
    }
    if (p.keyIsDown(83)) {
        camera.camera.move(0, 0, 10);
    }
    if (p.keyIsDown(65)) {
        camera.camera.move(-10, 0, 0);
    }
    if (p.keyIsDown(68)) {
        camera.camera.move(10, 0, 0);
    }
    if (p.keyIsDown(32)) {
        camera.camera.eyeY -= 10;
        camera.camera.centerY -= 10;
    }
    if (p.keyIsDown(16)) {
        camera.camera.eyeY += 10;
        camera.camera.centerY += 10;
    }

    if (p.keyIsDown(37)) {
        camera.camera.pan(0.05);
    } else if (p.keyIsDown(38)) {
        camera.camera.tilt(-0.05);
    } else if (p.keyIsDown(39)) {
        camera.camera.pan(-0.05);
    } else if (p.keyIsDown(40)) {
        camera.camera.tilt(0.05);
    }

    camera.camera.move(0, 0, 0);

    p.background(255);

    // p.push();
    // {
    //     p.fill(0);
    //     p.textAlign(p.CENTER, p.CENTER);
    //     p.textSize(50);
    //     p.text(`${p.floor(time.currentTime() * (constants.bpm / 60))}`, 0, -300);
    // }
    // p.pop();

    const filteredItems = data.items.filter((item) => {
        return time.currentTime() >= item.start * (60 / constants.bpm);
    });

    filteredItems.forEach((item, idx, arr) => {
        components.draw(item, idx, arr, 0);
        if ((item.start % 4) + item.end > 4.00001) {
            components.draw(item, idx, arr, p.floor((item.start % 4) + item.end) / 4);
        }
        components.filters(item, idx, arr);
    });
};
