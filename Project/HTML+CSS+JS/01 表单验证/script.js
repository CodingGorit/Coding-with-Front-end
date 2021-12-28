// get element
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show input error message
function showError(input, message) {
	const formControl = input.parentElement;
	formControl.className = "form-control error";
	const small = formControl.querySelector("small");
	small.innerText = message;
}

// show Success
function showSuccess(input) {
	const fomControl = input.parentElement;
	fomControl.className = "form-control success";
}

// check email is valid
function isValidEmail(email) {
	const re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	return re.test(String(email))
}

// checkRequired input
function checkRequired(inputArr) {
	inputArr.forEach(function(input) {
		// console.log(input.value);
		if (input.value.trim() === "") {
			showError(input, '${getKeyWorkds(input)}'+'为必填项');
		} else {
			showSuccess(input);
		}
	});
}

// get keywords
function getKeyWorkds(input) {
	return input.placeholder.slice(3);
}

// event listener
form.addEventListener("submit", function(e) { 
	e.preventDefault();// 事件阻止
	
	// checkRequired([username, email, password, password2]);
	
	//判断方式一
	if (username.value === "") {
		showError(username, "用户名为必填");
	} else {
		showSuccess(username);
	}
	
	if (email.value === "") {
		showError(email, "邮箱为必填");
	} else if (!isValidEmail(email.value)){
		showError(email, "邮箱格式错误");
	} else {
		showSuccess(email);
	}
	
	if (password.value === "") {
		showError(password, "密码为必填");
	} else {
		showSuccess(password);
	}
	
	if (password2.value === "" ) {
		showError(password2, "密码为必填");
	} else if (password2.value != password.value){
		showError(password2, "两次密码不一致");
	} else {
		showSuccess(password2);
	}
});