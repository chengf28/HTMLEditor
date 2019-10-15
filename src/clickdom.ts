export default class Clickdom {
    private dom: HTMLElement;

    private rootDom:HTMLElement|HTMLDocument|Element;

    private input:HTMLInputElement;

    private pre:string = 'clickdom';

    private isClick:boolean = false;

    public init(doc: HTMLDocument | HTMLElement | Element) {
        this.rootDom = doc;
        doc.addEventListener('click', (e: MouseEvent) => {
            
            this.dom = <HTMLElement>e.target;
            if (this.rootDom != this.dom && this.dom.tagName.toLowerCase() != 'html') {
                if (this.isClick) {
                    return;
                }
                this.isClick = !this.isClick;
                // this.setInput();
                this.setAttr();
            }
        });
    }

    private setInput()
    {
        let input            = <HTMLInputElement>document.createElement('input');
        input.className      = `${this.pre}-input`;
        input.style.height   = this.dom.clientHeight.toString() + 'px';
        input.style.width    = this.dom.clientWidth.toString() + 'px';
        input.style.color    = this.dom.style.color;
        input.value          = this.dom.textContent.trim();
        // 置空文本
        this.dom.textContent = '';
        this.dom.append(input);
        this.input = input;
        this.input.focus();
    }

    private setAttr()
    {
        this.dom.setAttribute('contenteditable', 'true');
        this.dom.focus();
        this.dom.addEventListener('blur',(e)=>{
            this.dom.removeAttribute('contenteditable');
            this.comfirm();
        });
    }

    public comfirm()
    {
        if (this.isClick) {
            // 取反
            this.isClick         = !this.isClick;
            if (this.input) {
                this.dom.textContent = this.input.value;
                this.input.remove();
            }
        }
    }
}