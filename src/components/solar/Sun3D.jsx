import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

const Sun3D = ({ onClick }) => {
    const sunRef    = useRef()
    const glowRef   = useRef()

    // useFrame runs every animation frame (60fps)
    // This is where we animate things over time
    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        // Slow self-rotation
        if (sunRef.current) {
            sunRef.current.rotation.y += 0.002
        }

        // Pulsing glow — Math.sin creates a smooth back-and-forth wave
        if (glowRef.current) {
            const pulse = 1 + Math.sin(t * 2) * 0.05  // oscillates between 0.95 and 1.05
            glowRef.current.scale.setScalar(pulse)
        }
    })

    return (
        // group lets us treat multiple meshes as one unit
        <group onClick={onClick}>

            {/* Outer glow sphere — larger, transparent, emissive */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[2.9, 32, 32]} />
                <meshBasicMaterial
                    color="#FF6B00"
                    transparent
                    opacity={0.08}
                    side={THREE.BackSide}  // render inside of sphere for glow effect
                />
            </mesh>

            {/* Middle glow layer */}
            <mesh>
                <sphereGeometry args={[2.7, 32, 32]} />
                <meshBasicMaterial color="#FDB813" transparent opacity={0.05} side={THREE.BackSide} />
            </mesh>

            {/* The Sun itself */}
            <mesh ref={sunRef}>
                <sphereGeometry args={[2.5, 64, 64]} />
                <meshStandardMaterial
                    color="#FDB813"
                    emissive="#FF6B00"
                    emissiveIntensity={0.6}
                    roughness={0.8}
                    metalness={0.0}
                />
            </mesh>

            {/* Point light — this is what illuminates all planets */}
            <pointLight
                color="#FFF5E0"
                intensity={3}
                distance={200}
                decay={1}
            />

            {/* Small ambient contribution from sun */}
            <pointLight color="#FF6B00" intensity={0.5} distance={30} />
        </group>
    )
}

export default Sun3D