import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import { PLANETS_DATA, SUN_DATA } from '../data/solarSystem'
import Sun3D from '../components/solar/Sun3D'
import Planet3D from '../components/solar/Planet3D'
import PlanetInfoModal from '../components/solar/PlanetInfoModal'
import AnimationController from '../components/solar/AnimationController'

// Simple loader shown while 3D scene initializes
const SceneLoader = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-cosmic-bg z-10">
        <div className="text-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="text-4xl mb-4"
            >🌌</motion.div>
            <p className="font-display text-cosmic-teal text-xs uppercase tracking-widest">
                Initializing Solar System...
            </p>
        </div>
    </div>
)

const SolarSystem = () => {
    const [selectedPlanet, setSelectedPlanet] = useState(null)
    const [timeScale, setTimeScale]           = useState(1)
    const [selectedSun, setSelectedSun]       = useState(false)

    return (
        <div className="relative w-full h-[calc(100vh-73px)] bg-cosmic-bg overflow-hidden">

            {/* ── HUD OVERLAY — controls drawn on top of canvas ── */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-start pointer-events-none">

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="font-display text-xl font-bold text-cosmic-glow tracking-wider uppercase
            [text-shadow:0_0_20px_rgba(102,252,241,0.5)]">
                        Solar System
                    </h1>
                    <p className="font-body text-cosmic-text/40 text-xs mt-0.5">
                        Click any planet to explore • Drag to orbit • Scroll to zoom
                    </p>
                </motion.div>

                {/* Speed control — pointer-events-auto re-enables clicks */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="pointer-events-auto bg-cosmic-card/70 backdrop-blur-sm
            border border-cosmic-teal/20 rounded-xl p-3"
                >
                    <AnimationController timeScale={timeScale} onChange={setTimeScale} />
                </motion.div>
            </div>

            {/* Planet list sidebar — bottom left */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 left-4 z-10 flex gap-2 flex-wrap max-w-xs"
            >
                {PLANETS_DATA.map(planet => (
                    <button
                        key={planet.id}
                        onClick={() => setSelectedPlanet(planet)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
              bg-cosmic-card/70 backdrop-blur-sm
              border border-cosmic-teal/20 hover:border-cosmic-teal/50
              font-display text-[10px] uppercase tracking-wider
              text-cosmic-text/60 hover:text-cosmic-glow
              transition-all duration-200"
                        style={{ '--planet-color': planet.color }}
                    >
                        <span>{planet.icon}</span>
                        <span>{planet.name}</span>
                    </button>
                ))}
            </motion.div>

            {/* ── THE 3D CANVAS ── */}
            {/* Suspense shows SceneLoader while Three.js initializes */}
            <Suspense fallback={<SceneLoader />}>
                <Canvas
                    camera={{
                        position: [0, 25, 55],  // x, y, z starting position
                        fov: 60,                 // field of view in degrees
                        near: 0.1,
                        far: 1000,
                    }}
                    gl={{ antialias: true }}   // smooth edges
                >
                    {/* Very dim ambient light so nothing is pitch black */}
                    <ambientLight intensity={0.08} />

                    {/* Deep space starfield */}
                    <Stars
                        radius={300}      // sphere radius
                        depth={60}        // depth of star layers
                        count={6000}      // number of stars
                        factor={4}        // star size factor
                        saturation={0}    // white stars
                        fade              // fade at edges
                        speed={0.3}       // twinkle speed
                    />

                    {/* The Sun */}
                    <Sun3D onClick={() => setSelectedSun(true)} />

                    {/* All 8 planets */}
                    {PLANETS_DATA.map(planet => (
                        <Planet3D
                            key={planet.id}
                            planet={planet}
                            onSelect={setSelectedPlanet}
                            timeScale={timeScale}
                        />
                    ))}

                    {/* Camera controls: drag to orbit, scroll to zoom */}
                    <OrbitControls
                        enablePan={false}           // disable panning (keep sun centered)
                        minDistance={10}            // can't zoom closer than this
                        maxDistance={120}           // can't zoom farther than this
                        maxPolarAngle={Math.PI / 2} // can't go below the orbital plane
                        autoRotate={false}
                        zoomSpeed={0.6}
                    />
                </Canvas>
            </Suspense>

            {/* Planet info modal */}
            <PlanetInfoModal
                planet={selectedPlanet}
                onClose={() => setSelectedPlanet(null)}
            />

            {/* Sun info modal */}
            {selectedSun && (
                <PlanetInfoModal
                    planet={{
                        name: SUN_DATA.name,
                        icon: '☀️',
                        color: '#FDB813',
                        description: SUN_DATA.description,
                        diameter: SUN_DATA.diameter,
                        distance: 'Center of Solar System',
                        moons: 8,
                        orbitalPeriod: 'N/A',
                        surfaceTemp: SUN_DATA.surfaceTemp,
                    }}
                    onClose={() => setSelectedSun(false)}
                />
            )}
        </div>
    )
}

export default SolarSystem