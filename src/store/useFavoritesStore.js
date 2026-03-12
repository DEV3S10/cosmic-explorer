import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// `persist` middleware automatically saves to localStorage
// and rehydrates on page load — favorites survive refreshes!
const useFavoritesStore = create(
    persist(
        (set, get) => ({
            // ── STATE ──
            favorites: [],  // array of space object ids

            // ── ACTIONS ──

            // Add an object to favorites (if not already there)
            addFavorite: (object) => {
                const current = get().favorites
                if (!current.find(f => f.id === object.id)) {
                    set({ favorites: [...current, object] })
                }
            },

            // Remove by id
            removeFavorite: (id) => {
                set({ favorites: get().favorites.filter(f => f.id !== id) })
            },

            // Toggle — adds if absent, removes if present
            toggleFavorite: (object) => {
                const exists = get().favorites.find(f => f.id === object.id)
                if (exists) {
                    get().removeFavorite(object.id)
                } else {
                    get().addFavorite(object)
                }
            },

            // Check if an object is favorited
            isFavorite: (id) => {
                return !!get().favorites.find(f => f.id === id)
            },

            clearFavorites: () => set({ favorites: [] }),
        }),

        {
            name: 'cosmic-explorer-favorites',  // localStorage key
            // Only persist the favorites array, not the action functions
            partialize: (state) => ({ favorites: state.favorites }),
        }
    )
)

export default useFavoritesStore