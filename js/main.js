var result =
    `
/*以下是一个
*会动的简历
*/

*{
transition: all 1s;
}
body{
background-color:skyblue;
}
#code{
    padding:16px;
    border-bottom:2px solid gery;
    font-size:20px;
    position:fixed;
    left:0;
    width:50%;
    height:100%;
}

/*来让代码和文字高亮一下吧*/
.token.selector{
    color:#690;
}
.token.punctuation{
    color:#999;    
}
.token.property{
    color:#905;
}
.token.comment{
    color:slategray;
}
/*旋转*/
#code{
    transform: rotate(360deg)
}
/*我需要张白纸*/
#paper{
    position:fixed;
    right:0;
    width:50%;
    height:100%;
    padding:16px
    background-color:grey;
}
#paper > .content{
    background-color:white;
    width:100%;
    height:100%;   
}
`
var md =
    `
#  自我介绍

我叫王艺超
1993年10月出生
自学前端半年
想要应聘前端开发岗位

#技能介绍
熟悉javascript、html5、css3、jQuery

#项目
1、苹果风格轮播
2、Canvas画板
3、原生JS简历
`

writeCode('', result, () => {
    createPaper(() => {
        writeCode(result, '', () => {
            writeMarkdown(md)
        })
    })
})

function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    let timerId = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        style.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(timerId)
            fn.call()
        }
    }, 10)
}

function writeMarkdown(markdown) {
    let domPaper = document.querySelector('#paper > .content')
    let n = 0
    let timerId = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(timerId)
        }
    }, 10)

}