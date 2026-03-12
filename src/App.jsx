import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './pages/Dashboard'
import SolarSystem from './pages/SolarSystem'
import Objects from './pages/Objects'
import StarsMap from './pages/StarsMap'
import APOD from './pages/APOD'
import SpaceEvents from './pages/SpaceEvents'

function App() {
    return (
        // BrowserRouter enables URL-based navigation
        <BrowserRouter>
            <Routes>
                {/* AppLayout wraps ALL routes — it provides the Navbar + Sidebar */}
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="solar-system" element={<SolarSystem />} />
                    <Route path="objects" element={<Objects />} />
                    <Route path="stars" element={<StarsMap />} />
                    <Route path="apod" element={<APOD />} />
                    <Route path="events" element={<SpaceEvents />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App