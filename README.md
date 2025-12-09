# Scroll VR - Setup Instructions

## Project Structure

```
scroll-vr/
├── index.html      # Main page with VR scene
├── style.css       # Visual styling
├── app.js          # All interactive logic
├── videos/         # Put your 360° videos here
│   ├── video1.mp4
│   ├── video2.mp4
│   └── video3.mp4
└── sounds/         # Put reward sounds here
    └── reward.mp3
```

## Step 1: Add Your Videos

1. Put your 360° videos in the `videos/` folder
2. Name them `video1.mp4`, `video2.mp4`, `video3.mp4`
3. If you have more or fewer videos, edit `index.html` to add/remove `<video>` elements in the `<a-assets>` section, and update `totalVideos` in `app.js`

## Step 2: Add a Reward Sound

1. Find a satisfying "ding" or notification sound (search "notification sound effect free" online)
2. Save it as `sounds/reward.mp3`

## Step 3: Test Locally

1. Open VS Code
2. Open this folder (File → Open Folder)
3. Right-click on `index.html`
4. Select "Open with Live Server"
5. Your browser will open with the project
6. Use arrow keys or mouse wheel to test scrolling

## Step 4: Test on Your Phone (VR Mode)

Since VR mode requires HTTPS (not regular HTTP), you need to expose your local server:

### Option A: Using ngrok (Recommended)

1. Install ngrok: https://ngrok.com/download
2. Sign up for a free account to get your auth token
3. In Terminal, run:
   ```
   ngrok http 5500
   ```
   (5500 is Live Server's default port)
4. Copy the `https://` URL ngrok gives you
5. Open that URL on your phone
6. Tap the VR goggles icon to enter VR mode

### Option B: Local Network (Simpler but No VR)

1. Find your Mac's IP address: System Settings → Network → Wi-Fi → Details → IP Address
2. On your phone (same WiFi), go to: `http://YOUR_IP:5500`
3. You can see the 360° video but VR mode won't work without HTTPS

## How to Use

1. Open on your phone
2. Tap the screen once to start
3. Tap the VR goggles icon (bottom right) to enter VR mode
4. Insert phone into Google Cardboard
5. Scroll with your Bluetooth ring

## Controls

- **Scroll Ring Down / Arrow Down / Space**: Next video
- **Scroll Ring Up / Arrow Up**: Previous video
- **Mouse Wheel**: Scroll (desktop testing)

## Customization

Edit `app.js` CONFIG section to change:
- `totalVideos`: Number of videos
- `scrollsPerLevel`: Scrolls needed to level up (default: 5)
- `maxLevel`: Maximum reward level (default: 5)
- `scrollCooldown`: Milliseconds between scrolls (default: 300)

## Troubleshooting

**Video won't play on mobile?**
- You must tap the screen once to start (browser security requirement)

**VR mode button missing?**
- Refresh the page, make sure A-Frame loaded

**VR mode not working?**
- Must use HTTPS (see ngrok instructions above)

**Scroll ring not detected?**
- Check ring is in "keyboard" or "presentation" mode
- Some rings need to be paired first in Bluetooth settings
