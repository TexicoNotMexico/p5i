import p5 from "p5";

export let currentFont: p5.Font;

export let lyricFont: p5.Font;
export let rubyFont: p5.Font;

export const fontPreload = () => {
    lyricFont = p.loadFont("NotoSansJP-Bold.otf"); // p.loadFont("TenMinchoAntique-Medium.otf");
    rubyFont = p.loadFont("NotoSansJP-Medium.otf"); // p.loadFont("TenMinchoAntique-Light.otf");
};

export const setLyricFont = () => {
    currentFont = lyricFont;
    p.textFont(currentFont);
};

export const setRubyFont = () => {
    currentFont = rubyFont;
    p.textFont(currentFont);
};
