import { useRef, useState } from 'react'
import * as THREE from 'three'

// We build the orbit ring from a custom circle geometry
// RingGeometry creates a flat donut shape
const OrbitPath = ({ radius, isHovered }) => {
    // Build a circle line using THREE.js directly
    const points = []
    // 128 points around a circle = very smooth ring
    for (let i = 0; i <= 128; i++) {
        const angle = (i / 128) * Math.PI * 2
        points.push(new THREE.Vector3(
            Math.cos(angle) * radius,   // x
            0,                           // y (flat on the orbital plane)
            Math.sin(angle) * radius    // z
        ))
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    return (
        <line geometry={geometry}>
            <lineBasicMaterial
                color={isHovered ? '#66FCF1' : '#45A29E'}
                transparent
                opacity={isHovered ? 0.5 : 0.15}
                linewidth={1}
            />
        </line>
    )
}

export default OrbitPath