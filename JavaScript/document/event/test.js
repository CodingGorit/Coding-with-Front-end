// 鼠标点击事件
function add2(num1,num2){
    var sum = num1 + num2;
    alert(num1+"+"+num2+"="+sum);
}

// 鼠标聚焦事件
function info(){
    confirm("请输入密码后，再单击确认");
}

//鼠标移开事件 onmouseout
function message()
{
    alert("请不要离开");
}

//失焦事件 onblur
function message1(){
    alert("请自觉填写账号！！！");
}

// 内容选中 onselect
function selected(){
    alert("你触发了文字选中功能 ");
}

//内容改变事件
function change() {
    alert("内容已经改变");
}   

//加载事件
function loading(){
    alert("页面加载中，请稍等。。。");
}

//卸载事件，游览器不同，效果不同
window.onunload = onunload_message;
function onunload_message(){
    alert("你确定要离开游览器吗？");
}