// 获取需要的 dom 节点
const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// 创建虚拟交易数组
// const dumpyTransactions = [
// 	{ id: 1, text: '鲜花', amount: -20 },
// 	{ id: 2, text: '薪酬', amount: 300 },
// 	{ id: 3, text: '书籍', amount: -10 },
// 	{ id: 4, text: '相机', amount: 150 },
// ]

// let transactions = dumpyTransactions;

const localStorageTransactions = JSON.parse(
	localStorage.getItem("transactions")
);

let transactions = 
	localStorage.getItem('transactions') !== null ? localStorageTransactions: [];

function addTransaction (e) {
	e.preventDefault()
	
	// 验证输入框是否为空
	if (text.value.trim() === "" || amount.value.trim() === "") {
		alert("请输入交易名称和交易金额")
	} else {
		const transaction = {
			id: generateID(),
			text: text.value,
			amount: +amount.value
		}
		// console.log(transaction)
		transactions.push(transaction)
		addTransactionDOM(transaction)
		updateValues()
		updateLocalStorage()
		text.value = ""
		amount.value = ""
	}
}

// 创建 generateID
function generateID () {
	return Math.floor(Math.random()*10000000)
}

// 添加 transactions 交易到 DOM list 中
function addTransactionDOM(transaction) {
	// 获得金额前面的符号
	const sign = transaction.amount < 0 ? '-':'+';
	
	// 创建 li 标签
	const item = document.createElement('li');
	
	// 基于金额的征服添加对应的类名
	item.classList.add(transaction.amount < 0 ? 'minus':'plus');
	
	item.innerHTML =`
		${transaction.text}<span>${sign}$${Math.abs(transaction.amount)}</span>
		<button type="button" onclick="removeTransaction(${transaction.id})" class="delete-btn">x</button>
	`;
	list.appendChild(item)
}

// 更新余额，收入、支出的金额
function updateValues () {
	// 通过 map() 获得交易金额数组
	const amounts = transactions.map(transaction => transaction.amount);
	
	//  reduce() 方法得到余额
	const total = amounts.reduce((acc,item) => (acc+=item),0).toFixed(2);
	
	// filter() reduce() 得到收入
	const income = amounts
		.filter(item => item > 0)
		.reduce((acc, item) => (acc += item),0)
		.toFixed(2);
	
	// filter reduce 得到收入
	const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc +=item),0).toFixed(2)*-1);
	
	balance.innerText = `$${total}`;
	money_plus.innerText = `$${income}`;
	money_minus.innerText = `$${expense}`;
}

// 设置 removeTransaction 函数
function removeTransaction (id) {
	// 过滤 id
	transactions = transactions.filter(transaction => transaction.id
	!== id);
	updateLocalStorage()
	init();
}

// 更新本地存储数据
function updateLocalStorage () {
	localStorage.setItem("transactions",JSON.stringify(transactions));
}

// 初始化应用
function init() {
	list.innerHTML = '';
	transactions.forEach(addTransactionDOM);
	updateValues()
}

init()

// 事件监听
form.addEventListener('submit',addTransaction)