import EditorPanel from "./EditorPanel";
import { clickPosition, attrs, urls } from "./global";

export default class HTMLEditor {

    private static instance: HTMLEditor = undefined;

    private static isInstance: boolean = false;

    private static isClick: boolean = false;

    private element: HTMLElement;

    private EditorPanel: EditorPanel;

    private urls: Array<urls>;

    private rootElement: HTMLElement;

    constructor(rootElement?: HTMLElement) {
        // 新建面板
        this.EditorPanel = new EditorPanel;
        if (rootElement) {
            this.rootElement = rootElement;
        }
        // 追加面板到根目录
        document.body.append(this.EditorPanel.getElement('panel') as HTMLElement);
        this.movelistener();
    }

    /**
     * 监听移动
     */
    private movelistener() {
        let root = (this.EditorPanel.getElement('panel') as HTMLElement);
        let head = this.EditorPanel.getElement('title') as HTMLElement;
        let foot = this.EditorPanel.getElement('footer') as HTMLElement;
        let x: number;
        let y: number;
        let left: number;
        let top: number;
        let isMove: boolean = false;
        // 鼠标按下
        head.addEventListener('mousedown', (e: MouseEvent) => {
            root.style.cursor = 'move';
            x = e.clientX;
            y = e.clientY;
            left = root.offsetLeft;
            top = root.offsetTop;
            isMove = true;
        });


        foot.addEventListener('mousedown', (e: MouseEvent) => {
            root.style.cursor = 'move';
            x = e.clientX;
            y = e.clientY;
            left = root.offsetLeft;
            top = root.offsetTop;
            isMove = true;
        });

        // 鼠标放开
        head.addEventListener('mouseup', () => {
            root.style.cursor = 'default';
            isMove = false;
        });

        // 鼠标放开
        foot.addEventListener('mouseup', () => {
            root.style.cursor = 'default';
            isMove = false;
        });


        window.addEventListener('mousemove', (e: MouseEvent) => {
            if (!isMove) {
                return;
            }
            root.style.left = e.clientX - (x - left) + 'px';
            root.style.top = e.clientY - (y - top) + 'px';
        });


    }

    public static addLinsener(element: HTMLElement | HTMLDocument | Element, rootElement?: HTMLElement): HTMLEditor {
        let instance = HTMLEditor.getInstance(rootElement);
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


        element.addEventListener('mouseover', (e: MouseEvent) => {
            if (!HTMLEditor.isClick) {
                (<HTMLElement>e.target).style.border = '1px dotted #999';
            }
        });


        element.addEventListener('mouseout', (e: MouseEvent) => {
            (<HTMLElement>e.target).style.removeProperty('border');
        });


        return instance;
    }

    private static getInstance(rootElement?: HTMLElement): HTMLEditor {
        if (!HTMLEditor.isInstance) {
            HTMLEditor.instance = new HTMLEditor(rootElement);
            HTMLEditor.isInstance = true;
        }
        return HTMLEditor.instance;
    }

    public init(element: MouseEvent) {

        /**
         * 点击到的元素标签
         */
        this.element = <HTMLElement>element.target;

        this.select(this.element, true);
        /**
         * 面板产生位置
         */
        let margin_top: number = 0;
        let margin_left: number = 0;
        if (this.rootElement) {
            margin_top = this.rootElement.offsetTop;
            margin_left = this.rootElement.offsetLeft;
        }


        let panelPosition: clickPosition = new clickPosition(
            element.x + margin_left,
            element.y + margin_top
        );


        // 点击点在右侧
        if (element.x + 600 > window.innerWidth) {
            panelPosition._x = panelPosition._x - ((element.x + 500) - window.innerWidth) - 100;

        }



        /**
         * 设置关闭按钮
         */
        let cancel_btn = this.EditorPanel.getElement('cancel_btn');
        let cancel_btn_second = this.EditorPanel.getElement('cancel_btn_second');
        let detail_btn = this.EditorPanel.getElement('detail_btn');

        /**
         * 上面窗口关闭
         */
        if (cancel_btn instanceof HTMLElement) {
            cancel_btn.addEventListener('click', () => {
                this.close();
            });
        }

        /**
         * 上面窗口关闭
         */
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
        const title = `${this.element.tagName.toLowerCase()}标签`;
        this.EditorPanel.setTitle(title);

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
                this.EditorPanel.removeUrlsPanel();
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
                            this.EditorPanel.setBodyBG(parseInt(rgb[1]), parseInt(rgb[2]), parseInt(rgb[3]));
                        }
                        // this.ColorPanel.init(this.EditorPanel.getElement('panel') as HTMLElement,this.EditorPanel);
                    }
                } else if (type == 'attr') {
                    if (onClick.id == 'href') {
                        if (this.urls) {
                            this.EditorPanel.addUrlsPanel(this.urls);
                        }
                    }
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
            this.EditorPanel.setTitle('<b>修改成功</b>');
            setTimeout(() => {
                this.EditorPanel.setTitle(title);
            }, 1500);
        });

        /**
         * 显示面板
         */
        this.EditorPanel.show();
    }


    public close() {
        HTMLEditor.isClick = false;
        this.select(this.element, false);
        this.EditorPanel.hide();
    }

    public setUrl(urls: Array<urls>) {
        this.urls = urls;
    }

    private select(element: HTMLElement, on: boolean = false) {
        console.log(element);

        if (on) {
            element.style.zIndex = '999'
            element.style.boxShadow = '0 0 30px rgba(105, 105, 105, 0.507)';
        } else {
            element.style.removeProperty('box-shadow');

            element.style.removeProperty('z-index');


        }


    }

}

