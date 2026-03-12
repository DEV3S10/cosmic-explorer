import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const discoveryData = [
    { year: '1990', asteroids: 120 },
    { year: '1995', asteroids: 280 },
    { year: '2000', asteroids: 850 },
    { year: '2005', asteroids: 2400 },
    { year: '2010', asteroids: 6800 },
    { year: '2015', asteroids: 14000 },
    { year: '2020', asteroids: 28000 },
    { year: '2024', asteroids: 35000 },
]

const missionData = [
    { name: 'NASA', missions: 68, color: '#45A29E' },
    { name: 'ESA', missions: 31, color: '#66FCF1' },
    { name: 'SpaceX', missions: 24, color: '#F5B700' },
    { name: 'ISRO', missions: 18, color: '#C1440E' },
    { name: 'CNSA', missions: 15, color: '#4B70DD' },
]

// Custom tooltip styled to match our theme
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-cosmic-card border border-cosmic-teal/30 rounded-lg p-3 shadow-glow">
                <p className="font-display text-cosmic-teal text-xs">{label}</p>
                <p className="font-body text-cosmic-glow text-sm font-bold">
                    {payload[0].value.toLocaleString()}
                </p>
            </div>
        )
    }
    return null
}

const StatsSummary = () => {
    return (
        <div className="rounded-2xl p-6 bg-cosmic-card/60 backdrop-blur-sm
      border border-cosmic-teal/20 hover:border-cosmic-teal/30
      transition-all duration-500">

            <h3 className="font-display text-sm text-cosmic-glow uppercase tracking-widest mb-6
        flex items-center gap-2">
                <span>📊</span> Space Discovery Stats
            </h3>

            {/* AREA CHART — asteroid discovery over time */}
            <div className="mb-6">
                <p className="font-body text-cosmic-text/50 text-xs mb-3 uppercase tracking-wide">
                    Asteroid Discoveries Over Time
                </p>
                <ResponsiveContainer width="100%" height={140}>
                    <AreaChart data={discoveryData}>
                        <defs>
                            {/* Gradient fill for the area */}
                            <linearGradient id="asteroidGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor="#66FCF1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#66FCF1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="year" tick={{ fill: '#C5C6C7', fontSize: 10, fontFamily: 'Exo 2' }}
                               axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="asteroids"
                            stroke="#66FCF1"
                            strokeWidth={2}
                            fill="url(#asteroidGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* BAR CHART — space agencies */}
            <div>
                <p className="font-body text-cosmic-text/50 text-xs mb-3 uppercase tracking-wide">
                    Missions by Agency
                </p>
                <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={missionData} barSize={24}>
                        <XAxis dataKey="name" tick={{ fill: '#C5C6C7', fontSize: 10, fontFamily: 'Exo 2' }}
                               axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="missions" radius={[4, 4, 0, 0]}
                             fill="#45A29E"
                            // Each bar gets its own color from the data
                             label={false}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default StatsSummary