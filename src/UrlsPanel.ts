import { urls, UrlPanelElements } from "./global";

export default class UrlsPanel {

    private element:UrlPanelElements;
    constructor(parent:HTMLElement,className:string,urls:Array<urls>) {
        this.element = new UrlPanelElements;
        this.element.rootElement.className = className;
        this.element.addLis(urls);
        parent.append(this.element.rootElement);
    }
    
    public hide(){
        this.element.rootElement.remove();
    }
}