/*
=====================================================
SCROLL - PRESENTATION MODE
=====================================================
*/

// =====================================================
// CONFIGURATION
// =====================================================

const CONFIG = {
    totalVideos: 7,
    autoScrollInterval: 5000,
    motivationalInterval: 30000,
    navChangeInterval: 8000,
    popupDuration: 4000
};

// =====================================================
// NAVIGATION DIRECTIONS
// =====================================================

const navDirections = [
    { arrow: '→', text: 'Turn right' },
    { arrow: '←', text: 'Turn left' },
    { arrow: '↑', text: 'Go straight' },
    { arrow: '↗', text: 'Keep right' },
    { arrow: '↖', text: 'Keep left' },
    { arrow: '↑', text: 'Continue ahead' },
    { arrow: '→', text: 'Exit right' },
    { arrow: '↑', text: 'Stay in lane' },
    { arrow: '↺', text: 'Make a U-turn' },
    { arrow: '→', text: 'In 200m, turn right' }
];

// =====================================================
// MOTIVATIONAL MESSAGES
// =====================================================

const motivationalMessages = [
    "You're doing amazing! Keep going ✨",
    "Great progress! You've got this 💪",
    "Keep scrolling, you're on fire! 🔥",
    "Amazing dedication! Stay with it 🌟",
    "You're unstoppable! Keep it up 💫",
    "Wonderful! Don't stop now ⭐",
    "You're in the zone! Keep flowing 🌊",
    "Incredible focus! Almost there 🎯",
    "So proud of you! Keep scrolling 💖",
    "You're a natural! Keep going 🚀",
    "Pure dedication! Love to see it 🙌",
    "You're crushing it! Stay strong 💎"
];

// =====================================================
// VIDEO DATA
// =====================================================

const videoData = [
    { creator: '@scrolladdict', likes: 45200, comments: 2100, liked: false, saved: false },
    { creator: '@contentqueen', likes: 128300, comments: 5400, liked: false, saved: false },
    { creator: '@viralking', likes: 89700, comments: 3200, liked: false, saved: false },
    { creator: '@trendmaster', likes: 234500, comments: 8100, liked: false, saved: false },
    { creator: '@fyp_daily', likes: 67800, comments: 1900, liked: false, saved: false },
    { creator: '@scrollqueen', likes: 156200, comments: 4700, liked: false, saved: false },
    { creator: '@endless_scroll', likes: 312400, comments: 12300, liked: false, saved: false }
];

// =====================================================
// STATE
// =====================================================

const state = {
    currentVideo: 1,
    hasStarted: false,
    fakeHours: 0
};

// =====================================================
// ELEMENTS
// =====================================================

const elements = {};
let videoElements = [];

// =====================================================
// INITIALIZATION
// =====================================================

function init() {
    // Get elements
    elements.startScreen = document.getElementById('startScreen');
    elements.navSimulation = document.getElementById('navSimulation');
    elements.navArrowIcon = document.getElementById('navArrowIcon');
    elements.navInstruction = document.getElementById('navInstruction');
    elements.motivationalPopup = document.getElementById('motivationalPopup');
    elements.popupTime = document.getElementById('popupTime');
    elements.popupMessage = document.getElementById('popupMessage');
    elements.socialUI = document.getElementById('social-ui');
    elements.creatorInfo = document.getElementById('creatorInfo');
    elements.creatorName = document.getElementById('creatorName');
    elements.videoNav = document.getElementById('videoNav');
    elements.prevArrow = document.getElementById('prevArrow');
    elements.nextArrow = document.getElementById('nextArrow');
    elements.likeBtn = document.getElementById('likeBtn');
    elements.likeCount = document.getElementById('likeCount');
    elements.bookmarkBtn = document.getElementById('bookmarkBtn');
    elements.savedNotification = document.getElementById('savedNotification');
    elements.videoContainer = document.getElementById('videoContainer');
    
    // Create all video elements for preloading
    createVideoElements();
    
    // Set up start screen
    elements.startScreen.addEventListener('click', startExperience);
    elements.startScreen.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startExperience();
    });
}

// =====================================================
// CREATE VIDEO ELEMENTS (PRELOAD ALL)
// =====================================================

function createVideoElements() {
    for (let i = 1; i <= CONFIG.totalVideos; i++) {
        const video = document.createElement('video');
        video.src = `videos-flat/video${i}.mp4`;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.className = 'video-player';
        video.style.display = 'none';
        elements.videoContainer.appendChild(video);
        videoElements.push(video);
    }
}

// =====================================================
// START EXPERIENCE
// =====================================================

function startExperience() {
    if (state.hasStarted) return;
    state.hasStarted = true;
    
    // Hide start screen
    elements.startScreen.classList.add('hidden');
    
    // Show UI elements
    elements.navSimulation.classList.remove('hidden');
    elements.socialUI.classList.remove('hidden');
    elements.creatorInfo.classList.remove('hidden');
    elements.videoNav.classList.remove('hidden');
    
    // Show and play first video
    showVideo(0);
    
    // Set up buttons
    setupButtons();
    
    // Update UI
    updateUI();
    
    // Start navigation simulation
    startNavSimulation();
    
    // Start motivational popups
    startMotivationalPopups();
    
    // Start auto-scroll
    startAutoScroll();
}

// =====================================================
// VIDEO CONTROL
// =====================================================

function showVideo(index) {
    // Hide all videos
    videoElements.forEach((video, i) => {
        video.style.display = 'none';
        video.pause();
    });
    
    // Show and play current video
    const currentVid = videoElements[index];
    if (currentVid) {
        currentVid.style.display = 'block';
        currentVid.currentTime = 0;
        currentVid.play().catch(e => console.log('Video play error:', e));
    }
}

// =====================================================
// BUTTONS
// =====================================================

function setupButtons() {
    // Like
    elements.likeBtn.addEventListener('click', toggleLike);
    elements.likeBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleLike();
    });
    
    // Save
    elements.bookmarkBtn.addEventListener('click', toggleSave);
    elements.bookmarkBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleSave();
    });
    
    // Navigation
    elements.prevArrow.addEventListener('click', goToPrev);
    elements.nextArrow.addEventListener('click', goToNext);
}

function toggleLike() {
    const current = videoData[state.currentVideo - 1];
    current.liked = !current.liked;
    
    if (current.liked) {
        current.likes++;
        elements.likeBtn.classList.add('liked', 'heart-beat');
        setTimeout(() => elements.likeBtn.classList.remove('heart-beat'), 400);
    } else {
        current.likes--;
        elements.likeBtn.classList.remove('liked');
    }
    
    elements.likeCount.textContent = formatNumber(current.likes);
}

function toggleSave() {
    const current = videoData[state.currentVideo - 1];
    current.saved = !current.saved;
    
    if (current.saved) {
        elements.bookmarkBtn.classList.add('saved', 'save-anim');
        showSavedNotification();
        setTimeout(() => elements.bookmarkBtn.classList.remove('save-anim'), 300);
    } else {
        elements.bookmarkBtn.classList.remove('saved');
    }
}

function showSavedNotification() {
    elements.savedNotification.classList.add('show');
    setTimeout(() => elements.savedNotification.classList.remove('show'), 2000);
}

// =====================================================
// VIDEO NAVIGATION
// =====================================================

function goToPrev() {
    state.currentVideo--;
    if (state.currentVideo < 1) state.currentVideo = CONFIG.totalVideos;
    switchVideo();
}

function goToNext() {
    state.currentVideo++;
    if (state.currentVideo > CONFIG.totalVideos) state.currentVideo = 1;
    switchVideo();
}

function switchVideo() {
    showVideo(state.currentVideo - 1);
    updateUI();
}

function updateUI() {
    const current = videoData[state.currentVideo - 1];
    
    elements.creatorName.textContent = current.creator;
    elements.likeCount.textContent = formatNumber(current.likes);
    
    // Update button states
    if (current.liked) {
        elements.likeBtn.classList.add('liked');
    } else {
        elements.likeBtn.classList.remove('liked');
    }
    
    if (current.saved) {
        elements.bookmarkBtn.classList.add('saved');
    } else {
        elements.bookmarkBtn.classList.remove('saved');
    }
}

// =====================================================
// AUTO SCROLL
// =====================================================

function startAutoScroll() {
    setInterval(goToNext, CONFIG.autoScrollInterval);
}

// =====================================================
// NAVIGATION SIMULATION
// =====================================================

function startNavSimulation() {
    updateNav();
    setInterval(updateNav, CONFIG.navChangeInterval);
}

function updateNav() {
    const index = Math.floor(Math.random() * navDirections.length);
    const direction = navDirections[index];
    
    elements.navArrowIcon.textContent = direction.arrow;
    elements.navInstruction.textContent = direction.text;
}

// =====================================================
// MOTIVATIONAL POPUPS
// =====================================================

function startMotivationalPopups() {
    setTimeout(() => {
        showMotivationalPopup();
        setInterval(showMotivationalPopup, CONFIG.motivationalInterval);
    }, CONFIG.motivationalInterval);
}

function showMotivationalPopup() {
    state.fakeHours++;
    
    const timeText = state.fakeHours === 1 ? '1 hour' : `${state.fakeHours} hours`;
    const messageIndex = Math.floor(Math.random() * motivationalMessages.length);
    const message = motivationalMessages[messageIndex];
    
    elements.popupTime.textContent = timeText;
    elements.popupMessage.textContent = message;
    elements.motivationalPopup.classList.remove('hidden');
    elements.motivationalPopup.classList.add('show');
    
    setTimeout(() => {
        elements.motivationalPopup.classList.remove('show');
        setTimeout(() => elements.motivationalPopup.classList.add('hidden'), 500);
    }, CONFIG.popupDuration);
}

// =====================================================
// UTILITIES
// =====================================================

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// =====================================================
// START
// =====================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}