# 🏆 Tournament Schedule Board

A live, real-time gaming tournament schedule board. Games listed alphabetically on the left, horizontal timeline on the right. Events blink when active, dim when past.

## Features
- Horizontal Gantt-style timeline (10 AM – 8 PM)
- Auto-refreshes every 15 seconds for all viewers
- Admin panel to trigger events live or schedule in advance
- Past events dim out automatically, active events blink

## Setup

### Local Development
```bash
npm install
npm start
# Visit http://localhost:3000
```

### Deploy to Railway (via GitHub)
1. Push this repo to GitHub
2. Go to railway.app → New Project → Deploy from GitHub
3. Select this repo → Railway auto-detects Node.js
4. Click Deploy — your live URL appears in minutes

## Usage

**Public viewers** just open the URL — they see the board live.

**Admin** clicks ⚙ Admin button (top right):
- `▶ Start Now` — triggers a phase immediately (it blinks live)
- `+ Set Time` — schedule a block with specific start/end times  
- `■ End` — closes an active event (dims it as past)

## Data Persistence
Schedule data is saved to `data.json` on the server. This persists between server restarts. Note: redeploying to Railway resets the data — configure before your event day.
