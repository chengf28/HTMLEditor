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
            this.element.clientHeight
        );

        if (element.x > window.innerWidth / 2) {
            // 右边
            panelPosition.left = false;

            /**
             * 右边碰撞检测
             */
            if (panelPosition._x + 20 > window.innerWidth) {
                panelPosition._x -= 20;
            }

        } else {
            // 左边
            panelPosition.left = true;

            /**
             * 左边碰撞检测
             */
            if (panelPosition._x + panelPosition._width > window.innerWidth) {
                panelPosition._width = window.innerWidth - 20;
                panelPosition._x     = 2;
            }
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
        this.EditorPanel.setBodyAttr(
            this.element.getAttributeNames()
        );

        /**
         * 设置面板默认内容
         */
        this.EditorPanel.setBodyContent(
            this.element.innerHTML
        );

        
        /**
         * 显示面板
         */
        this.EditorPanel.show();


        // this.EditorPanel.setBox(panelPosition)
        //     .setTitle(`<${this.element.tagName.toLowerCase()}>标签`)
        //     .setContent(this.element.innerHTML).show(1);

        // this.EditorPanel.getTitleBtn().addEventListener('click', () => {
        // this.EditorPanel.close();
        // }
    }


    public close() {
        HTMLEditor.isClick = false;
        this.EditorPanel.hide();
    }

}

