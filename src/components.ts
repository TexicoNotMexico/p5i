import * as constants from "./constants";
import * as time from "./time";
import * as fonts from "./fonts";
import * as ease from "./ease";
import Item from "./item";

export const draw = (item: Item, idx: number, arr: Item[], offset: number) => {
    const lastElapsedTime = time.currentTime() * (constants.bpm / 60) - arr[arr.length - 1].start;
    const itemElapsedTime = time.currentTime() * (constants.bpm / 60) - item.start;

    if (arr.length - idx > 40) return;

    p.push();
    {
        p.translate(
            0,
            -p.lerp(
                arr.length - (idx + 1),
                arr.length - idx,
                ease.EasingFunctions.easeInOutQuad(
                    p.min(lastElapsedTime * (1 / p.min(arr[arr.length - 1].end, 1 / 3)), 1)
                )
            ) *
                (constants.canvasWidth / 12 / 4)
        );
        itemElapsedTime * 6 < 1 &&
            p.translate(
                0,
                -p.lerp(
                    arr.length - (idx + 3),
                    arr.length - (idx + 1),
                    ease.EasingFunctions.easeOutCubic(p.min(itemElapsedTime * 6, 1))
                ) *
                    (constants.canvasWidth / 12 / 4)
            );
        p.translate(
            -(constants.canvasWidth / 2) + (item.start % 4) * (constants.canvasWidth / 4),
            constants.canvasHeight / 3
        );
        p.translate(-(constants.canvasWidth * offset), 0);

        p.translate(
            0,
            p.sin((time.currentTime() * (constants.bpm / 60) + idx) * (p.PI / 2)) * (constants.canvasWidth / 12 / 8)
        );

        p.push();
        {
            p.rectMode(p.CORNERS);

            p.push();
            {
                /* p.fill(80);
                p.rect(
                    0,
                    -(constants.canvasWidth / 12),
                    (constants.canvasWidth / 4) *
                        ease.EasingFunctions.easeOutCubic(p.norm(p.min(itemElapsedTime, item.end), 0, item.end)) *
                        item.end,
                    constants.canvasWidth / 12
                ); */
            }
            p.pop();
        }
        p.pop();

        p.push();
        {
            if (item.pattern === 6 && idx !== 0) {
                p.translate(-((constants.canvasWidth / 4) * (1 / 3)), 0);
                const nobashibouDuration = item.end + 1 / 3;
                p.translate(
                    (constants.canvasWidth / 4) *
                        ease.EasingFunctions.easeOutCubic(
                            p.norm(p.min(itemElapsedTime, nobashibouDuration), 0, nobashibouDuration)
                        ) *
                        (nobashibouDuration - 1 / 3),
                    0
                );
            } else if (item.end > 1 / 3) {
                p.translate(
                    (constants.canvasWidth / 4) *
                        ease.EasingFunctions.easeOutCubic(p.norm(p.min(itemElapsedTime, item.end), 0, item.end)) *
                        (item.end - 1 / 3),
                    0
                );
            }

            p.textAlign(p.LEFT, p.CENTER);
            if (item.pattern === 6 && idx !== 0) {
                p.fill(constants.colors[arr[idx - 1].pattern]);
            } else {
                p.fill(constants.colors[item.pattern]);
            }

            // p.strokeWeight(3);
            // p.strokeCap(p.SQUARE);
            // p.drawingContext.setLineDash([8, 4]);
            // p.drawingContext.lineDashOffset = time.currentTime() * 24;
            // p.stroke(0);

            p.push();
            {
                fonts.setLyricFont();
                p.textSize(constants.canvasWidth / 12);
                p.beginClip();
                p.rectMode(p.CORNERS);
                p.rect(
                    0,
                    -(constants.canvasWidth / 12),
                    p.min(constants.canvasWidth / 12, (constants.canvasWidth / 4) * item.end),
                    constants.canvasWidth / 12
                );
                p.endClip();
                p.scale(p.min(1, item.end / (1 / 3)), 1);
                p.translate(-(item.index * (constants.canvasWidth / 12)), 0);
                p.scale(1 / item.lyric.length, 1);
                p.scale(item.length, 1);
                p.text(item.lyric, 0, 0);
            }
            p.pop();

            p.push();
            {
                fonts.setRubyFont();
                p.textSize(constants.canvasWidth / 12);
                p.translate(0, -(constants.canvasWidth / 12 / 2) - 20);
                p.scale(p.min(1, item.end / (1 / 3)), 1 / 3);
                p.scale(1 / item.furigana.length, 1);
                !/[\u3040-\u309F\u30A1-\u30F4\u30FC]/.test(item.lyric) && p.text(item.furigana, 0, 0);
            }
            p.pop();
        }
        p.pop();
    }
    p.pop();
};

export const filters = (item: Item, idx: number, arr: Item[]) => {
    if (arr.length - idx === 1) {
        if (item.pattern === 1) {
            p.filter(p.INVERT);
        }
    }
};
