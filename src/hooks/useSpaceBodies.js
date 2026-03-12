import { useState, useEffect } from 'react'

// Complete, accurate planet + moon data
// These facts are permanent — no API needed
const PLANETS = [
    {
        id: 'mercury', name: 'Mercury', type: 'planet', icon: '⚫',
        color: '#9B9B9B', glowColor: 'rgba(155,155,155,0.3)',
        diameter: '4,879 km', distance: '77.3M km from Sun',
        moons: 0, mass: '3.30 × 10²³ kg', gravity: '3.7 m/s²',
        avgTemp: '167°C average', discovered: 'Ancient',
        description: 'Smallest planet and closest to the Sun. Surface temperatures swing wildly from -180°C at night to 430°C during the day due to having almost no atmosphere.',
    },
    {
        id: 'venus', name: 'Venus', type: 'planet', icon: '🟡',
        color: '#E8C97A', glowColor: 'rgba(232,201,122,0.3)',
        diameter: '12,104 km', distance: '261M km from Sun',
        moons: 0, mass: '4.87 × 10²⁴ kg', gravity: '8.87 m/s²',
        avgTemp: '465°C average', discovered: 'Ancient',
        description: 'Hottest planet despite not being closest to the Sun. Its thick CO₂ atmosphere traps heat in a runaway greenhouse effect. Atmospheric pressure 92x that of Earth.',
    },
    {
        id: 'earth', name: 'Earth', type: 'planet', icon: '🌍',
        color: '#4B9CD3', glowColor: 'rgba(75,156,211,0.3)',
        diameter: '12,742 km', distance: '149.6M km from Sun',
        moons: 1, mass: '5.97 × 10²⁴ kg', gravity: '9.8 m/s²',
        avgTemp: '15°C average', discovered: 'Ancient',
        description: 'Our home — the only known planet harboring life. 71% of the surface is covered in liquid water oceans. Has a powerful magnetic field protecting life from solar radiation.',
    },
    {
        id: 'mars', name: 'Mars', type: 'planet', icon: '🔴',
        color: '#C1440E', glowColor: 'rgba(193,68,14,0.3)',
        diameter: '6,779 km', distance: '225M km from Sun',
        moons: 2, mass: '6.39 × 10²³ kg', gravity: '3.72 m/s²',
        avgTemp: '-60°C average', discovered: 'Ancient',
        description: 'The Red Planet hosts Olympus Mons — the tallest volcano in the solar system at 21km. Evidence of ancient liquid water makes it a prime target for finding past life.',
    },
    {
        id: 'jupiter', name: 'Jupiter', type: 'planet', icon: '🟠',
        color: '#C88B3A', glowColor: 'rgba(200,139,58,0.3)',
        diameter: '139,820 km', distance: '778M km from Sun',
        moons: 95, mass: '1.90 × 10²⁷ kg', gravity: '24.79 m/s²',
        avgTemp: '-110°C cloud tops', discovered: 'Ancient',
        description: 'Largest planet — so massive that 1,300 Earths could fit inside. The Great Red Spot is a storm larger than Earth that has raged for over 350 years.',
    },
    {
        id: 'saturn', name: 'Saturn', type: 'planet', icon: '🪐',
        color: '#F5B700', glowColor: 'rgba(245,183,0,0.3)',
        diameter: '116,460 km', distance: '1.4B km from Sun',
        moons: 146, mass: '5.68 × 10²⁶ kg', gravity: '10.44 m/s²',
        avgTemp: '-140°C cloud tops', discovered: 'Ancient',
        description: 'The ringed jewel of the solar system. Its iconic rings span 282,000 km but are only ~10m thick. Saturn is less dense than water — it would float in a large enough ocean.',
    },
    {
        id: 'uranus', name: 'Uranus', type: 'planet', icon: '🔵',
        color: '#7DE8E8', glowColor: 'rgba(125,232,232,0.3)',
        diameter: '50,724 km', distance: '2.9B km from Sun',
        moons: 28, mass: '8.68 × 10²⁵ kg', gravity: '8.69 m/s²',
        avgTemp: '-195°C average', discovered: '1781',
        description: 'Ice giant rotating on its side — its axis is tilted 98° meaning it essentially rolls around the Sun. Has faint rings and 28 known moons named after Shakespeare characters.',
    },
    {
        id: 'neptune', name: 'Neptune', type: 'planet', icon: '🫐',
        color: '#4B70DD', glowColor: 'rgba(75,112,221,0.3)',
        diameter: '49,244 km', distance: '4.5B km from Sun',
        moons: 16, mass: '1.02 × 10²⁶ kg', gravity: '11.15 m/s²',
        avgTemp: '-200°C average', discovered: '1846',
        description: 'Windiest planet with supersonic storms exceeding 2,100 km/h. Voyager 2 is the only spacecraft to have visited. Its moon Triton orbits backwards and is slowly spiraling inward.',
    },
]

const MOONS = [
    {
        id: 'moon', name: 'The Moon', type: 'moon', icon: '🌕',
        color: '#D4D4D4', glowColor: 'rgba(212,212,212,0.3)',
        diameter: '3,474 km', distance: '384,400 km from Earth',
        moons: 0, mass: '7.34 × 10²² kg', gravity: '1.62 m/s²',
        avgTemp: '-20°C average', discovered: 'Ancient',
        description: "Earth's only natural satellite. Stabilizes Earth's axial tilt and drives our ocean tides. The only extraterrestrial body humans have set foot on.",
    },
    {
        id: 'europa', name: 'Europa', type: 'moon', icon: '⚪',
        color: '#B0C4DE', glowColor: 'rgba(176,196,222,0.3)',
        diameter: '3,121 km', distance: 'Orbits Jupiter',
        moons: 0, mass: '4.80 × 10²² kg', gravity: '1.315 m/s²',
        avgTemp: '-160°C average', discovered: '1610',
        description: "Jupiter's icy moon with a global subsurface ocean containing more water than all of Earth's oceans combined. One of the best candidates for extraterrestrial life.",
    },
    {
        id: 'titan', name: 'Titan', type: 'moon', icon: '🟤',
        color: '#D4A056', glowColor: 'rgba(212,160,86,0.3)',
        diameter: '5,150 km', distance: 'Orbits Saturn',
        moons: 0, mass: '1.35 × 10²³ kg', gravity: '1.352 m/s²',
        avgTemp: '-179°C average', discovered: '1655',
        description: "Saturn's largest moon and the only moon with a dense atmosphere. Has liquid methane lakes and rivers on its surface — a bizarre mirror of Earth's water cycle.",
    },
    {
        id: 'ganymede', name: 'Ganymede', type: 'moon', icon: '🌑',
        color: '#8899AA', glowColor: 'rgba(136,153,170,0.3)',
        diameter: '5,268 km', distance: 'Orbits Jupiter',
        moons: 0, mass: '1.48 × 10²³ kg', gravity: '1.428 m/s²',
        avgTemp: '-163°C average', discovered: '1610',
        description: 'Largest moon in the solar system — bigger than Mercury. The only moon with its own magnetic field. Has a subsurface saltwater ocean beneath its icy crust.',
    },
    {
        id: 'io', name: 'Io', type: 'moon', icon: '🟡',
        color: '#FFD700', glowColor: 'rgba(255,215,0,0.3)',
        diameter: '3,643 km', distance: 'Orbits Jupiter',
        moons: 0, mass: '8.93 × 10²² kg', gravity: '1.796 m/s²',
        avgTemp: '-130°C average', discovered: '1610',
        description: "Most volcanically active body in the solar system. Jupiter's gravity constantly flexes Io's surface, generating enormous heat. Has over 400 active volcanoes.",
    },
    {
        id: 'enceladus', name: 'Enceladus', type: 'moon', icon: '⚪',
        color: '#E8F4F8', glowColor: 'rgba(232,244,248,0.3)',
        diameter: '504 km', distance: 'Orbits Saturn',
        moons: 0, mass: '1.08 × 10²⁰ kg', gravity: '0.113 m/s²',
        avgTemp: '-201°C average', discovered: '1789',
        description: "Saturn's geyser moon — shoots plumes of water vapor and ice hundreds of kilometers into space. Has a warm subsurface ocean making it a top target in the search for life.",
    },
    {
        id: 'triton', name: 'Triton', type: 'moon', icon: '🔵',
        color: '#A8C8E8', glowColor: 'rgba(168,200,232,0.3)',
        diameter: '2,707 km', distance: 'Orbits Neptune',
        moons: 0, mass: '2.14 × 10²² kg', gravity: '0.779 m/s²',
        avgTemp: '-235°C average', discovered: '1846',
        description: "Neptune's largest moon and the coldest measured object in the solar system. Orbits backwards — a captured Kuiper Belt Object slowly spiraling inward toward its doom.",
    },
    {
        id: 'callisto', name: 'Callisto', type: 'moon', icon: '⚫',
        color: '#6B7B8B', glowColor: 'rgba(107,123,139,0.3)',
        diameter: '4,821 km', distance: 'Orbits Jupiter',
        moons: 0, mass: '1.08 × 10²³ kg', gravity: '1.235 m/s²',
        avgTemp: '-139°C average', discovered: '1610',
        description: 'Second largest of Jupiter\'s moons and the most heavily cratered object in the solar system. Its ancient, unchanged surface gives scientists a window into the early solar system.',
    },
]

const COMETS = [
    {
        id: 'halley', name: "Halley's Comet", type: 'comet', icon: '☄️',
        color: '#A8D8EA', glowColor: 'rgba(168,216,234,0.3)',
        diameter: '15 km nucleus', distance: 'Returns every ~76 years',
        moons: 0, mass: '2.2 × 10¹⁴ kg', gravity: '0.00017 m/s²',
        avgTemp: '-70°C to 77°C', discovered: '240 BC',
        description: 'Most famous periodic comet — recorded by astronomers since 240 BC. Visible to the naked eye every ~76 years. Next visit: 2061. Its debris causes the Eta Aquarid meteor shower.',
    },
    {
        id: 'neowise', name: 'Comet NEOWISE', type: 'comet', icon: '☄️',
        color: '#FFD580', glowColor: 'rgba(255,213,128,0.3)',
        diameter: '5 km nucleus', distance: 'Long-period orbit',
        moons: 0, mass: 'Unknown', gravity: 'Unknown',
        avgTemp: 'Unknown', discovered: '2020',
        description: "Spectacular 2020 comet visible to the naked eye for weeks. Won't return for approximately 6,800 years. Discovered by NASA's NEOWISE space telescope just months before its closest approach.",
    },
    {
        id: '67p', name: 'Comet 67P', type: 'comet', icon: '☄️',
        color: '#C8B89A', glowColor: 'rgba(200,184,154,0.3)',
        diameter: '4 km nucleus', distance: 'Jupiter-family orbit',
        moons: 0, mass: '9.98 × 10¹² kg', gravity: '0.00017 m/s²',
        avgTemp: '-70°C to -43°C', discovered: '1969',
        description: "Historic destination of ESA's Rosetta mission. The Philae lander made the first ever comet landing in 2014. The rubber-duck shaped nucleus revealed complex organic chemistry.",
    },
    {
        id: 'borisov', name: 'Comet Borisov', type: 'comet', icon: '☄️',
        color: '#B8D8FF', glowColor: 'rgba(184,216,255,0.3)',
        diameter: '~1 km nucleus', distance: 'Interstellar — left solar system',
        moons: 0, mass: 'Unknown', gravity: 'Unknown',
        avgTemp: 'Unknown', discovered: '2019',
        description: 'Only the second known interstellar object to pass through our solar system, and the first confirmed interstellar comet. Originated from another star system entirely.',
    },
]

// ── HOOK ────────────────────────────────────────────────────────
const useSpaceBodies = (filterType = 'all') => {
    const [loading] = useState(false)
    const [error]   = useState(null)

    const data = (() => {
        switch (filterType) {
            case 'planet':   return PLANETS
            case 'moon':     return MOONS
            case 'comet':    return COMETS
            case 'asteroid': return []  // asteroids come from useAsteroids hook
            default:         return [...PLANETS, ...MOONS, ...COMETS]
        }
    })()

    return { data, loading, error }
}

export default useSpaceBodies