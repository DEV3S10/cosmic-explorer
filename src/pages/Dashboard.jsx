import { motion } from 'framer-motion'
import WelcomeCard from '../components/dashboard/WelcomeCard'
import FeaturedPlanet from '../components/dashboard/FeaturedPlanet'
import StatsSummary from '../components/dashboard/StatsSummary'
import UpcomingEvents from '../components/dashboard/UpcomingEvents'

// This is a "stagger container" — it tells children to animate in sequence
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15  // each child waits 150ms before starting
        }
    }
}

// Each child fades up into place
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const Dashboard = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 md:p-8 max-w-7xl mx-auto"
        >
            {/* Page header */}
            <motion.div variants={itemVariants} className="mb-8">
                <h1 className="font-display text-3xl font-bold text-cosmic-glow tracking-wider uppercase
          [text-shadow:0_0_20px_rgba(102,252,241,0.5)]">
                    Mission Control
                </h1>
                <p className="text-cosmic-text/60 font-body mt-1 text-sm tracking-wide">
                    Your personal space exploration dashboard
                </p>
            </motion.div>

            {/* TOP ROW: Welcome + Featured Planet side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <motion.div variants={itemVariants} className="lg:col-span-1">
                    <WelcomeCard />
                </motion.div>
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <FeaturedPlanet />
                </motion.div>
            </div>

            {/* BOTTOM ROW: Stats + Events side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                    <StatsSummary />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <UpcomingEvents />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Dashboard