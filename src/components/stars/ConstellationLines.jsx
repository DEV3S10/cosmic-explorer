// This component draws SVG lines between stars that form constellations
// Each line connects two star IDs by looking up their x/y positions

const ConstellationLines = ({ constellations, stars, visible }) => {
    if (!visible) return null

    // Build a lookup map: { starId: starObject }
    // Much faster than .find() inside a loop
    const starMap = {}
    stars.forEach(s => { starMap[s.id] = s })

    return (
        <g className="constellation-lines">
            {constellations.map(constellation =>
                constellation.lines.map(([fromId, toId], lineIndex) => {
                    const from = starMap[fromId]
                    const to   = starMap[toId]
                    if (!from || !to) return null

                    return (
                        <line
                            key={`${constellation.name}-${lineIndex}`}
                            x1={from.x} y1={from.y}
                            x2={to.x}   y2={to.y}
                            stroke={constellation.color}
                            strokeWidth="0.8"
                            strokeOpacity="0.4"
                            // Dashed line style for constellation connections
                            strokeDasharray="4 3"
                        >
                            {/* Animate the line drawing in */}
                            <animate
                                attributeName="strokeOpacity"
                                from="0" to="0.4"
                                dur="1s"
                                fill="freeze"
                            />
                        </line>
                    )
                })
            )}
        </g>
    )
}

export default ConstellationLines