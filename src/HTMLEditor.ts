import EditorPanel from "./EditorPanel";
import { clickPosition, panelLi } from "./global";

export default class HTMLEditor {

    private static instance: HTMLEditor = undefined;

    private static isInstance: boolean = false;

    private static isClick: boolean = false;

    private element: HTMLElement;

    private EditorPanel: EditorPanel;

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
            element.y,
            this.element.clientWidth && this.element.clientWidth >= 300 ? this.element.clientWidth : 300,
            this.element.clientHeight && this.element.clientHeight >= 100 ? this.element.clientHeight : 100
        );

        if (element.x > window.innerWidth / 2) {
            // 右边
            panelPosition._x = panelPosition._x - panelPosition._width > 0 ? panelPosition._x - panelPosition._width : 10;
            
            /**
             * 右边点击碰撞右侧检测
             */
            if (panelPosition._x + 20 > window.innerWidth) {
                panelPosition._x -= 20;
            }
        } 

        if (element.y > window.innerHeight/2) {
            /**
             * 下半部
             */
            const heigth = (<HTMLElement>this.EditorPanel.getElement('panel')).clientHeight;

            panelPosition._y = panelPosition._y - heigth > 0 ? panelPosition._y - heigth : 10;

            if ( heigth > window.innerHeight) {
                panelPosition._y -= (heigth-window.innerHeight);
            }
        }

        /**
         * 碰撞两侧检测
         */
        if (panelPosition._x + panelPosition._width > window.innerWidth) {
            panelPosition._width = window.innerWidth - 20;
            panelPosition._x = 10;
        }

        /**
         * 设置关闭按钮
         */
        let cancel_btn = this.EditorPanel.getElement('cancel_btn');
        let detail_btn = this.EditorPanel.getElement('detail_btn');

        if (cancel_btn instanceof HTMLElement) {
            cancel_btn.addEventListener('click', () => {
                this.close();
            });
        }

        let isShow:boolean = false;
        if (detail_btn instanceof HTMLElement) {
            detail_btn.addEventListener('click', () => {
                console.log(isShow);
                if (!isShow) {
                    this.EditorPanel.showAttr();
                }else{
                    this.EditorPanel.hideAttr();
                }
                isShow = !isShow;
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
        let attrs = this.element.getAttributeNames()
        attrs.unshift('content');
        this.EditorPanel.setBodyAttr(
            attrs
        );
        

        let AttrsElemenst = (this.EditorPanel.getElement('body_right_ul_li') as Array<HTMLLIElement>);
        console.log(AttrsElemenst);
        // 设置默认
        this.EditorPanel.setAttrAction(AttrsElemenst[0]);
        /**
         * 设置面板点击
         */
        AttrsElemenst.map(li=>{
            li.addEventListener('click',(e:MouseEvent)=>{
                const onClick = (e.target as HTMLElement);
                let text      = '';
                if (onClick.id != 'content') {
                    text = this.element.getAttribute(onClick.id);   
                }else{
                    text = this.element.innerHTML;
                }
                this.EditorPanel.setBodyContent(text,onClick.id,onClick);
            });
        });

        /**
         * 设置面板默认内容
         */
        this.EditorPanel.setBodyContent(
            this.element.innerHTML,
        );

        /**
         * 设置面板确认按键
         */
        (this.EditorPanel.getElement('footer_btn') as HTMLButtonElement).addEventListener('click',()=>{
            const info =  this.EditorPanel.getBodyContent();
            if (info[1] != 'content') {
                this.element.setAttribute(info[1],info[0]);
            }else{
                this.element.innerHTML = info[0];
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

