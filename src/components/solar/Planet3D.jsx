import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import OrbitPath from './OrbitPath'

const Planet3D = ({ planet, onSelect, timeScale = 1 }) => {
    const meshRef       = useRef()
    const groupRef      = useRef()  // the orbit group that rotates around the sun
    const ringsRef      = useRef()
    const [hovered, setHovered] = useState(false)
    const [labelVisible, setLabelVisible] = useState(false)

    // Each planet starts at a random position in its orbit
    // so they're not all lined up at start
    const initialAngle = useRef(Math.random() * Math.PI * 2)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        // Orbit around sun: advance the angle over time
        const angle = initialAngle.current + t * planet.orbitSpeed * timeScale
        if (groupRef.current) {
            groupRef.current.position.x = Math.cos(angle) * planet.orbitRadius
            groupRef.current.position.z = Math.sin(angle) * planet.orbitRadius
        }

        // Self-rotation
        if (meshRef.current) {
            meshRef.current.rotation.y += planet.rotationSpeed * timeScale
        }

        // Rings tilt (Saturn-style)
        if (ringsRef.current) {
            ringsRef.current.rotation.x = Math.PI / 3
        }
    })

    return (
        <>
            {/* Orbit path ring (drawn at origin, not with the planet) */}
            <OrbitPath radius={planet.orbitRadius} isHovered={hovered} />

            {/* Planet group — this moves around the sun */}
            <group ref={groupRef}>

                {/* Hover glow sphere */}
                {hovered && (
                    <mesh>
                        <sphereGeometry args={[planet.radius * 1.4, 32, 32]} />
                        <meshBasicMaterial
                            color={planet.color}
                            transparent
                            opacity={0.15}
                            side={THREE.BackSide}
                        />
                    </mesh>
                )}

                {/* The planet mesh */}
                <mesh
                    ref={meshRef}
                    onPointerOver={(e) => { e.stopPropagation(); setHovered(true); setLabelVisible(true) }}
                    onPointerOut={() => { setHovered(false); setLabelVisible(false) }}
                    onClick={(e) => { e.stopPropagation(); onSelect(planet) }}
                    scale={hovered ? 1.15 : 1}
                >
                    <sphereGeometry args={[planet.radius, 64, 64]} />
                    <meshStandardMaterial
                        color={planet.color}
                        emissive={planet.emissive}
                        emissiveIntensity={hovered ? 0.4 : 0.1}
                        roughness={planet.roughness}
                        metalness={planet.metalness}
                    />
                </mesh>

                {/* Saturn / Uranus rings */}
                {planet.hasRings && (
                    <mesh ref={ringsRef} rotation={[Math.PI / 3, 0, 0]}>
                        <ringGeometry args={[
                            planet.radius * planet.ringInnerRadius,
                            planet.radius * planet.ringOuterRadius,
                            64
                        ]} />
                        <meshBasicMaterial
                            color={planet.ringColor}
                            transparent
                            opacity={0.6}
                            side={THREE.DoubleSide}  // visible from both above and below
                        />
                    </mesh>
                )}

                {/* HTML label — appears on hover */}
                {/* Html from drei renders actual DOM elements in 3D space! */}
                {labelVisible && (
                    <Html
                        position={[0, planet.radius + 0.5, 0]}
                        center
                        distanceFactor={15}
                    >
                        <div className="bg-cosmic-card/90 border border-cosmic-teal/40
              rounded-lg px-3 py-1.5 pointer-events-none backdrop-blur-sm
              shadow-glow whitespace-nowrap">
              <span className="font-display text-xs text-cosmic-glow uppercase tracking-wider">
                {planet.name}
              </span>
                        </div>
                    </Html>
                )}
            </group>
        </>
    )
}

export default Planet3D