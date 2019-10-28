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
        this.elements.title_p.textContent = title;
    }

    /**
     * 面板属性设置
     * @param lis Array<string>
     */
    public setBodyAttr(lis:Array<string>) {
        if (lis.length > 0) {
            this.elements.detail_btn.hidden = false;
            for (const attr in lis) {
                let li         = document.createElement('li');
                this.elements.body_right_ul_li.push(li);
                this.elements.body_right_ul.append(li);
                li.textContent = lis[attr];
                li.id          = lis[attr];
            }
        }else{
            this.elements.detail_btn.hidden = true;
        }
    }

    /**
     * 设置面板内容
     * @param content string
     */
    public setBodyContent(content:string,id:string = 'content',e:HTMLElement = undefined )
    {
        this.elements.body_left.textContent = content;
        this.elements.body_left.setAttribute('cid', id);
        if (e) {
            this.setAttrAction(e);
        }
    }

    public getBodyContent():Array<string>
    {
        return [
            this.elements.body_left.textContent,
            this.elements.body_left.getAttribute('cid')
        ];
    }

    /**
     * 初始化面板位置属性
     * @param position clickPostion
     */
    public init(position: clickPosition) {
        this.elements.panel.style.width         = position.width;
        this.elements.body_left.contentEditable = 'true';
        this.elements.body.style.height         = position.height;
        this.elements.panel.style.top           = position.y;
        this.elements.panel.style.left          = position.x;
        this.elements.cancel_btn.textContent = 'x';
        this.elements.detail_btn.textContent = '≡';
        this.elements.footer_btn.textContent = '√';
    }

    /**
     * 初始化面板样式
     */
    private initCss() {
        const btn_class                      = EditorPanel.getClassName('btn');
        this.elements.title.id               = EditorPanel.getClassName('title');
        this.elements.cancel_btn.classList.add(btn_class);
        this.elements.cancel_btn.id          = 'cancel-btn';
        this.elements.detail_btn.classList.add(btn_class);
        this.elements.body.id                = EditorPanel.getClassName('body');
        this.elements.body_left.id           = 'body-left';
        this.elements.body_right.id          = 'body-right';
        this.elements.footer.id              = EditorPanel.getClassName('footer');
        this.elements.footer_btn.classList.add(btn_class);
        this.elements.footer_btn.id          = 'body-confirm';
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
            this.elements.body_right_ul_li.shift();
        });
    }

    /**
     * 显示属性栏
     */
    public showAttr()
    {
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
        for (let i = this.elements.body_right_ul_li.length-1; i >= 0; i--) {
            const element = this.elements.body_right_ul_li[i];
            element.classList.remove(
                EditorPanel.getClassName('show')
            );
        }
    }


    public setAttrAction(e:HTMLElement)
    {
        const clss = EditorPanel.getClassName('active');
        let even   = document.querySelector('.'+clss);
        if (even) {
            even.classList.remove(clss);
        }
        e.classList.add(clss);
    }

}