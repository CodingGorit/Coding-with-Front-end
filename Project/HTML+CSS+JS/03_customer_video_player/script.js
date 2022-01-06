// get dom
const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// 点击播放或者暂停
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// 图标切换
function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    } else {
        play.innerHTML ="<i class='fa fa-pause fa-2x'></i>"
    }
}

// 点击 video 更新进度条 和 时间戳
function updateProgres() {
    // console.log(video.currentTime);     // 当前时长
    // console.log(video.duration);    // 播放总时长
    progress.value = (video.currentTime / video.duration) * 100;
    // 获取分钟数
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = "0" + String(mins);
    }

    // 获取秒数
    let seconds = Math.floor(video.currentTime & 60);
    if (seconds < 10) {
        seconds = "0" + String(seconds);
    }

    timestamp.innerHTML = `${mins}:${seconds}`;
}

// 停止视频（还原一下）
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// 拖动进度条，改变播放内容和时间戳
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}
// 添加事件监听
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgres);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);