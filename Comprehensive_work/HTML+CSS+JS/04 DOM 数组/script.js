// https://randomuser.me/api/

// 获取节点
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("doubler");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWeathBtn = document.getElementById("calculate-wealth");


let data = [];
getRandomUser()
getRandomUser()
getRandomUser()

// Fetch Random user and add money
 async function getRandomUser() {
	 // 异步获取数据
	const res = await fetch("https://randomuser.me/api/");
	const data = await res.json();
	// console.log(data);
	const user = data.results[0];
	const newUser = {
		name: user.name.first +" " + user.name.last,
		money: Math.floor(Math.random()*10000000)
	};
	addData(newUser);
}

// doubleMoney
function doubleMoney() {
	data = data.map(user => {
		return {...user, money: user.money * 2};
	});
	updateDOM();
}

// sortByRichest
function sortByRichest() {
	data.sort((a,b) => b.money - a.money);
	
	updateDOM();
}

// showMillioniaires
function showMillioniaires() {
	data = data.filter(user => user.money > 1000000);
	updateDOM();
}

// calculateWeath
function calculateWeath() {
	const wealth = data.reduce((acc, user) =>(acc += user.money), 0);
	// console.log(formatMoney(wealth));
	
	const wealthEl = document.createElement('div');
	wealthEl.innerHTML = "<h3>Total Wealth: <strong>" +formatMoney(wealth) + "</strong></h3>";
	main.appendChild(wealthEl);
	
}

// 添加随机对象到 data 数组
function addData(obj) {
	data.push(obj);
	updateDOM();
}

function updateDOM(provideData = data) {
	// clear main div
	main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
	provideData.forEach( item => {
		const element = document.createElement('div'); // 添加元素
		element.classList.add('person'); // 设置样式
		element.innerHTML = "<strong>"+item.name+"</strong>" + formatMoney(item.money);
		main.appendChild(element);
	});
}

// moeny format
function formatMoney(number) {
	return "$"+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,'); 
}

// 时间监听
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillioniaires);
calculateWeathBtn.addEventListener('click', calculateWeath);