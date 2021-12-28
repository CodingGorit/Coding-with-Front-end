// 选择元素
var $shirtPattern = $('.shirt-overlay-pattern');
// 批量选中所有的按钮
var $buttons = $('.textiles-button');
var pattern = '';
// 给按钮批量添加事件
$buttons.click(function () {
  // 其他人去掉 active 类名
  $buttons.removeClass('active');
  // 点击谁，让它添加一个 active 类名
  $(this).addClass('active');
  // 让点击的这个元素内部的 img 标签的src 属性值，作为背景图片
  pattern = $(this).find('img').attr('src');
  // 实现元素淡入淡出切换，当前的图先淡出，然后换完背景的再淡入
  $shirtPattern.fadeOut('fast',function () {
    $shirtPattern.css('background-image','url('+pattern+')')
    $shirtPattern.fadeIn('slow')
  })
});