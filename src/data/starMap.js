// Each star has: id, name, x/y position (0-1000 x 0-600 grid),
// magnitude (brightness — lower = brighter), type, and distance in light years
export const STARS = [
    // ── ORION ──
    { id: 1,  name: 'Betelgeuse',  x: 320, y: 220, mag: 0.5, type: 'Red Supergiant',    distance: '700 ly',   constellation: 'Orion' },
    { id: 2,  name: 'Rigel',       x: 380, y: 320, mag: 0.1, type: 'Blue Supergiant',   distance: '860 ly',   constellation: 'Orion' },
    { id: 3,  name: 'Bellatrix',   x: 400, y: 210, mag: 1.6, type: 'Blue Giant',        distance: '240 ly',   constellation: 'Orion' },
    { id: 4,  name: 'Saiph',       x: 300, y: 325, mag: 2.1, type: 'Blue Supergiant',   distance: '720 ly',   constellation: 'Orion' },
    { id: 5,  name: "Alnitak",     x: 330, y: 265, mag: 1.8, type: 'Triple Star',       distance: '800 ly',   constellation: 'Orion' },
    { id: 6,  name: "Alnilam",     x: 355, y: 263, mag: 1.7, type: 'Blue Supergiant',   distance: '2000 ly',  constellation: 'Orion' },
    { id: 7,  name: "Mintaka",     x: 378, y: 260, mag: 2.2, type: 'Multiple Star',     distance: '900 ly',   constellation: 'Orion' },

    // ── URSA MAJOR (Big Dipper) ──
    { id: 8,  name: 'Dubhe',       x: 620, y: 100, mag: 1.8, type: 'Orange Giant',      distance: '124 ly',   constellation: 'Ursa Major' },
    { id: 9,  name: 'Merak',       x: 650, y: 130, mag: 2.4, type: 'White Star',        distance: '79 ly',    constellation: 'Ursa Major' },
    { id: 10, name: 'Phecda',      x: 670, y: 160, mag: 2.4, type: 'White Star',        distance: '84 ly',    constellation: 'Ursa Major' },
    { id: 11, name: 'Megrez',      x: 640, y: 155, mag: 3.3, type: 'White Star',        distance: '81 ly',    constellation: 'Ursa Major' },
    { id: 12, name: 'Alioth',      x: 605, y: 148, mag: 1.8, type: 'White Giant',       distance: '81 ly',    constellation: 'Ursa Major' },
    { id: 13, name: 'Mizar',       x: 575, y: 135, mag: 2.0, type: 'Multiple Star',     distance: '78 ly',    constellation: 'Ursa Major' },
    { id: 14, name: 'Alkaid',      x: 540, y: 115, mag: 1.9, type: 'Blue Dwarf',        distance: '101 ly',   constellation: 'Ursa Major' },

    // ── CASSIOPEIA ──
    { id: 15, name: 'Schedar',     x: 750, y: 80,  mag: 2.2, type: 'Orange Giant',      distance: '228 ly',   constellation: 'Cassiopeia' },
    { id: 16, name: 'Caph',        x: 790, y: 95,  mag: 2.3, type: 'Yellow Subgiant',   distance: '54 ly',    constellation: 'Cassiopeia' },
    { id: 17, name: 'Gamma Cas',   x: 770, y: 70,  mag: 2.5, type: 'Blue Subgiant',     distance: '550 ly',   constellation: 'Cassiopeia' },
    { id: 18, name: 'Ruchbah',     x: 810, y: 75,  mag: 2.7, type: 'White Giant',       distance: '99 ly',    constellation: 'Cassiopeia' },
    { id: 19, name: 'Segin',       x: 830, y: 90,  mag: 3.4, type: 'Blue Giant',        distance: '440 ly',   constellation: 'Cassiopeia' },

    // ── SCORPIUS ──
    { id: 20, name: 'Antares',     x: 200, y: 420, mag: 0.9, type: 'Red Supergiant',    distance: '550 ly',   constellation: 'Scorpius' },
    { id: 21, name: 'Shaula',      x: 170, y: 490, mag: 1.6, type: 'Blue Subgiant',     distance: '700 ly',   constellation: 'Scorpius' },
    { id: 22, name: 'Sargas',      x: 185, y: 470, mag: 1.9, type: 'Yellow Giant',      distance: '270 ly',   constellation: 'Scorpius' },
    { id: 23, name: 'Dschubba',    x: 225, y: 395, mag: 2.3, type: 'Blue Giant',        distance: '400 ly',   constellation: 'Scorpius' },
    { id: 24, name: 'Graffias',    x: 245, y: 385, mag: 2.6, type: 'Multiple Star',     distance: '530 ly',   constellation: 'Scorpius' },

    // ── MISC BRIGHT STARS ──
    { id: 25, name: 'Sirius',      x: 430, y: 370, mag: -1.5, type: 'White Star',       distance: '8.6 ly',   constellation: 'Canis Major' },
    { id: 26, name: 'Canopus',     x: 460, y: 500, mag: -0.7, type: 'Yellow Supergiant',distance: '310 ly',   constellation: 'Carina' },
    { id: 27, name: 'Arcturus',    x: 580, y: 280, mag: -0.1, type: 'Orange Giant',     distance: '37 ly',    constellation: 'Boötes' },
    { id: 28, name: 'Vega',        x: 680, y: 220, mag: 0.0,  type: 'White Star',       distance: '25 ly',    constellation: 'Lyra' },
    { id: 29, name: 'Capella',     x: 500, y: 130, mag: 0.1,  type: 'Yellow Giant',     distance: '43 ly',    constellation: 'Auriga' },
    { id: 30, name: 'Procyon',     x: 460, y: 310, mag: 0.4,  type: 'Yellow White',     distance: '11.5 ly',  constellation: 'Canis Minor' },
    { id: 31, name: 'Achernar',    x: 120, y: 530, mag: 0.5,  type: 'Blue Star',        distance: '139 ly',   constellation: 'Eridanus' },
    { id: 32, name: 'Aldebaran',   x: 270, y: 195, mag: 0.9,  type: 'Orange Giant',     distance: '65 ly',    constellation: 'Taurus' },
    { id: 33, name: 'Pollux',      x: 530, y: 195, mag: 1.1,  type: 'Orange Giant',     distance: '34 ly',    constellation: 'Gemini' },
    { id: 34, name: 'Castor',      x: 510, y: 175, mag: 1.6,  type: 'Multiple Star',    distance: '51 ly',    constellation: 'Gemini' },
    { id: 35, name: 'Deneb',       x: 720, y: 190, mag: 1.3,  type: 'Blue Supergiant',  distance: '2600 ly',  constellation: 'Cygnus' },
    { id: 36, name: 'Regulus',     x: 560, y: 330, mag: 1.4,  type: 'Blue White',       distance: '79 ly',    constellation: 'Leo' },
    { id: 37, name: 'Spica',       x: 620, y: 380, mag: 1.0,  type: 'Binary Star',      distance: '250 ly',   constellation: 'Virgo' },
    { id: 38, name: 'Fomalhaut',   x: 780, y: 450, mag: 1.2,  type: 'White Star',       distance: '25 ly',    constellation: 'Piscis Austrinus' },
    { id: 39, name: 'Polaris',     x: 700, y: 50,  mag: 2.0,  type: 'Yellow Supergiant',distance: '433 ly',   constellation: 'Ursa Minor' },
    { id: 40, name: 'Altair',      x: 700, y: 280, mag: 0.8,  type: 'White Star',       distance: '17 ly',    constellation: 'Aquila' },
]

// Constellation line definitions — arrays of star ID pairs to connect
export const CONSTELLATIONS = [
    {
        name: 'Orion',
        color: '#66FCF1',
        lines: [
            [1, 5], [5, 6], [6, 7],   // belt: Betelgeuse → Alnitak → Alnilam → Mintaka
            [1, 3], [3, 7], [7, 2],   // right side
            [1, 4], [4, 2],           // left side
        ]
    },
    {
        name: 'Ursa Major',
        color: '#45A29E',
        lines: [
            [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14]  // bowl + handle
        ]
    },
    {
        name: 'Cassiopeia',
        color: '#F5B700',
        lines: [
            [16, 15], [15, 17], [17, 18], [18, 19]  // W shape
        ]
    },
    {
        name: 'Scorpius',
        color: '#C1440E',
        lines: [
            [24, 23], [23, 20], [20, 22], [22, 21]  // head to tail
        ]
    },
]

// Star color by spectral type — makes the map look realistic
export const STAR_COLORS = {
    'Blue Supergiant':   '#AAD4FF',
    'Blue Giant':        '#BFE0FF',
    'Blue Subgiant':     '#CCE8FF',
    'Blue Dwarf':        '#D4EEFF',
    'Blue White':        '#E0F0FF',
    'Blue Star':         '#CCE8FF',
    'White Star':        '#FFFFFF',
    'White Giant':       '#F0F4FF',
    'Yellow White':      '#FFF8E8',
    'Yellow Giant':      '#FFE87A',
    'Yellow Subgiant':   '#FFE060',
    'Yellow Supergiant': '#FFD740',
    'Orange Giant':      '#FFA040',
    'Red Supergiant':    '#FF6B35',
    'Multiple Star':     '#E8D8FF',
    'Triple Star':       '#E8D8FF',
    'Binary Star':       '#FFE0FF',
    'default':           '#FFFFFF',
}