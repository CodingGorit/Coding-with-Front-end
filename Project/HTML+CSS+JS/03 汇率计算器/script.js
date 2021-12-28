const currencyEl_one = document.getElementById("currency-one");
const amoumentEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amoumentEl_two = document.getElementById("amount-two");

const swap = document.getElementById('swap');
const rateEl = document.getElementById("rate");

// 通过 fetch 获取汇率并实现 dom 更新
function calculate() {
	// fetch('item.json', {
	// 	method:"POST",
	// 	headers: {
	// 		"Content-Type: application/json"
	// 	}
	// })
	// fetch("item.json").then(res => res.json().then(data => console.log(data)));
	const currency_one = currencyEl_one.value;
	const currency_two = currencyEl_two.value;
	//  我是使用死数据，所以无法动态的改变结果
	fetch("data.json").then(res => res.json()).then(data => {
		const rate = data.rates[currency_two];
		rateEl.innerText = 1+currency_one + "=" + rate + currency_two;
		amoumentEl_two.value = (amoumentEl_one.value) * (rate).toFixed(2);
	});

	// console.log(currency_one, currency_two);
}

calculate()

// 事件监听
currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amoumentEl_one.addEventListener('input', calculate);
amoumentEl_two.addEventListener('input', calculate);


swap.addEventListener('click', ()=> {
	const temp = currencyEl_one.value;
	currencyEl_one.value = currencyEl_two.value;
	currencyEl_two.value = temp;
	calculate();
})