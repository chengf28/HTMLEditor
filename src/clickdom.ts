import ClickBox from "./clickbox";
import { clickPosition } from "./global";

export default class Clickdom {

    private static instance: Clickdom = undefined;

    private static isInstance: boolean = false;

    private isClick: boolean = false;

    private element: HTMLElement;

    private clickbox:ClickBox;

    constructor()
    {
        this.clickbox = new ClickBox();
    }

    public  close()
    {
        this.isClick = false;
        this.clickbox.close();
    }

    public static addLinsener(element: HTMLElement | HTMLDocument | Element): Clickdom {
        let clickdom = Clickdom.getInstance();
        element.addEventListener('click', (e: MouseEvent) => {
            clickdom.init(e);
        });
        return clickdom;
    }

    private static getInstance(): Clickdom {
        if (!Clickdom.isInstance) {
            Clickdom.instance = new Clickdom;
            Clickdom.isInstance = true;
        }
        return Clickdom.instance;
    }

    public init(element: MouseEvent) {
        if (!this.isClick) {
            this.isClick = !this.isClick;
            this.element = <HTMLElement>element.target;
            let screenPosition: clickPosition = new clickPosition(
                element.x,
                element.y,
                this.element.clientWidth,
                this.element.clientHeight
            );
            this.clickbox.setBox(screenPosition)
            .setTitle(`<${this.element.tagName.toLowerCase()}>标签`)
            .setContent(this.element.innerHTML).show(1);

            this.clickbox.getTitleBtn().addEventListener('click',()=>{
                this.isClick = false;
                this.clickbox.close();
            });
        }
    }
    
}

