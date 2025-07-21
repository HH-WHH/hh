// 恋爱计时器功能（不变）
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
    
    if(seconds % 5 === 0) {
        const timerValue = document.getElementById('seconds');
        timerValue.style.animation = 'none';
        setTimeout(() => {
            timerValue.style.animation = 'pulse 0.5s';
        }, 10);
    }
}
updateLoveTimer();
setInterval(updateLoveTimer, 1000);

// 音乐播放器功能（修改核心逻辑）
const musicPlayer = document.querySelector('.music-player');
const playBtn = document.querySelector('.play-btn');
const playIcon = playBtn.querySelector('i');
const playerInfo = document.querySelector('.player-info');
const bgMusic = document.getElementById('bg-music');
const musicNotice = document.querySelector('.music-notice');
// 新增：初始引导层相关元素
const initialCover = document.querySelector('.initial-cover');
const container = document.querySelector('.container');

// 初始状态：音乐暂停，图标为播放状态
let isPlaying = false;
playIcon.classList.remove('fa-pause');
playIcon.classList.add('fa-play');

// 核心：点击初始封面后触发的逻辑
initialCover.addEventListener('click', function() {
    // 1. 隐藏初始封面（添加渐变消失效果）
    initialCover.style.opacity = '0';
    setTimeout(() => {
        initialCover.style.visibility = 'hidden';
    }, 1000); // 与CSS动画时长一致
    
    // 2. 显示原有内容（添加渐显效果）
    container.classList.remove('hidden');
    setTimeout(() => {
        container.classList.add('visible');
    }, 100);
    
    // 3. 自动播放背景音乐（用户交互后触发，避免浏览器限制）
    bgMusic.volume = 0.5; // 设置音量
    bgMusic.play().then(() => {
        isPlaying = true;
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        // 显示音乐播放通知
        musicNotice.style.display = 'flex';
        musicNotice.innerHTML = '<i class="fas fa-music"></i> 背景音乐已开启';
        // 通知自动消失
        setTimeout(() => {
            musicNotice.style.opacity = '0';
            setTimeout(() => {
                musicNotice.style.display = 'none';
                musicNotice.style.opacity = '1'; // 重置状态
            }, 500);
        }, 3000);
    }).catch(error => {
        // 极端情况：即使点击后仍播放失败（如浏览器禁用音频）
        musicNotice.style.display = 'flex';
        musicNotice.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 音乐播放失败';
        setTimeout(() => {
            musicNotice.style.display = 'none';
        }, 3000);
    });
});

// 播放/暂停按钮逻辑（不变）
playBtn.addEventListener('click', function() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        bgMusic.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        musicNotice.style.display = 'flex';
        musicNotice.innerHTML = '<i class="fas fa-music"></i> 音乐已开始播放';
    } else {
        bgMusic.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        musicNotice.style.display = 'flex';
        musicNotice.innerHTML = '<i class="fas fa-pause"></i> 音乐已暂停';
    }
    
    musicNotice.style.opacity = '1';
    setTimeout(() => {
        musicNotice.style.opacity = '0';
        setTimeout(() => {
            musicNotice.style.display = 'none';
        }, 500);
    }, 3000);
    
    expandPlayer();
});

// 展开播放器（不变）
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

musicPlayer.addEventListener('click', function(e) {
    if (e.target !== playBtn && !playBtn.contains(e.target)) {
        expandPlayer();
    }
});

// 滚动显示时间轴项（不变）
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
checkScroll();
window.addEventListener('scroll', checkScroll);

// 封面滚动指示点击（不变）
document.querySelector('.scroll-down').addEventListener('click', function() {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// 照片弹窗功能（不变）
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

// 音乐结束事件（不变）
bgMusic.addEventListener('ended', function() {
    bgMusic.currentTime = 0;
    bgMusic.play();
});
