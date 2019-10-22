
export class clickPosition {
    _x: number;
    _y: number;

    _width:number;
    _height:number;

    constructor(x: number, y: number, w: number, h: number) {
        this._x = x+10;
        this._y = y+10;
        this._width = w;
        this._height = h;
    }

    get x(): string {
        return this._x.toString() + 'px';
    }

    get y(): string {
        return this._y.toString() + 'px';
    }

    get width():string
    {
        return this._width.toString() + 'px';
    }

    get height():string
    {
        return this._height.toString() + 'px';
    }
}