export default class Clickdom {
    private dom:HTMLElement;

    public init(doc:HTMLDocument)
    {
        doc.addEventListener('click', (e:MouseEvent)=>{
              
            console.log(e);
            this.box();
        });
    }

    private box() {
        console.log(this.dom);
        
        if (!this.dom) {
            // TODO
            
        }
        
    }
}