import type p5 from "p5";

export let camera: p5.Camera;

export const setup = () => {
    camera = p.createCamera();
};
