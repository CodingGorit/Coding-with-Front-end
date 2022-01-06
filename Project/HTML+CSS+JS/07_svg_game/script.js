const worldEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container"); // 弹出框
const notification = document.getElementById("notification-container"); // 通知信息
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application","programming","interface","wonder","code"];

let selectedWords = words[Math.floor(Math.random() * words.length)];
// console.log(selectedWords);

// 存储用户输入的正确的字母
const correctLetters = [];
const wrongLetters = [];

// 显示单词函数
function displayWord() {
	worldEl.innerHTML = `
	${selectedWords.split('').map(
		letter => `
		<span class="letter">
			${correctLetters.includes(letter)? letter : ""}
		</span>
		`
	).join('')}
	`
	const innerWord = worldEl.innerText.replace(/\n/g,"");
	// console.log(innerWord);
	if (innerWord === selectedWords) {
		finalMessage.innerText = "恭喜你输入正确！";
		popup.style.display = "flex";
	}
}

// 显示 showNotification
function showNotification() {
	notification.classList.add('show');
	setTimeout(()=> {
		notification.classList.remove('show');
	},2000);
}

// updateWrongLettersEl  错误单词显示
function updateWrongLettersEl() {
	// 显示错误字母
	wrongLetterEl.innerHTML = `
		${wrongLetters.length > 0 ? "<p>错误</p>": ""}
		${wrongLetters.map(letter => `<span>${letter}</span>`)}
	`
	
	// 显示火柴人
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;
		if (index < errors) {
			part.style.display = "block";
		} else {
			part.style.display = "none";
		}
	})
	
	// 机会用尽显示弹出框
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = "抱歉输入错误，游戏结束";
		popup.style.display = "flex";
	}
}

// 按下键盘中的字母的事件监听
window.addEventListener("keydown", e=> {
	if (e.keyCode >=65 && e.keyCode<=90) {
		const letter = e.key;
		console.log(letter);
		if (selectedWords.includes(letter)) {
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter);
				displayWord();
			} else {
				showNotification();
			}
		} else {
			// 错误字母
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);
				updateWrongLettersEl();
			} else {
				showNotification();
			}
		}
	}
})

// 再玩一次的事件监听
playAgainBtn.addEventListener('click', ()=> {
	// 清空数组
	document.location.reload();
	// correctLetters.splice(0);
	// wrongLetters.splice(0);
	
	// // 重新生成一个新的单词
	// selectedWords = words[Math.floor(Math.random() * words.length)];
	
	// displayWord();
	
	// updateWrongLettersEl();
	
	// popup.style.display = "none";

});

displayWord();