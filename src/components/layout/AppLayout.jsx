import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

// Outlet is a special React Router component
// It renders whatever child route is currently active
// So if URL is /solar-system, Outlet renders <SolarSystem />

const AppLayout = () => {
    return (
        <div className="min-h-screen bg-cosmic-bg font-body">

            {/* Fixed top navbar */}
            <Navbar />

            {/* Content area below navbar */}
            {/* pt-[73px] pushes content below the fixed navbar height */}
            <div className="flex pt-[73px] min-h-screen">

                {/* Sidebar — hidden on mobile, visible on md+ screens */}
                <div className="hidden md:block flex-shrink-0 sticky top-[73px] h-[calc(100vh-73px)]">
                    <Sidebar />
                </div>

                {/* Main page content — takes remaining space */}
                <main className="flex-1 overflow-auto relative">
                    {/* Subtle animated background grid */}
                    <div className="
            fixed inset-0 pointer-events-none
            bg-[linear-gradient(rgba(69,162,158,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(69,162,158,0.03)_1px,transparent_1px)]
            bg-[size:64px_64px]
            z-0
          " />

                    {/* Actual page renders here */}
                    <div className="relative z-10">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    )
}

export default AppLayout