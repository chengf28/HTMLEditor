import './EditorPanel.scss';
import { clickPosition, PanelElements, panelLi } from './global';
import Clickdom from './HTMLEditor';

export default class EditorPanel {

    private elements: PanelElements

    static readonly className = 'htmleditor';

    public static getClassName(name: string = null) {
        if (name) {
            return `${this.className}-${name}`;
        }
        return this.className;
    }

    constructor() {
        this.elements = new PanelElements;
        this.initCss();
    }

    private initCss() {
        this.elements.title.id      = EditorPanel.getClassName('title');
        this.elements.cancel_btn.classList.add(EditorPanel.getClassName('btn'));
        this.elements.cancel_btn.id  = 'cancel-btn';
        this.elements.detail_btn.classList.add(EditorPanel.getClassName('btn'));
        this.elements.body.id       = EditorPanel.getClassName('body');
        this.elements.body_left.id  = 'body-left';
        this.elements.body_right.id = 'body-right';
        this.elements.panel.classList.add(EditorPanel.getClassName('panel'))
    }

    public getElement(element: string): HTMLElement | Array<HTMLLIElement> {
        if (Object.keys(this.elements).indexOf(element) != -1) {
            return this.elements[element];
        } else {
            throw `element ${element} is not found`;
        }
    }

    public hide() {
        this.elements.panel.classList.remove(
            EditorPanel.getClassName('show')
        );
        /**
         * 置空attr list
         */
        this.elements.body_right_ul_li.forEach(li=>{
            li.remove();
        });
    }

    public setTitle(title: string) {
        this.elements.title_p.textContent = title;
    }

    public setBodyAttr(lis:Array<string>) {
        if (lis.length > 0) {
            lis.unshift('content');
            for (const attr in lis) {
                let li = document.createElement('li');
                this.elements.body_right_ul_li.push(li);
                this.elements.body_right_ul.append(li);
                li.textContent = lis[attr];
            }
        }
    }

    public setBodyContent(content:string)
    {
        this.elements.body_left.textContent = content;
    }

    public init(position: clickPosition) {
        this.elements.panel.style.width         = position.width;
        this.elements.body_left.contentEditable = 'true';
        this.elements.body.style.height         = position.height;
        this.elements.panel.style.top           = position.y;
        this.elements.panel.style.left          = position.x;
        this.elements.cancel_btn.textContent    = 'x';
        this.elements.detail_btn.textContent    = '>';
    }

    /**
     * show
     */
    public show() {
        this.elements.panel.classList.add(
            EditorPanel.getClassName('show')
        );
    }

    public showAttr()
    {
        for (let i = 0; i < this.elements.body_right_ul_li.length; i++) {
            const element = this.elements.body_right_ul_li[i];
            element.classList.add(
                EditorPanel.getClassName('show')
            );
        }
    }

    /**
     * hideAttr
     */
    public hideAttr() {
        for (let i = this.elements.body_right_ul_li.length-1; i >= 0; i--) {
            const element = this.elements.body_right_ul_li[i];
            element.classList.remove(
                EditorPanel.getClassName('show')
            );
        }
    }

}

// export default class EditorPanel {

//     private box: HTMLDivElement;

//     static readonly className = 'htmleditor';

//     private titleBtn: HTMLButtonElement;




//     constructor()
//     {
//         /* 创建panel需要的elements */

//     }


//     getTitleBtn() {
//         return this.titleBtn;
//     }

//     /**
//      * 设置盒子
//      * @param position ClickPosition
//      */
//     setPanel(position: clickPosition): EditorPanel {
//         let box = document.createElement('div');
//         box.style.width = position.width;
//         box.style.position = 'absolute';
//         box.style.left = position.x;
//         box.style.top = position.y;
//         box.classList.add(EditorPanel.getClassName('box'));
//         document.body.appendChild(box);
//         this.box = box;
//         return this;
//     }

//     public static getClassName(name: string = null) {
//         if (name) {
//             return `${this.className}-${name}`;
//         }
//         return this.className;
//     }

//     /**
//      * 
//      * @param delay 显示盒子
//      */
//     show(delay: number) {
//         if (this.box) {
//             setTimeout(() => {
//                 this.box.classList.add(EditorPanel.getClassName('show'));
//             }, delay);
//         }
//     }

//     /**
//      * 关闭窗口
//      */
//     close() {
//         if (this.box) {
//             this.box.remove();
//         }
//     }

//     /**
//      * 隐藏窗口
//      * @param delay number
//      */
//     hide(delay: number) {
//         if (this.box) {
//             setTimeout(() => {
//                 this.box.classList.remove(EditorPanel.getClassName('show'));
//             }, delay);
//         }
//     }


//     /**
//      * 设置标题
//      * @param text string
//      */
//     setTitle(text: string): EditorPanel {
//         if (this.box) {
//             let boxtitle = document.createElement('div');
//             boxtitle.id = EditorPanel.getClassName('title');
//             let p = document.createElement('p');
//             p.textContent = text;
//             let btn = document.createElement('button');
//             btn.classList.add(EditorPanel.getClassName('btn'));
//             btn.textContent = 'x';
//             this.titleBtn = btn;
//             boxtitle.append(p);
//             boxtitle.append(btn);
//             this.box.append(boxtitle);
//         }
//         return this;
//     }

//     /**
//      * 设置内容
//      * @param text string
//      */
//     setContent(text: string): EditorPanel {
//         console.log(text);
//         if (this.box) {
//             let div = document.createElement('div');
//             div.textContent = text.trim();
//             div.id = EditorPanel.getClassName('body');
//             // div.contentEditable = 'true';
//             this.box.append(div);
//         }
//         return this;
//     }


// }