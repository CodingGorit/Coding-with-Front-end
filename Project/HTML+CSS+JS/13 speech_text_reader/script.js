/**
 * Created Date: Tuesday, October 31st 2023, 2:06:20 pm
 * Author: CodingGorit
 * -----
 * Last Modified: Tue Oct 31 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */

// 获取节点
const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

// 创建data 数据

const data = [
    {
        image: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.mbtS8L6m4v-wUO0d_AO1BgHaFi?w=251&h=189&c=7&r=0&o=5&pid=1.7',
        text: '春暖花开'
    },
    {
        image: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.mbtS8L6m4v-wUO0d_AO1BgHaFi?w=251&h=189&c=7&r=0&o=5&pid=1.7',
        text: '秋高气爽'
    },
    {
        image: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.mbtS8L6m4v-wUO0d_AO1BgHaFi?w=251&h=189&c=7&r=0&o=5&pid=1.7',
        text: '鸟语花香'
    },
    {
        image: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.mbtS8L6m4v-wUO0d_AO1BgHaFi?w=251&h=189&c=7&r=0&o=5&pid=1.7',
        text: '草长莺飞'
    },
    {
        image: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.mbtS8L6m4v-wUO0d_AO1BgHaFi?w=251&h=189&c=7&r=0&o=5&pid=1.7',
        text: '雪中送炭'
    },
    {
        image: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.mbtS8L6m4v-wUO0d_AO1BgHaFi?w=251&h=189&c=7&r=0&o=5&pid=1.7',
        text: '秋风萧瑟'
    },
];


data.forEach(createBox);


function createBox(item) {
    const box = document.createElement('div');

    const { image, text } = item;
    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}"/>
        <p class="info">${text}</p>
    `;

    // 点击按钮进行阅读
    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // 添加 active 效果
        box.classList.add('active');
        setTimeout(() => {
            box.classList.remove('active');
        }, 800);

    });

    main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();

// 存储语音列表
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `
            ${voice.name} ${voice.lang}
        `;
        voicesSelect.appendChild(option);
    })
}

// 获得文字
function setTextMessage(text) {
    message.text = text;
}

// 转换语音，阅读文字
function speakText() {
    speechSynthesis.speak(message);

    // const msg = new SpeechSynthesisUtterance(text);
    // msg.voice = voices[0];
    // msg.rate = 1.5;
    // msg.pitch = 1;
    // speechSynthesis.speak(msg);
}

// 切换语音
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

// 切换语音事件监听
speechSynthesis.addEventListener('voiceschanged', getVoices);

// 切换文字框事件监听
toggleBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.toggle('show')
);

// 关闭按钮事件
closeBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.remove('show')
);

// select 下拉事件监听
voicesSelect.addEventListener('change', setVoice);

// 阅读文字按钮的事件监听
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

getVoices();