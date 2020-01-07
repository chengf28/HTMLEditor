import EditorPanel from "./EditorPanel";
import { clickPosition, panelLi, attrs, PanelElements } from "./global";
import { timingSafeEqual } from "crypto";
import ColorPanel from "./ColorPanel";

export default class HTMLEditor {

    private static instance: HTMLEditor = undefined;

    private static isInstance: boolean = false;

    private static isClick: boolean = false;

    private element: HTMLElement;

    private EditorPanel: EditorPanel;

    private ColorPanel: ColorPanel;

    constructor() {
        this.EditorPanel = new EditorPanel;
        document.body.append(this.EditorPanel.getElement('panel') as HTMLElement);
    }

    public static addLinsener(element: HTMLElement | HTMLDocument | Element): HTMLEditor {
        let instance = HTMLEditor.getInstance();
        element.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            /**
             * 已经在点击状态下,不做处理
             */
            if (!HTMLEditor.isClick) {
                HTMLEditor.isClick = true;
                instance.init(e);
            }
        });
        return instance;
    }

    private static getInstance(): HTMLEditor {
        if (!HTMLEditor.isInstance) {
            HTMLEditor.instance = new HTMLEditor;
            HTMLEditor.isInstance = true;
        }
        return HTMLEditor.instance;
    }

    public init(element: MouseEvent) {
        /**
         * 点击到的元素标签
         */
        this.element = <HTMLElement>element.target;

        /**
         * 面板产生位置
         */
        let panelPosition: clickPosition = new clickPosition(
            element.x,
            element.y
        );


        
        // 点击点在右侧
        if (element.x + 600 > window.innerWidth) {
            panelPosition._x = panelPosition._x - ((element.x + 500) - window.innerWidth) - 100;
            
        }

        if (element.y > window.innerHeight / 2) {
            /**
             * 下半部
             */
            const heigth = (<HTMLElement>this.EditorPanel.getElement('panel')).clientHeight;

            panelPosition._y = panelPosition._y - heigth > 0 ? panelPosition._y - heigth : 10;

            if (heigth > window.innerHeight) {
                panelPosition._y -= (heigth - window.innerHeight);
            }
        }

        // /**
        //  * 碰撞两侧检测
        //  */
        // if (panelPosition._x + panelPosition._width > window.innerWidth) {
        //     panelPosition._width = window.innerWidth - 20;
        //     panelPosition._x = 10;
        // }

        /**
         * 设置关闭按钮
         */
        let cancel_btn = this.EditorPanel.getElement('cancel_btn');
        let cancel_btn_second = this.EditorPanel.getElement('cancel_btn_second');
        let detail_btn = this.EditorPanel.getElement('detail_btn');

        if (cancel_btn instanceof HTMLElement) {
            cancel_btn.addEventListener('click', () => {
                this.close();
            });
        }

        if (cancel_btn_second instanceof HTMLElement) {
            cancel_btn_second.addEventListener('click', () => {
                this.close();
            });
        }



        let isShow: boolean = false;
        if (detail_btn instanceof HTMLElement) {
            detail_btn.addEventListener('click', () => {
                if (!isShow) {
                    this.EditorPanel.showAttr();
                    isShow = true;
                } else {
                    this.EditorPanel.hideAttr();
                    isShow = false;
                }
            });
        }


        /**
         * 初始化面板
         */
        this.EditorPanel.init(panelPosition);
        /**
         * 设置面板标题
         */
        this.EditorPanel.setTitle(`<${this.element.tagName.toLowerCase()}>标签`);

        /**
         * 设置面板属性
         */

        let attrs: Array<attrs> = [
            {
                name: 'content',
                type: 'content',
            },
        ];

        const styles: CSSStyleDeclaration = window.getComputedStyle(this.element, null);

        if (styles.getPropertyValue('background-image') != 'none') {
            attrs.push({
                name: 'background-image',
                type: 'css'
            });
        }

        if (styles.getPropertyValue('background-color') != 'none') {
            attrs.push({
                name: 'background-color',
                type: 'css'
            });
        }

        if (styles.getPropertyValue('color') != 'none') {
            attrs.push({
                name: 'color',
                type: 'css'
            });
        }

        this.element.getAttributeNames().map(attr => {
            attrs.push({
                name: attr,
                type: 'attr'
            });
        })

        this.EditorPanel.setBodyAttr(
            attrs
        );


        let AttrsElemenst = (this.EditorPanel.getElement('body_right_ul_li') as Array<HTMLLIElement>);
        // 设置默认
        this.EditorPanel.setAttrAction(AttrsElemenst[0]);
        /**
         * 设置面板点击
         */
        AttrsElemenst.map(li => {
            li.addEventListener('click', (e: MouseEvent) => {
                const onClick = (e.target as HTMLElement);
                let text = '';
                const type = onClick.getAttribute('atype');
                this.EditorPanel.removeColorPanel();
                if (type == 'content') {
                    text = this.element.innerHTML;
                    
                } else if (type == 'css') {
                    text = styles.getPropertyValue(onClick.id);
                    if (onClick.id == 'background-image') {
                        text = text.split('"')[1];
                        if (text == window.location.href) {
                            text = '';
                        }
                    }
                    if (onClick.id.indexOf('color') >= 0) {
                        this.EditorPanel.addColorPanel();
                        const rgb = text.match(
                            /\((\d+),\s?(\d+),\s?(\d+)\)/
                        );
                        if (rgb) {
                            this.EditorPanel.setBodyBG(parseInt(rgb[1]),parseInt(rgb[2]),parseInt(rgb[3]));
                        }
                        // this.ColorPanel.init(this.EditorPanel.getElement('panel') as HTMLElement,this.EditorPanel);
                    }
                } else if (type == 'attr') {
                    text = this.element.getAttribute(onClick.id);
                }

                this.EditorPanel.setBodyContent(text, onClick);
            });
        });

        /**
         * 设置面板默认内容
         */
        this.EditorPanel.setBodyContent(
            this.element.innerHTML
        );

        /**
         * 设置面板确认按键
         */
        (this.EditorPanel.getElement('footer_btn') as HTMLButtonElement).addEventListener('click', () => {
            const info = this.EditorPanel.getBodyContent();
            if (info[2] == 'content') {
                this.element.innerHTML = info[0];
            } else if (info[2] == 'css') {
                if (info[1] == 'background-image') {
                    info[1] = 'backgroundImage';
                    info[0] = 'url("' + info[0] + '")';
                }
                this.element.style[info[1]] = info[0];
            } else {
                this.element.setAttribute(info[1], info[0]);
            }
        });

        /**
         * 显示面板
         */
        this.EditorPanel.show();
    }


    public close() {
        HTMLEditor.isClick = false;
        this.EditorPanel.hide();
    }

}

