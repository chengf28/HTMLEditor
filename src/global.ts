
export class clickPosition {
    _x: number;
    _y: number;

    _width: number;
    _height: number;

    left: boolean = true;

    constructor(x: number, y: number, w: number, h: number) {
        this._x = x + 10;
        this._y = y + 10;
        this._width = w;
        this._height = h;
    }

    get x(): string {

        if (this.left) {
            return this._x.toString() + 'px';
        }

        console.log(this._x - this._width);
        return (this._x - this._width > 0 ? this._x - this._width : 10).toString() + 'px';
    }

    get y(): string {
        return this._y.toString() + 'px';
    }

    get width(): string {
        return this._width.toString() + 'px';
    }

    get height(): string {
        return this._height.toString() + 'px';
    }


}

export class PanelElements {
    [key: string]: HTMLDivElement | HTMLParagraphElement | HTMLButtonElement | HTMLUListElement | Array<HTMLLIElement>;

    panel: HTMLDivElement;

    title: HTMLDivElement;

    title_p: HTMLParagraphElement;

    cancel_btn: HTMLButtonElement;

    detail_btn: HTMLButtonElement;

    body: HTMLDivElement;

    body_left: HTMLDivElement;

    body_right: HTMLDivElement;

    body_right_ul: HTMLUListElement;

    body_right_ul_li: Array<HTMLLIElement>;

    constructor() {
        this.body_right_ul_li = [];
        this.title_p = document.createElement('p');
        this.cancel_btn = document.createElement('button');
        this.detail_btn = document.createElement('button');
        this.title = document.createElement('div');
        this.title.append(this.title_p);
        this.title.append(this.detail_btn);
        this.title.append(this.cancel_btn);
        this.body_left = document.createElement('div');
        this.body_right_ul = document.createElement('ul');
        this.body_right = document.createElement('div');
        this.body_right.append(this.body_right_ul);
        this.body = document.createElement('div');
        this.body.append(this.body_left);
        this.body.append(this.body_right);
        this.panel = document.createElement('div');
        this.panel.append(this.title);
        this.panel.append(this.body);
    }
}
export interface panelLi {
    [key: string]: Function
}