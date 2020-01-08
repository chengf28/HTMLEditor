import htmleditor from './HTMLEditor';
import "../src/app.scss";
// let t = new HTMLEditor(document.getElementById('box'));

htmleditor.addLinsener(document.getElementById('container')).setUrl([
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




