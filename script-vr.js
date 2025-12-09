/*
=====================================================
SCROLL - VR MODE
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
    "You're doing amazing!",
    "Great progress!",
    "Keep scrolling!",
    "Amazing dedication!",
    "You're unstoppable!",
    "Don't stop now!",
    "You're in the zone!",
    "Incredible focus!",
    "So proud of you!",
    "You're a natural!",
    "Pure dedication!",
    "You're crushing it!"
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

// =====================================================
// INITIALIZATION
// =====================================================

function init() {
    const scene = document.querySelector('a-scene');
    
    if (scene.hasLoaded) {
        onSceneLoaded();
    } else {
        scene.addEventListener('loaded', onSceneLoaded);
    }
}

function onSceneLoaded() {
    // Get elements
    elements.startScreen = document.getElementById('startScreen');
    elements.videoSphere = document.getElementById('videoSphere');
    elements.vrScene = document.getElementById('vrScene');
    
    // VR elements
    elements.vrNavArrow = document.getElementById('vrNavArrow');
    elements.vrNavText = document.getElementById('vrNavText');
    elements.vrMotivationalPopup = document.getElementById('vrMotivationalPopup');
    elements.vrPopupTime = document.getElementById('vrPopupTime');
    elements.vrPopupMessage = document.getElementById('vrPopupMessage');
    
    // Get videos and optimize them
    elements.videos = [];
    for (let i = 1; i <= CONFIG.totalVideos; i++) {
        const video = document.getElementById(`video${i}`);
        if (video) {
            video.muted = true;
            video.playbackRate = 1.0; // Ensure normal playback rate
            video.load(); // Preload videos
            elements.videos.push(video);
        }
    }
    
    // Set up start screen
    elements.startScreen.addEventListener('click', startExperience);
    elements.startScreen.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startExperience();
    });
}

// =====================================================
// START EXPERIENCE
// =====================================================

function startExperience() {
    if (state.hasStarted) return;
    state.hasStarted = true;
    
    // Hide start screen
    elements.startScreen.classList.add('hidden');
    
    // Start video
    playCurrentVideo();
    
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

function playCurrentVideo() {
    const currentIndex = state.currentVideo - 1;
    const currentVideo = elements.videos[currentIndex];
    
    if (!currentVideo) return;
    
    // Pause all other videos
    elements.videos.forEach((v, i) => {
        if (i !== currentIndex) {
            v.pause();
        }
    });
    
    // Prepare current video
    currentVideo.currentTime = 0;
    
    // Update sphere source
    elements.videoSphere.setAttribute('src', `#video${state.currentVideo}`);
    
    // Play with error handling
    const playPromise = currentVideo.play();
    if (playPromise !== undefined) {
        playPromise.catch(e => {
            console.log('Video play error:', e);
            // Retry once after a short delay
            setTimeout(() => {
                currentVideo.play().catch(err => console.log('Retry failed:', err));
            }, 100);
        });
    }
}

function goToNextVideo() {
    state.currentVideo++;
    if (state.currentVideo > CONFIG.totalVideos) state.currentVideo = 1;
    playCurrentVideo();
}

// =====================================================
// AUTO SCROLL
// =====================================================

function startAutoScroll() {
    setInterval(goToNextVideo, CONFIG.autoScrollInterval);
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
    
    // Update VR nav
    if (elements.vrNavArrow) {
        elements.vrNavArrow.setAttribute('value', direction.arrow);
    }
    if (elements.vrNavText) {
        elements.vrNavText.setAttribute('value', direction.text);
    }
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
    
    // Show VR popup
    if (elements.vrPopupTime) {
        elements.vrPopupTime.setAttribute('value', timeText);
    }
    if (elements.vrPopupMessage) {
        elements.vrPopupMessage.setAttribute('value', message);
    }
    if (elements.vrMotivationalPopup) {
        elements.vrMotivationalPopup.setAttribute('visible', true);
        
        setTimeout(() => {
            elements.vrMotivationalPopup.setAttribute('visible', false);
        }, CONFIG.popupDuration);
    }
}

// =====================================================
// START
// =====================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}