# 🌌 CosmicExplorer 3D

> An immersive 3D space exploration web app — explore the solar system, track NASA's astronomy picture of the day, discover near-Earth asteroids, and watch upcoming rocket launches in real time.

**🔭 Live Demo → [dev3s10.github.io/cosmic-explorer](https://dev3s10.github.io/cosmic-explorer/)**

---

## ✨ Features

### 🪐 3D Solar System
- Real-time animated solar system built with React Three Fiber & Three.js
- All 8 planets orbiting the Sun with correct relative speeds and distances
- Saturn and Uranus with visible ring systems
- Click any planet to open a detailed info modal
- Animated starfield background with 6,000 stars
- Camera orbit, zoom, and time-scale controls

### 🔭 NASA APOD
- Live Astronomy Picture of the Day fetched from NASA's API
- Date picker with archive access back to June 16, 1995 — over 10,000 images
- Word-by-word animated description reveal
- HD fullscreen image viewer
- YouTube embed support for video APODs
- Random date quick-jump button

### 🪨 Space Objects Encyclopedia
- Live planet and moon data
- Real near-Earth asteroids from NASA NeoWs API — updated weekly
- Hazardous asteroids flagged with warnings
- Search, filter by type, and paginate
- Click any object for a detailed modal with mass, gravity, temperature

### 🌠 Interactive Star Map
- 40 named stars with accurate spectral colors
- 300 background filler stars with individual twinkling animations
- 4 constellations (Orion, Ursa Major, Cassiopeia, Scorpius) with toggle
- SVG zoom (scroll wheel) and pan (click + drag)
- Hover tooltip showing name, type, distance, magnitude, and constellation
- Star name labels toggle

### 📅 Space Events
- Upcoming meteor showers and eclipses with viewing tips
- **Live rocket launches** from Launch Library 2 API
- Cards + Calendar views
- Filter by type: meteor showers, eclipses, launches, observations
- Countdown timer to next event
- Expandable event cards with visibility info and tips

### ⭐ Favorites System
- Save any planet, moon, asteroid, or comet to favorites
- Persisted in LocalStorage — survives page refreshes
- Live favorites list in the sidebar with one-click remove

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18 + Vite** | Frontend framework and build tool |
| **React Three Fiber** | 3D Solar System rendering |
| **@react-three/drei** | Camera controls, starfield, HTML labels in 3D |
| **Three.js** | Core 3D engine |
| **Framer Motion** | Page and component animations |
| **Zustand** | Global state management |
| **Tailwind CSS** | Utility-first styling |
| **Recharts** | Data visualization |
| **React Router v6** | Client-side navigation |
| **NASA APOD API** | Astronomy Picture of the Day |
| **NASA NeoWs API** | Near-Earth asteroid data |
| **Launch Library 2 API** | Live rocket launch data |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- Free NASA API key from [api.nasa.gov](https://api.nasa.gov)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/DEV3S10/cosmic-explorer.git
cd cosmic-explorer

# 2. Install dependencies
npm install

# 3. Create environment file
echo "VITE_NASA_API_KEY=your_nasa_key_here" > .env

# 4. Start development server
npm run dev
```

Visit `http://localhost:5173` 🚀

### Build & Deploy

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

---

## 📁 Project Structure

```
cosmic-explorer/
├── public/
│   └── 404.html              # GitHub Pages routing fix
├── src/
│   ├── components/
│   │   ├── layout/           # AppLayout, Navbar, Sidebar
│   │   ├── dashboard/        # WelcomeCard, FeaturedPlanet, StatsSummary, UpcomingEvents
│   │   ├── solar/            # Sun3D, Planet3D, OrbitPath, PlanetInfoModal, AnimationController
│   │   ├── objects/          # ObjectCard, ObjectModal, SearchBar, FilterBar, Pagination
│   │   ├── stars/            # StarGrid, ConstellationLines, StarTooltip, ZoomControl
│   │   ├── apod/             # PhotoCard, PhotoDescription, DateSelector
│   │   ├── events/           # EventCard, CalendarView, EventFilter
│   │   └── ui/               # Button, Loader, ToggleSwitch
│   ├── pages/                # Dashboard, SolarSystem, Objects, APOD, StarsMap, SpaceEvents
│   ├── data/                 # Static planet, star, constellation, and event data
│   ├── hooks/                # useAPOD, useSpaceBodies, useAsteroids, useLaunches
│   ├── services/             # NASA API service functions
│   ├── store/                # Zustand favorites store with LocalStorage persistence
│   ├── App.jsx
│   └── main.jsx
├── .env                      # NASA API key (never committed)
├── vite.config.js
└── README.md
```

---

## 🌐 APIs Used

| API | Data | Auth |
|---|---|---|
| [NASA APOD](https://api.nasa.gov) | Astronomy Picture of the Day | Free API key |
| [NASA NeoWs](https://api.nasa.gov) | Near-Earth asteroids | Free API key |
| [Launch Library 2](https://ll2.thespacedevs.com) | Upcoming rocket launches | None required |

> **Note:** You can use `DEMO_KEY` as your NASA API key for testing (limited to 30 requests/hour). Get a free unlimited key at [api.nasa.gov](https://api.nasa.gov).

---

## 🎨 Design System

### Color Palette

| Name | Hex | Usage |
|---|---|---|
| Deep Space | `#0B0C10` | App background |
| Card Surface | `#1F2833` | Cards, sidebar |
| Teal | `#45A29E` | Buttons, highlights |
| Text | `#C5C6C7` | Body text |
| Glow | `#66FCF1` | Active states, glow effects |
| Accent | `#F5B700` | Stars, warnings, accents |

### Typography
- **Display:** Orbitron — headings, labels, UI elements
- **Body:** Exo 2 — descriptions, paragraphs, metadata

---

## 📸 Pages

| Page | Route | Description |
|---|---|---|
| Dashboard | `/` | Welcome card, featured planet, stats, upcoming events |
| Solar System | `/solar-system` | Interactive 3D solar system |
| Objects | `/objects` | Searchable space objects encyclopedia |
| Star Map | `/stars` | Interactive 2D star map with constellations |
| APOD | `/apod` | NASA Astronomy Picture of the Day |
| Space Events | `/events` | Upcoming astronomical events and launches |

---

## 🔮 Planned Features

- [ ] Real NASA planet texture maps for photorealistic 3D surfaces
- [ ] Moon systems — Earth's Moon, Jupiter's Galilean moons orbiting their planets
- [ ] ISS live tracker using Open Notify API
- [ ] AR star map using WebXR API
- [ ] PWA support — installable as a mobile app
- [ ] Global search across all pages
- [ ] Keyboard shortcuts (S = Solar System, A = APOD, Esc = close modal)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "✨ Add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 📄 License

MIT — free to use for your own projects and portfolio.

---

## 👨‍💻 Author

**DEV3S10**
- GitHub: [@DEV3S10](https://github.com/DEV3S10)
- Live App: [dev3s10.github.io/cosmic-explorer](https://dev3s10.github.io/cosmic-explorer/)

---

<div align="center">
  <p>Built with ❤️ and a lot of ☕ — powered by NASA's open data</p>
  <p>⭐ Star this repo if you found it useful!</p>
</div>
