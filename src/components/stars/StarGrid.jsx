import { useRef, useState, useCallback } from 'react'
import { STARS, CONSTELLATIONS, STAR_COLORS } from '../../data/starMap'
import ConstellationLines from './ConstellationLines'
import StarTooltip from './StarTooltip'
import ZoomControl from './ZoomControl'

// Map magnitude to visual radius — brighter stars (lower mag) = bigger
// mag range: -1.5 to 3.5 → radius range: 4 to 1.2
const magToRadius = (mag) => Math.max(1.2, 4 - mag * 0.8)

// Background "filler" stars — random dim stars for atmosphere
const BG_STARS = Array.from({ length: 300 }, (_, i) => ({
    id: `bg-${i}`,
    x: Math.random() * 1000,
    y: Math.random() * 600,
    r: Math.random() * 0.8 + 0.3,
    opacity: Math.random() * 0.4 + 0.1,
    // Random twinkle duration for each star
    twinkleDur: (Math.random() * 3 + 2).toFixed(1),
    twinkleDelay: (Math.random() * 4).toFixed(1),
}))

const StarGrid = () => {
    const svgRef = useRef()

    // viewBox controls what portion of the 1000x600 grid we see
    // Pan shifts it, zoom scales it
    const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 1000, h: 600 })
    const [hoveredStar, setHoveredStar]   = useState(null)
    const [tooltipPos, setTooltipPos]     = useState(null)
    const [showConstellations, setShowConstellations] = useState(true)
    const [showLabels, setShowLabels]     = useState(true)
    const [isDragging, setIsDragging]     = useState(false)
    const dragStart = useRef(null)
    const zoom = 1000 / viewBox.w  // current zoom level (1 = default)

    // ── ZOOM ────────────────────────────────────────────────────────
    const zoomBy = useCallback((factor) => {
        setViewBox(vb => {
            const newW = Math.max(250, Math.min(1000, vb.w * factor))
            const newH = newW * 0.6  // maintain 5:3 aspect ratio
            // Zoom toward center
            const cx = vb.x + vb.w / 2
            const cy = vb.y + vb.h / 2
            return {
                x: cx - newW / 2,
                y: cy - newH / 2,
                w: newW, h: newH,
            }
        })
    }, [])

    const resetView = useCallback(() => {
        setViewBox({ x: 0, y: 0, w: 1000, h: 600 })
    }, [])

    // ── PAN (drag) ───────────────────────────────────────────────────
    const handleMouseDown = (e) => {
        setIsDragging(true)
        dragStart.current = { x: e.clientX, y: e.clientY, vb: { ...viewBox } }
    }

    const handleMouseMove = (e) => {
        if (!isDragging || !dragStart.current) return

        // Convert pixel drag distance to SVG coordinate distance
        const svg = svgRef.current
        const rect = svg.getBoundingClientRect()
        const scaleX = viewBox.w / rect.width
        const scaleY = viewBox.h / rect.height

        const dx = (e.clientX - dragStart.current.x) * scaleX
        const dy = (e.clientY - dragStart.current.y) * scaleY

        setViewBox(vb => ({
            ...vb,
            x: dragStart.current.vb.x - dx,
            y: dragStart.current.vb.y - dy,
        }))
    }

    const handleMouseUp = () => {
        setIsDragging(false)
        dragStart.current = null
    }

    // ── SCROLL TO ZOOM ────────────────────────────────────────────────
    const handleWheel = (e) => {
        e.preventDefault()
        const factor = e.deltaY > 0 ? 1.1 : 0.9
        zoomBy(factor)
    }

    // ── STAR HOVER ────────────────────────────────────────────────────
    const handleStarHover = (e, star) => {
        setHoveredStar(star)
        // Get screen pixel position for the tooltip
        setTooltipPos({ x: e.clientX, y: e.clientY })
    }

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden
      bg-cosmic-bg border border-cosmic-teal/20 select-none">

            {/* ── CONTROLS HUD ── */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-3">
                <ZoomControl
                    zoom={zoom}
                    onZoomIn={() => zoomBy(0.8)}
                    onZoomOut={() => zoomBy(1.25)}
                    onReset={resetView}
                />
            </div>

            {/* ── TOGGLE BUTTONS ── */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
                {[
                    { label: 'Constellations', active: showConstellations, toggle: () => setShowConstellations(v => !v) },
                    { label: 'Labels',         active: showLabels,         toggle: () => setShowLabels(v => !v) },
                ].map(btn => (
                    <button
                        key={btn.label}
                        onClick={btn.toggle}
                        className="px-3 py-1.5 rounded-lg font-display text-[10px]
              uppercase tracking-wider border transition-all duration-200"
                        style={btn.active ? {
                            backgroundColor: 'rgba(102,252,241,0.15)',
                            borderColor: 'rgba(102,252,241,0.5)',
                            color: '#66FCF1',
                        } : {
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(69,162,158,0.2)',
                            color: 'rgba(197,198,199,0.4)',
                        }}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            {/* ── SVG STAR MAP ── */}
            <svg
                ref={svgRef}
                className="w-full h-full"
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
            >
                {/* ── BACKGROUND: deep space gradient ── */}
                <defs>
                    <radialGradient id="spaceGrad" cx="50%" cy="50%" r="70%">
                        <stop offset="0%"   stopColor="#0D1B2A" />
                        <stop offset="100%" stopColor="#0B0C10" />
                    </radialGradient>

                    {/* Glow filter for bright stars */}
                    <filter id="starGlow">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <filter id="starGlowBright">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <rect width="1000" height="600" fill="url(#spaceGrad)" />

                {/* ── BACKGROUND FILLER STARS (twinkling) ── */}
                {BG_STARS.map(s => (
                    <circle key={s.id} cx={s.x} cy={s.y} r={s.r}
                            fill="white" opacity={s.opacity}>
                        <animate
                            attributeName="opacity"
                            values={`${s.opacity};${s.opacity * 0.2};${s.opacity}`}
                            dur={`${s.twinkleDur}s`}
                            begin={`${s.twinkleDelay}s`}
                            repeatCount="indefinite"
                        />
                    </circle>
                ))}

                {/* ── CONSTELLATION LINES ── */}
                <ConstellationLines
                    constellations={CONSTELLATIONS}
                    stars={STARS}
                    visible={showConstellations}
                />

                {/* ── NAMED STARS ── */}
                {STARS.map(star => {
                    const r     = magToRadius(star.mag)
                    const color = STAR_COLORS[star.type] || STAR_COLORS.default
                    const isBright = star.mag < 1.0
                    const isHovered = hoveredStar?.id === star.id

                    return (
                        <g
                            key={star.id}
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={e => handleStarHover(e, star)}
                            onMouseLeave={() => { setHoveredStar(null); setTooltipPos(null) }}
                            onMouseMove={e => tooltipPos && setTooltipPos({ x: e.clientX, y: e.clientY })}
                        >
                            {/* Hover ring */}
                            {isHovered && (
                                <circle cx={star.x} cy={star.y}
                                        r={r + 4} fill="none"
                                        stroke={color} strokeWidth="0.8" strokeOpacity="0.5"
                                        strokeDasharray="3 2"
                                />
                            )}

                            {/* Glow halo for bright stars */}
                            {isBright && (
                                <circle cx={star.x} cy={star.y}
                                        r={r * 2.5} fill={color} opacity="0.08"
                                />
                            )}

                            {/* The star itself */}
                            <circle
                                cx={star.x} cy={star.y} r={r}
                                fill={color}
                                filter={isBright ? 'url(#starGlowBright)' : 'url(#starGlow)'}
                                opacity={isHovered ? 1 : 0.9}
                            >
                                {/* Twinkling animation */}
                                <animate
                                    attributeName="r"
                                    values={`${r};${r * 0.85};${r}`}
                                    dur={`${2 + star.id % 3}s`}
                                    repeatCount="indefinite"
                                />
                            </circle>

                            {/* Star name label */}
                            {showLabels && (
                                <text
                                    x={star.x + r + 3} y={star.y + r / 2}
                                    fill={color}
                                    fontSize="6"
                                    fontFamily="'Exo 2', sans-serif"
                                    opacity={isHovered ? 1 : (isBright ? 0.7 : 0.4)}
                                >
                                    {star.name}
                                </text>
                            )}
                        </g>
                    )
                })}
            </svg>

            {/* Tooltip rendered outside SVG (in DOM) for proper stacking */}
            <StarTooltip star={hoveredStar} svgPoint={tooltipPos} />

            {/* Bottom legend */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2
        flex gap-4 bg-cosmic-card/70 backdrop-blur-sm
        rounded-full px-5 py-2 border border-cosmic-teal/15">
                {[
                    { color: '#FFD740', label: 'Yellow Giant' },
                    { color: '#AAD4FF', label: 'Blue Giant' },
                    { color: '#FF6B35', label: 'Red Supergiant' },
                    { color: '#FFFFFF', label: 'White Star' },
                ].map(item => (
                    <div key={item.label} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full"
                             style={{ backgroundColor: item.color, boxShadow: `0 0 4px ${item.color}` }} />
                        <span className="font-display text-[9px] uppercase tracking-wider text-cosmic-text/40">
              {item.label}
            </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StarGrid