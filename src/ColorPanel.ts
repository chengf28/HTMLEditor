import { ColorPanelElements } from "./global";
import EditorPanel from "./EditorPanel";

export default class ColorPanel {

    private elements: ColorPanelElements;

    public constructor(elem:HTMLElement) {
        this.elements = new ColorPanelElements;
        elem.prepend(this.elements.html);
    }

    /**
     * 初始化
     */
    public init(body: EditorPanel) {
        /**
         * 计算单个宽度
         */
        const cols = this.elements.canvas.createLinearGradient(0,0,this.elements.html.width,0);

        cols.addColorStop(0, '#000');

        cols.addColorStop(1 / 8, '#F00');

        cols.addColorStop(2 / 8, '#FF0');

        cols.addColorStop(3 / 8, '#0F0');

        cols.addColorStop(4 / 8, '#0FF');

        cols.addColorStop(5 / 8, '#00F');

        cols.addColorStop(6 / 8, '#F0F');

        cols.addColorStop(.85, '#FFF');



        
        this.elements.canvas.fillStyle = cols;
        this.elements.canvas.fillRect(0, 0, this.elements.html.width, this.elements.html.height);

            this.elements.html.addEventListener('click',e=>{
                
                let getColor = this.elements.canvas.getImageData(e.offsetX,e.offsetY,1,1);
                console.log(getColor);
                
                const color = `rgb(${getColor.data[0]},${getColor.data[1]},${getColor.data[2]})`;
                body.setBodyContent(color);
                body.setBodyBG(getColor.data[0], getColor.data[1], getColor.data[2]);
            });
    }

    /**
     * hide
     */
    public hide() {
        this.elements.html.remove();
    }
}