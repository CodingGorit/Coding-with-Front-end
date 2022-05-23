// 获取节点
const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// 显示当前卡片下标
let currentActiveCard = 0;

// 创建空数组存储 card
const cardsEl = [];

// 创建变量存储 card 里面的数据
const cardsData = getCardsData();

// const cardsData = [
//     {
//         question: "DOM 事件有哪些阶段",
//         answer: "三阶段 —— 捕获 —— 目标 —— 冒泡"
//     },
//     {
//         question: "js 有哪些数据类型",
//         answer: "Undefined Null Boolean Number String、Object、Symbol"
//     },
//     {
//         question: "JS 是什么类型的语言",
//         answer: "解释性语言"
//     }
// ];

// 创建 cards 获取的数据
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index))
}

// 创建单个 card 到 dom
function createCard(data, index) {
    const card = document.createElement("div");
    card.classList.add("card");

    if (index === 0) {
        card.classList.add("active");
    }

    console.log(data);

    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `
    card.addEventListener('click', () => {
        card.classList.toggle("show-answer");
    })
    cardsEl.push(card);
    cardsContainer.appendChild(card);
    updateCurrentText();
}

// 显示当前页码
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`
}

// 从本地存储获取数据
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem("cards"));
    return cards === null ? [] : cards;
}

// 进行本地存储
function setCardsData(cards) {
    localStorage.setItem("cards", JSON.stringify(cards));
    window.location.reload();
}

createCards();

// 事件监听

nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;
    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = 0;
    }
    
    updateCurrentText();
    cardsEl[currentActiveCard].className = 'card active';
});

// 上一页
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1;
    if (currentActiveCard < 0) {
        currentActiveCard = cardsData.length - 1;
    }
    
    updateCurrentText();
    cardsEl[currentActiveCard].className = 'card active';
});

// 显示 add container
showBtn.addEventListener('click', () => addContainer.classList.add("show"));

// 隐藏 add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// 添加卡片
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = {question, answer};

        createCard(newCard);
        question.value = '';
        answer.value = '';
        addContainer.classList.remove("show");
        cardsData.push(newCard);

        setCardsData(cardsData);
    }
});

// 一键清除
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});

