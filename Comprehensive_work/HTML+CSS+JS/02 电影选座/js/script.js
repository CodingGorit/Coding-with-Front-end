// 持久化保存电影数据，数据存储，渲染
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();
// 更新座位数和总票价
function updateSelectedCount() {

	// 打印已选状态的节点
	const selectedSeats = document.querySelectorAll(".row .seat.selected");
	// console.log(selectedSeats);
	
	// 展开语法,获取选择的下标，使数据持久化
	const seatsIndex = [...selectedSeats].map(seat => {
		return [...seats].indexOf(seat);
	})

	// 索引数组的本地存储
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length;
	console.log(selectedSeats);
	count.innerText = selectedSeatsCount;
	total.innerText = (+selectedSeatsCount) * ticketPrice;
}

// 保存电影索引和票价
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem("selectedMovieIndex", movieIndex);
	localStorage.setItem("selectedMoviePrice", moviePrice);
}

// 获取本地数据并渲染样式
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
	console.log(selectedSeats);
	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add("selected");
			}
		});
	}
	const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
	if (selectedMovieIndex !== null) {  
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

// 电影下拉框事件监听
movieSelect.addEventListener("change", e => {
	ticketPrice = +e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
})

// 作为点击事件
container.addEventListener("click", e => {

	if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
		// 点击选中事件
		e.target.classList.toggle("selected");
		updateSelectedCount();
	}
})

// 设置初始作为和总票价
updateSelectedCount();