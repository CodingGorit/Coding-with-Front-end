// 获取项目节点
const msgEl = document.getElementById("msg");
const randomNum = getRandomNumber();

console.log('Number', randomNum);

// 语音识别
window.SpeechRecognition =
 window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
recognition.lang = "zh-cn"

recognition.start();    // 开启识别
function getRandomNumber () {
    return Math.floor(Math.random() * 100) + 1;
}

// 捕获用户说话的内容
function onSpeak(e) {
    const msg = e.results[0][0].transcript.trim("。");
    writeMessage(msg);
    checkNumber(msg);
}

let writeMessage = (msg) => {
    msgEl.innerHTML = `
        <div>你说的是：</div>
        <span class="box">${msg}</span>
    `
}

let checkNumber = (msg) => {
    msg=msg.trim('。');
    const num = +msg;
    // 是否位数字
    if (Number.isNaN(num)) {
        msgEl.innerHTML += `<div>这不是一个数字</div>`;
        return;
    }

    if (num > 100 || num < 1) {
        msgEl.innerHTML += `<div>数字必须介于0到100之间</div>`
        return;
    }

    // 猜对
    if (num === randomNum) {
        document.body.innerHTML = `
            <h2>恭喜你，猜对了！！<br><br>
            数字为${num}</h2>
            <button class="play-again" id="play-again">再玩一次</button>
        `
    } else if (num > randomNum) {
        msgEl.innerHTML += "<div>高了</div>";
    } else if (num < randomNum) {
        msgEl.innerHTML += "<div>低了</div>";
    }
}

recognition.addEventListener('result', onSpeak);
recognition.addEventListener("end", () => {
    recognition.start();
});


document.body.addEventListener('click', e => {
    if (e.target.id == "play-again") {
        window.location.reload();
    }
})

