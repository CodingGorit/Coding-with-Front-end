// 获取节点
const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector(".loader");
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// fetch posts from API
async function getPosts() {
	const res = await fetch('http://jsonplaceholder.typicode.com/posts?_limit='+(+limit)+'&_page='+(+page));
	
	const data = await res.json();
	return data;
}

// show posts in DOM
async function showPosts() {
	const posts = await getPosts();
	// console.log(posts);
	
	posts.forEach(post => {
		const postEl = document.createElement('div');
		postEl.classList.add('post');
		postEl.innerHTML = '<div class="number">'+post.id+'</div><div class="post-info"><h2 class="post-title">'+post.title+'</h2><p class="post-body">'+post.body+'</p></div>';
		postsContainer.appendChild(postEl);
	})
}

function showLoading() {
	loading.classList.add("show");
	setTimeout(() => {
		loading.classList.remove('show');
		
		setTimeout(() => {
			page++;
			showPosts();
		},300);
	},1000);
}

// 初始化数据
showPosts();

// 事件监听
window.addEventListener('scroll', ()=> {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	if (scrollTop + clientHeight >= scrollHeight - 5) {
	
		showLoading();
	}
})

// 搜索框的实现
function filterPosts(e) {
	const term = e.target.value.toUpperCase();
	const posts = document.querySelectorAll('.post');
	
	posts.forEach(post => {
		const title = post.querySelector('.post-title').innerText.toUpperCase();
		const body = post.querySelector('.post-body').innerText.toUpperCase();
		
		// 过滤
		if (title.indexOf(term) > -1 || body.indexOf(term) >-1) {
			post.style.display = "flex";
		} else {
			post.style.display = "none";
		}
	})
}

// 输入框过滤
filter.addEventListener('input',filterPosts);