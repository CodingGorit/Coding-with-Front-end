// 获取DOM元素
const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');

// 当前活动步骤
let currentActive = 1;

// 下一步按钮点击事件
next.addEventListener('click', () => {
    currentActive++;
    
    // 确保currentActive不超过圆形指示器的数量
    if (currentActive > circles.length) {
        currentActive = circles.length;
    }
    
    // 更新UI
    update();
});

// 上一步按钮点击事件
prev.addEventListener('click', () => {
    currentActive--;
    
    // 确保currentActive不小于1
    if (currentActive < 1) {
        currentActive = 1;
    }
    
    // 更新UI
    update();
});

// 更新UI函数
function update() {
    // 更新圆形指示器的激活状态
    circles.forEach((circle, idx) => {
        if (idx < currentActive) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });
    
    // 更新进度条
    const actives = document.querySelectorAll('.active');
    progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + '%';
    
    // 更新按钮状态
    if (currentActive === 1) {
        prev.disabled = true;
    } else if (currentActive === circles.length) {
        next.disabled = true;
    } else {
        prev.disabled = false;
        next.disabled = false;
    }
}