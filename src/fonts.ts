import p5 from "p5";

export let currentFont: p5.Font;

export let lyricFont: p5.Font;
export let rubyFont: p5.Font;

export const fontPreload = () => {
    lyricFont = p.loadFont("UDKakugo_LargePr6N-B.otf");
    rubyFont = p.loadFont("UDKakugo_SmallPr6N-R.otf");
};

export const setLyricFont = () => {
    currentFont = lyricFont;
    p.textFont(currentFont);
};

export const setRubyFont = () => {
    currentFont = rubyFont;
    p.textFont(currentFont);
};
