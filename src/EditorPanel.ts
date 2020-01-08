import './EditorPanel.scss';
import { clickPosition, PanelElements, attrs, UrlPanelElements, urls } from './global';
import ZH_CN from "./zh_cn";
import ColorPanel from './colorPanel';
import UrlsPanel from './UrlsPanel';

export default class EditorPanel {

    private elements: PanelElements;

    private colorPanel: ColorPanel;

    private urlPanel: UrlsPanel;

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

    /**
     * 获取到面板的元素
     * @param element string
     */
    public getElement(element: string): HTMLElement | Array<HTMLLIElement> {
        if (Object.keys(this.elements).indexOf(element) != -1) {
            return this.elements[element];
        } else {
            throw `element ${element} is not found`;
        }
    }

    /**
     * 设置面板标题
     * @param title string
     */
    public setTitle(title: string) {
        this.elements.title_p.innerHTML = title;
    }

    /**
     * 面板属性设置
     * @param lis Array<string>
     */
    public setBodyAttr(lis: Array<attrs>) {
        if (lis.length > 0) {
            this.elements.detail_btn.hidden = false;
            for (const attr in lis) {
                let li = document.createElement('li');
                this.elements.body_right_ul_li.push(li);
                this.elements.body_right_ul.append(li);
                if (ZH_CN[lis[attr]['name']]) {
                    li.innerHTML = ZH_CN[lis[attr]['name']];
                }else{
                    li.innerHTML = lis[attr]['name'];
                }

                li.id = lis[attr]['name'];
                li.setAttribute('atype', lis[attr]['type']);
            }
        } else {
            this.elements.detail_btn.hidden = true;
        }
    }

    /**
     * 设置面板内容
     * @param content string
     */
    public setBodyContent(content: string, e: HTMLElement = undefined) {
        this.elements.body_left.innerText = content.trim();
        if (e) {
            this.setAttrAction(e);
        }
    }

    public getBodyContent(): Array<string> {

        const active = document.querySelector(
            '.' + EditorPanel.getClassName('active')
        )
        return [
            this.elements.body_left.textContent,
            active.id,
            active.getAttribute('atype')
        ];
    }

    /**
     * 初始化面板位置属性
     * @param position clickPostion
     */
    public init(position: clickPosition) {
        // this.elements.panel.style.width          = position.width;
        this.elements.body_left.contentEditable = 'true';
        // this.elements.body.style.height          = position.height;
        this.elements.panel.style.top = position.y;
        this.elements.panel.style.left = position.x;
        this.elements.cancel_btn.textContent = 'x';
        this.elements.cancel_btn_second.textContent = 'x';
        this.elements.detail_btn.textContent = '≡';
        this.elements.footer_btn.textContent = 'ok';
    }

    /**
     * 初始化面板样式
     */
    private initCss() {
        const btn_class = EditorPanel.getClassName('btn');
        this.elements.title.id = EditorPanel.getClassName('title');
        this.elements.cancel_btn.classList.add(btn_class);
        this.elements.cancel_btn.id = 'cancel-btn';

        this.elements.cancel_btn_second.classList.add(btn_class);
        this.elements.cancel_btn_second.id = 'cancel-btn';

        this.elements.detail_btn.classList.add(btn_class);
        this.elements.body.id = EditorPanel.getClassName('body');
        this.elements.body_left.id = 'body-left';
        this.elements.body_right.id = 'body-right';
        this.elements.footer.id = EditorPanel.getClassName('footer');
        this.elements.footer_btn.classList.add(btn_class);
        this.elements.footer_btn.id = 'body-confirm';
        this.elements.panel.classList.add(EditorPanel.getClassName('panel'));
    }

    /**
     * 显示面板
     */
    public show() {
        this.elements.panel.classList.add(
            EditorPanel.getClassName('show')
        );
    }

    /**
     * 隐藏面板
     */
    public hide() {
        this.elements.panel.classList.remove(
            EditorPanel.getClassName('show')
        );
        /**
         * 置空attr list
         */
        this.elements.body_right_ul_li.forEach(li => {
            li.remove();
        });

        this.elements.body_left.style.removeProperty('color');
        this.elements.body_left.style.removeProperty('background-color');

        // this.elements.body_left.style.color = '#000';
        // this.elements.body_left.style.backgroundColor = '#fff';
        this.elements.body_right_ul_li = [];

        if (this.colorPanel) {
            this.colorPanel.hide();
        }
        if (this.urlPanel) {
            this.urlPanel.hide();
        }
    }

    /**
     * 显示属性栏
     */
    public showAttr() {
        this.elements.detail_btn.textContent = '>';
        for (let i = 0; i < this.elements.body_right_ul_li.length; i++) {
            const element = this.elements.body_right_ul_li[i];
            element.classList.add(
                EditorPanel.getClassName('show')
            );
        }
    }

    /**
     * 隐藏属性栏
     */
    public hideAttr() {
        this.elements.detail_btn.textContent = '≡';
        for (let i = this.elements.body_right_ul_li.length - 1; i >= 0; i--) {
            const element = this.elements.body_right_ul_li[i];
            element.classList.remove(
                EditorPanel.getClassName('show')
            );
        }
    }

    /**
     * 设置点击的元素的为Action状态
     * @param e HTMLElement 点击的元素
     */
    public setAttrAction(e: HTMLElement) {
        const clss = EditorPanel.getClassName('active');
        let even = document.querySelector('.' + clss);
        if (even) {
            even.classList.remove(clss);
        }
        e.classList.add(clss);
    }

    /**
     * 添加颜色面板
     */
    public addColorPanel() {
        if (!this.colorPanel) {
            this.colorPanel = new ColorPanel(this.elements.footer);
            this.colorPanel.init(this);    
        }
    }

    /**
     * 移除颜色面板
     */
    public removeColorPanel() {
        if (this.colorPanel) {
            this.elements.body_left.style.removeProperty('color');
            this.elements.body_left.style.removeProperty('background-color');

            this.colorPanel.hide();
            this.colorPanel = undefined;
        }
    }

    
    public addUrlsPanel(urls: Array<urls>) {
        if (!this.urlPanel) {
            this.urlPanel = new UrlsPanel(this.elements.footer, 'url_list', urls);
            this.urlPanel.init(this);
        }
    }

    /**
     * removeUrlsPanel
     */
    public removeUrlsPanel() {
        if (this.urlPanel) {
            this.urlPanel.hide();
            this.urlPanel = undefined;
        }
    }

    /**
     * 设置当前输入框背景颜色
     * @param r number 红色值
     * @param g number 绿色值
     * @param b number 蓝色值
     */
    public setBodyBG(r: number, g: number, b: number) {
        this.elements.body_left.style.backgroundColor = `rgb(${r},${g},${b})`;
        this.elements.body_left.style.color = `rgb(${255 - r},${255 - g},${255 - b})`;
    }
}