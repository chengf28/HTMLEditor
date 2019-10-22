import './clickbox.scss';
import { clickPosition } from './global';
import Clickdom from './clickdom';

export default class ClickBox {

    private box:HTMLDivElement;

    static readonly className = 'clickdom';

    private titleBtn:HTMLButtonElement;

    getTitleBtn(){
        return this.titleBtn;
    }
    

    /**
     * 设置盒子
     * @param position ClickPosition
     */
    setBox(position: clickPosition):ClickBox
    {
        let box            = document.createElement('div');
        box.style.width    = position.width;
        box.style.position = 'absolute';
        box.style.left     = position.x;
        box.style.top      = position.y;
        box.classList.add('clickdom-box');
        document.body.appendChild(box);
        this.box = box;
        return this;
    }

    public static getClassName(name:string = null)
    {
        if (name) {
            return `${this.className}-${name}`;
        }
        return this.className;
    }

    /**
     * 
     * @param delay 显示盒子
     */
    show(delay:number)
    {
        if (this.box) {
            setTimeout(() => {
                this.box.classList.add(ClickBox.getClassName('show'));
            }, delay);
        }
    }

    /**
     * 关闭窗口
     */
    close() {
        if (this.box) {
            this.box.remove();
        }
    }

    /**
     * 隐藏窗口
     * @param delay number
     */
    hide(delay:number)
    {
        if (this.box) {
            setTimeout(() => {
                this.box.classList.remove(ClickBox.getClassName('show'));
            }, delay);
        }
    }


    /**
     * 设置标题
     * @param text string
     */
    setTitle(text:string):ClickBox
    {
        if (this.box) {
            let boxtitle    = document.createElement('div');
            boxtitle.id     = ClickBox.getClassName('title');
            let p           = document.createElement('p');
            p.textContent   = text;
            let btn         = document.createElement('button');
            btn.classList.add(ClickBox.getClassName('btn'));
            btn.textContent = 'x';
            this.titleBtn   = btn;
            boxtitle.append(p);
            boxtitle.append(btn);
            this.box.append(boxtitle);
        }
        return this;
    }

    /**
     * 设置内容
     * @param text string
     */
    setContent(text:string):ClickBox
    {
        console.log(text);
        if (this.box) {
            let div = document.createElement('div');
            div.textContent = text.trim();
            div.id = ClickBox.getClassName('body');
            // div.contentEditable = 'true';
            this.box.append(div);
        }
        return this;
    }

    
}