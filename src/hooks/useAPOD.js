import { useState, useEffect, useCallback } from 'react'
import { fetchAPOD, formatDateForAPI } from '../services/nasaApi'

// Simple in-memory cache: { 'YYYY-MM-DD': apodData }
// Prevents re-fetching the same date if user navigates back
const cache = {}

const useAPOD = (date = null) => {
    const [data, setData]       = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)

    // Convert date to the string key NASA expects
    // null date = today (no date param)
    const dateKey = date ? formatDateForAPI(date) : ''

    const load = useCallback(async () => {
        setLoading(true)
        setError(null)

        // Check cache first — instant return if we've already fetched this date
        if (cache[dateKey]) {
            setData(cache[dateKey])
            setLoading(false)
            return
        }

        try {
            const result = await fetchAPOD(dateKey)
            cache[dateKey] = result  // save to cache for next time
            setData(result)
        } catch (err) {
            setError(err.message)
            setData(null)
        } finally {
            // finally always runs — even if there was an error
            setLoading(false)
        }
    }, [dateKey])

    // Re-fetch whenever the date changes
    useEffect(() => {
        load()
    }, [load])

    return { data, loading, error, refetch: load }
}

export default useAPOD