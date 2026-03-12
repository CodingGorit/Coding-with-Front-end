/**
 * Created Date: Friday, November 3rd 2023, 2:28:49 pm
 * Author: CodingGorit
 * Contact: javafullstack2021@163.com
 * -----
 * Last Modified: Fri Nov 03 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */


// 获取节点
const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

// 创建撞击球
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
};

// 创建挡板
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

let score = 0;
const brickRowCount = 9;
const brickColCount = 5;

// 创建单个砖块
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {
            x: x,
            y: y,
            ...brickInfo
        }
    }
}

function drawBricks() {
    bricks.forEach(brickRow => {
        brickRow.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? "#0095dd" : 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}

// 绘制撞击球
function drawBall() {
    // 绘制圆形
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
}


// 绘制挡板
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = "#0095dd",
        ctx.fill();
    ctx.closePath();
}

// 绘制得分
function drawScore() {
    ctx.font = "20px Arial";
    // ctx.fillStyle = "#0095dd";
    ctx.fillText("Score: " + score, canvas.width - 100, 30);
}

// 的那个花函数
// 移动挡板动画
function movePaddle() {
    paddle.x += paddle.dx;

    // 设置边界
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    }
}

function moveBall() {
    ball.x += ball.dx;  // 向上
    ball.y += ball.dy;

    // 撞击左右侧
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;  // 反弹
    }

    // 撞击上下侧
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1; //反弹
    }

    // 撞击挡板
    if (ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y) {
        ball.dy *= -1;
    }

    // 撞击砖块
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (ball.x - ball.size > brick.x && // 撞击砖块左侧
                    ball.x + ball.size < brick.x + brick.w &&       // 撞击砖块右侧
                    ball.y + ball.size > brick.y && // 撞击顶部
                    ball.y - ball.size < brick.y + brick.h) {
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                }
            }
        })
    });

    // 如果没有接到小球
    if (ball.y + ball.size > canvas.height) {
        showALLbRricks();
        score = 0;
    }
}

function increaseScore() {
    score++;
    if (score % (brickColCount * brickRowCount) === 0) {
        showALLbRricks();
    }
}

// 再次显示所有砖块
function showALLbRricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        });
    });
}

// 绘制游戏结束
function drawGameOver() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095dd";
    ctx.fillText("Game Over!", 200, 200);
}

// 所有绘制
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

draw();

// 创建 update函数
function update() {
    // 动画函数
    movePaddle();
    moveBall();
    draw();

    requestAnimationFrame(update);
}

update();


function keyDownHandler(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        paddle.dx = -paddle.speed;
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right' || e.key === 'ArrowLeft' || e.key === 'Left') {
        paddle.dx = 0;
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

rulesBtn.addEventListener("click", () => {
    rules.classList.add('show');
});

closeBtn.addEventListener("click", () => {
    rules.classList.remove('show');
});

