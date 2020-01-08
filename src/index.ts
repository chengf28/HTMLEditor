import htmleditor from './HTMLEditor';
import "../src/app.scss";
// let t = new HTMLEditor(document.getElementById('box'));
// document.getElementById('cantainer').onload=function(e){
    let b =(document.getElementById('cantainer') as HTMLFrameElement);
    console.log(b);
    let a = b.contentWindow.document.body;
    
    console.log(a,b.parentElement);
    
    // let a = document.body;
    htmleditor.addLinsener(a,b.parentElement).setUrl([
        {
            name:'测试',
            url:'http://www.google.com:80'
        },
        {
            name:'测试2',
            url:'www.google1.com'
        },
        {
            name:'测试3',
            url:'www.google3.com'
        },
        {
            name:'测试4',
            url:'www.google4.com'
        },
    ]);
// }





