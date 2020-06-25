// 获取节点

const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

// Toggle nav

toggle.addEventListener('click', ()=> {
	document.body.classList.toggle("show-nav");
});

//Show modal
open.addEventListener('click', ()=> {
	modal.classList.add('show-modal');
});

// Hide Modal

close.addEventListener('click', ()=> {
	modal.classList.remove('show-modal');
});

// Hide modal on outside click
window.addEventListener('click', e=> {
	console.log(e.target);
	e.target == modal ? modal.classList.remove('show-modal') : false;
});