// 恋爱计时器功能
const startDate = new Date("2024-07-28T00:00:00");

function updateLoveTimer() {
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // 添加脉冲动画效果
    if(seconds % 5 === 0) {
        const timerValue = document.getElementById('seconds');
        timerValue.style.animation = 'none';
        setTimeout(() => {
            timerValue.style.animation = 'pulse 0.5s';
        }, 10);
    }
}

// 初始化计时器
updateLoveTimer();
setInterval(updateLoveTimer, 1000);

// 音乐播放器功能
const musicPlayer = document.querySelector('.music-player');
const playBtn = document.querySelector('.play-btn');
const playIcon = playBtn.querySelector('i');
const playerInfo = document.querySelector('.player-info');
const bgMusic = document.getElementById('bg-music');
const musicNotice = document.querySelector('.music-notice');

// 设置初始状态为播放
let isPlaying = true;
playIcon.classList.remove('fa-play');
playIcon.classList.add('fa-pause');

// 尝试自动播放音乐
document.addEventListener('DOMContentLoaded', function() {
    // 设置音量
    bgMusic.volume = 0.5;
    
    // 尝试播放
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // 播放成功
            console.log("音乐自动播放成功");
        }).catch(error => {
            console.log("自动播放失败:", error);
            isPlaying = false;
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            
            // 更新通知
            musicNotice.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 自动播放失败，请手动播放';
            musicNotice.style.animation = 'none';
            setTimeout(() => {
                musicNotice.style.animation = 'slideIn 0.5s ease';
            }, 10);
        });
    }
});

// 播放按钮点击事件
playBtn.addEventListener('click', function() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        bgMusic.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        musicNotice.innerHTML = '<i class="fas fa-music"></i> 音乐已开始播放';
    } else {
        bgMusic.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        musicNotice.innerHTML = '<i class="fas fa-pause"></i> 音乐已暂停';
    }
    
    // 显示通知
    musicNotice.style.animation = 'none';
    setTimeout(() => {
        musicNotice.style.animation = 'slideIn 0.5s ease, fadeOut 0.5s ease 4s forwards';
    }, 10);
    
    // 展开播放器
    expandPlayer();
});

// 展开播放器
function expandPlayer() {
    if (!musicPlayer.classList.contains('expanded')) {
        musicPlayer.classList.add('expanded');
        setTimeout(() => {
            if (musicPlayer.classList.contains('expanded')) {
                musicPlayer.classList.remove('expanded');
            }
        }, 5000);
    }
}

// 点击播放器其他区域也展开
musicPlayer.addEventListener('click', function(e) {
    if (e.target !== playBtn && !playBtn.contains(e.target)) {
        expandPlayer();
    }
});

// 滚动显示时间轴项
const timelineItems = document.querySelectorAll('.timeline-item');

function checkScroll() {
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.9) {
            item.classList.add('visible');
        }
    });
}

// 初始检查
checkScroll();

// 滚动事件监听
window.addEventListener('scroll', checkScroll);

// 封面滚动指示点击
document.querySelector('.scroll-down').addEventListener('click', function() {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// 照片弹窗功能
const modal = document.querySelector('.photo-modal');
const modalImg = modal.querySelector('img');
const closeBtn = modal.querySelector('.close-btn');
const images = document.querySelectorAll('.photo-grid img');

images.forEach(img => {
    img.addEventListener('click', function() {
        modalImg.src = this.src;
        modal.classList.add('active');
    });
});

closeBtn.addEventListener('click', function() {
    modal.classList.remove('active');
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// 音乐结束事件
bgMusic.addEventListener('ended', function() {
    // 循环播放
    bgMusic.currentTime = 0;
    bgMusic.play();
});