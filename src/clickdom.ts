export default class Clickdom {
    private dom: EventTarget;

    public init(doc:HTMLDocument)
    {
        doc.addEventListener('click',({target})=>{
            this.dom = target;
            console.log(target)
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