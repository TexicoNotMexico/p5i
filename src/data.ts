import Item from "./item";

export let data: any;
export let items: Item[];

export const preload = () => {
    data = p.loadJSON("data.json");
};

export const setup = () => {
    items = data.notes.map((item: any) => {
        return new Item(item.lyric, item.furigana, item.index, item.length, item.start, item.end);
    });
};
