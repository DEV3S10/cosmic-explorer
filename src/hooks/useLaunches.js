import { useState, useEffect } from 'react'
import { fetchUpcomingLaunches } from '../services/nasaApi'

const useLaunches = () => {
    const [data,    setData]    = useState([])
    const [loading, setLoading] = useState(true)
    const [error,   setError]   = useState(null)

    useEffect(() => {
        const load = async () => {
            try {
                const raw = await fetchUpcomingLaunches(8)

                const normalized = (raw.results || []).map(launch => ({
                    id:          launch.id,
                    name:        launch.name,
                    type:        'launch',
                    icon:        '🚀',
                    date:        launch.net?.split('T')[0] || 'TBD',
                    endDate:     launch.net?.split('T')[0] || 'TBD',
                    color:       '#45A29E',
                    intensity:   'High',
                    description: launch.mission?.description || `${launch.launch_service_provider?.name} launch from ${launch.pad?.location?.name || 'Unknown location'}.`,
                    visibility:  launch.pad?.location?.name || 'Unknown',
                    peakTime:    launch.net
                        ? new Date(launch.net).toUTCString()
                        : 'TBD',
                    tips:        `Watch the ${launch.launch_service_provider?.name} livestream for live coverage.`,
                    provider:    launch.launch_service_provider?.name,
                    rocket:      launch.rocket?.configuration?.name,
                    status:      launch.status?.name,
                    videoUrl:    launch.vidURLs?.[0]?.url,
                }))

                setData(normalized)
            } catch (err) {
                // Launch Library has strict rate limits — fail gracefully
                setError(err.message)
                setData([])
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    return { data, loading, error }
}

export default useLaunches