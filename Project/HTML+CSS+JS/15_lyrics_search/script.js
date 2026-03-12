/**
 * Created Date: Wednesday, November 1st 2023, 4:42:42 pm
 * Author: CodingGorit
 * -----
 * Last Modified: Wed Nov 01 2023
 * Modified By: CodingGorit
 * -----
 * Copyright © 2019 —— 2023 fmin-courses TP Center All Rights Reserved
 * ------------------------------------
 * Javascript will save your soul!
 */

const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

const searchSongs = async (searchitem) => {
  const res = await fetch(`${apiURL}/suggest/${searchitem}`);
  const data = await res.json();
//   console.log(data);
    showData(data);
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchitem = search.value.trim();
  if (!searchitem) {
    alert('请输入查询内容');
  } else {
    searchSongs(searchitem);
  }
});

// 展示信息到 DOM 节点
function showData(data) {
    // let output = '';
    // data.data.forEach(song => {
    //     output += `
    //     <li>
    //         <span><strong>${song.artist.name}</strong> ${song.title}</span>
    //         <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">歌词</button>
    //     </li>
    //     `
    // });

    // result.innerHTML = `
    //     <ul class="songs">
    //         ${output}
    //     </ul>
    // `;

    result.innerHTML = `
        <ul class="songs">
            ${data.data.map(song => {
                return `
                    <li>
                        <span><strong>${song.artist.name}</strong> ${song.title}</span>
                        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">歌词</button>
                    </li>
                `
            }).join('')}
        </ul>
    `;

    if (data.prev || data.next) {
        more.innerHTML = `
            ${data.prev ? `<button class="btn" onClick = "getMoreSongs('${data.prev}')">上一页</button>` : ""}
            ${data.next ? `<button class="btn" onClick = "getMoreSongs('${data.next}')">下一页</button>` : ""}
        `
    } else {
        more.innerHTML = '';
    }
}

async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    showData(data);
}

// 点击按钮

result.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        // console.log('cliock');
        // const artist = e.target.dataset.artist;
        const artist = e.target.getAttribute('data-artist');
        const songtitle = e.target.dataset.songtitle;
        getLyric(artist, songtitle);
    }
});

async function getLyric(artist, songtitle) {
    console.log(artist, songtitle);
    const res = await fetch(`${apiURL}/v1/${artist}/${songtitle}`);
    const data = await res.json();

    // 替换所有回车 和 换行
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br/>');
    result.innerHTML = `
        <h2><strong>${artist}</strong> - ${songtitle}</h2>
        <span>
            ${lyrics}
        </span>
    `;
    more.innerHTML = '';
}

function debounce(fn, delay = 800) {
    let timer;
    return function() {
        if (!timer) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, arguments);
                clearTimeout(timer);
                timer = null;
            }, delay);
        }
    }
}
