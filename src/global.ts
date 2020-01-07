
export class clickPosition {
    _x: number;
    _y: number;

    _width: number;
    _height: number;

    left: boolean = true;

    constructor(x: number, y: number) {
        this._x = x + 10;
        this._y = y + 10;
    }

    get x(): string {
        return this._x.toString() + 'px';
    }

    get y(): string {
        return this._y.toString() + 'px';
    }

}

// 面板主体
export class PanelElements {
    [key: string]: HTMLDivElement | HTMLParagraphElement | HTMLButtonElement | HTMLUListElement | Array<HTMLLIElement>;

    panel: HTMLDivElement;

    title: HTMLDivElement;

    title_p: HTMLParagraphElement;

    cancel_btn: HTMLButtonElement;
    cancel_btn_second: HTMLButtonElement;

    detail_btn: HTMLButtonElement;

    body: HTMLDivElement;

    body_left: HTMLDivElement;

    body_right: HTMLDivElement;

    body_right_ul: HTMLUListElement;

    body_right_ul_li: Array<HTMLLIElement>;

    footer: HTMLDivElement;

    footer_btn: HTMLButtonElement;

    constructor() {
        /**
         * 抬头
         */
        this.title_p = document.createElement('p');
        this.cancel_btn = document.createElement('button');
        this.cancel_btn_second = document.createElement('button');
        this.detail_btn = document.createElement('button');
        this.title = document.createElement('div');
        this.title.append(this.title_p);
        this.title.append(this.detail_btn);
        this.title.append(this.cancel_btn);

        /**
         * 主体
         */
        this.body_right_ul_li = [];
        this.body_left = document.createElement('div');
        this.body_right_ul = document.createElement('ul');
        this.body_right = document.createElement('div');
        this.body = document.createElement('div');
        this.body_right.append(this.body_right_ul);
        this.body.append(this.body_left);
        this.body.append(this.body_right);

        /**
         * 结尾
         */
        this.footer_btn = document.createElement('button');
        this.footer = document.createElement('div');


        this.footer.append(this.cancel_btn_second, this.footer_btn);

        /**
         * 整体
         */
        this.panel = document.createElement('div');
        this.panel.append(this.title);
        this.panel.append(this.body);
        this.panel.append(this.footer);
    }
}
// 色块选择面板
export class ColorPanelElements {
    html: HTMLCanvasElement;
    canvas: CanvasRenderingContext2D;
    constructor() {
        this.html = document.createElement('canvas');
        this.canvas = this.html.getContext('2d');
    }

}
// 链接地址面板
export class UrlPanelElements {

    rootElement: HTMLDivElement;

    ulELement: HTMLUListElement;

    lis: Array<HTMLLIElement>;

    constructor() {
        this.rootElement = document.createElement('div');
        this.ulELement   = document.createElement('ul');
        this.lis         = [];
        this.rootElement.append(this.ulELement);
    }

    public addLis(urls : Array<urls>)
    {
        for (let i = 0; i < urls.length; i++) {
            const li = document.createElement('li');
            li.innerHTML = `<b>${urls[i].name}:</b>${urls[i].url}`
            this.lis.push(li);
            this.ulELement.append(li);
        }
    }
}

export interface panelLi {
    [key: string]: Function
}

export interface attrs {
    [key: string]: string
    name: string,
    type: string,
}

export type urls = {
    [key: string]: string
    name: string,
    url: string
}