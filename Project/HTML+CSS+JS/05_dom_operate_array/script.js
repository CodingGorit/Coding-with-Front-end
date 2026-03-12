// 本地随机用户数据生成

// 获取节点
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("doubler");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWeathBtn = document.getElementById("calculate-wealth");

// 姓氏和名字数组
const lastNames = ["王", "李", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴", "徐", "孙", "胡", "朱", "高", "林", "何", "郭", "马", "罗", "梁", "宋", "郑", "谢", "韩", "唐", "冯", "于", "董", "萧", "程", "曹", "袁", "邓", "许", "傅", "沈", "曾", "彭", "吕"];
const firstNames = ["伟", "芳", "娜", "秀英", "敏", "静", "丽", "强", "磊", "军", "洋", "勇", "艳", "杰", "娟", "涛", "明", "超", "秀兰", "霞", "平", "刚", "桂英", "玲", "桂兰", "丹", "萍", "鹏", "华", "红", "玉兰", "飞", "桂珍", "雷", "欣", "佳", "俊", "帆", "文", "辉"];

// 英文名字数组
const englishFirstNames = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles", "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen"];
const englishLastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson"];

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// 生成随机用户数据
function getRandomUser() {
    // 随机决定使用中文名还是英文名
    const useChineseName = Math.random() > 0.5;
    
    let name;
    if (useChineseName) {
        // 生成中文名
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        name = lastName + firstName;
    } else {
        // 生成英文名
        const firstName = englishFirstNames[Math.floor(Math.random() * englishFirstNames.length)];
        const lastName = englishLastNames[Math.floor(Math.random() * englishLastNames.length)];
        name = firstName + " " + lastName;
    }
    
    // 生成随机金额
    const money = Math.floor(Math.random() * 10000000);
    
    const newUser = {
        name: name,
        money: money
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
	main.innerHTML = "<h2><strong>用户</strong>财富</h2>";
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