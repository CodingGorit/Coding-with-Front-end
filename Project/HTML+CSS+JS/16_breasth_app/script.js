/**
 * Created Date: Thursday, November 2nd 2023, 5:05:43 pm
 * Author: CodingGorit
 * Contact: javafullstack2021@163.com
 * -----
 * Last Modified: Thu Nov 02 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */


const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breatheAnimation();

function breatheAnimation() {
    text.innerText = "吸气"
    container.className = 'container grow';
    setTimeout(() => {
        text.innerText = '保持'
        setTimeout(() => {
            text.innerText = '吐气';
            container.className = 'container shrink';
        }, holdTime);
    },breatheTime);
}

setInterval(breatheAnimation, totalTime);