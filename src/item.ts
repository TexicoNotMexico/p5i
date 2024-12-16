export default class Item {
    lyric: string;
    furigana: string;
    index: number;
    length: number;
    start: number;
    end: number;
    constructor(lyric: string, furigana: string, index: number, length: number, start: number, end: number) {
        this.lyric = lyric;
        this.furigana = furigana;
        this.index = index;
        this.length = length;
        this.start = start;
        this.end = end;
    }

    get pattern() {
        const patterns = [
            ["あ", "か", "が", "さ", "ざ", "た", "だ", "な", "は", "ば", "ぱ", "ま", "や", "ら", "わ"],
            ["い", "き", "ぎ", "し", "じ", "ち", "ぢ", "に", "ひ", "び", "ぴ", "み", "り"],
            ["う", "く", "ぐ", "す", "ず", "つ", "づ", "ぬ", "ふ", "ぶ", "ぷ", "む", "ゆ", "る"],
            ["え", "け", "げ", "せ", "ぜ", "て", "で", "ね", "へ", "べ", "ぺ", "め", "れ"],
            ["お", "こ", "ご", "そ", "ぞ", "と", "ど", "の", "ほ", "ぼ", "ぽ", "も", "よ", "ろ", "を"],
            ["ん", "っ"],
            ["ー"],
        ];
        return patterns.findIndex((pattern) => pattern.includes(this.furigana));
    }
}
