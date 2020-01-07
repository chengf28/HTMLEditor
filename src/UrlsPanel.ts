import { urls, UrlPanelElements } from "./global";
import EditorPanel from "./EditorPanel";

export default class UrlsPanel {

    private element:UrlPanelElements;
    constructor(parent:HTMLElement,className:string,urls:Array<urls>) {
        this.element = new UrlPanelElements;
        this.element.rootElement.className = className;
        this.element.addLis(urls);
        parent.append(this.element.rootElement);
    }
    

    public init(body: EditorPanel)
    {
        for (let i = 0; i < this.element.lis.length; i++) {
            this.element.lis[i].addEventListener('click',e=>{
                let content = (<HTMLLIElement>e.target).innerText;
                body.setBodyContent(content.substr(content.indexOf(':')+1));
            });
        }
    }

    public hide(){
        this.element.rootElement.remove();
    }
}