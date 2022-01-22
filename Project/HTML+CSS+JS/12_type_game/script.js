// 获取节点
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endganeEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty")


// 游戏单词
const words = [
    'C',
    'C++',
    'c',
    'c++',
    'csharp',
    'c#',
    'Bash',
    'ASCLL',
    'JavaScript',
    'js',
    'css',
    'HTML',
    'H5'
];

// 随机单词
let randomWord;

// 初始得分
let score = 0;

// 初始时间
let time = 1;

// 聚焦到 text 输入框
text.focus();

// 难度选择
let difficulty = localStorage.getItem('difficulty') !== null 
    ? localStorage.getItem('difficulty')
    : 'medium';

// 更新难度选项
difficultySelect.value = localStorage.getItem('difficulty') !== null 
? localStorage.getItem('difficulty')
: 'medium';

// 开始倒数
const timeInterval = setInterval(updateTime, 1000);
// 随机单词
const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)]
}

// 更新单词到 DOM
const addWordToDom = () => {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// 更新分数
const updateScore = () => {
    score++;
    scoreEl.innerHTML = score;
    if (time === 0) {
        clearInterval(timeInterval);

        // 显示游戏结束
        gameOver();
    }
}

// 提示游戏结束
const gameOver = () => {
    endganeEl.innerHTML = `
        <h1>游戏结束</h1>
        <p>您的最终得分为${score}</p>
        <button onclick = "location.reload()">再玩一次</button>
    `
    endganeEl.style.display = "flex";
}


// 更新剩余时间
function updateTime() {
    if (time) {
        time--;
        timeEl.innerHTML = time + 's';
    }
}

addWordToDom();

// 设置 text 的事件监听
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDom();
        updateScore();
        // 清空输入框
        e.target.value = '';

        if (difficulty === "hard") {
            time += 2;
        } else if (difficulty === "medium") {
            time += 3;
        } else {
            time += 5;
        }
        updateTime();
    }
});

// 设置按钮监听
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

// 下拉框的事件监听
settingForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})