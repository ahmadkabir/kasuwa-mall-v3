import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { tokenManager } from '@/lib/api/config'

export interface User {
  id: string
  email: string
  firstname: string
  lastname: string
  username: string
  role: 'admin' | 'vendor' | 'user'
  phone?: string
  address?: string
  shopname?: string
  shopaddress?: string
  status?: 'pending' | 'approved'
}

interface UserStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  setUser: (user: User | null) => void
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  setLoading: (isLoading: boolean) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        })
      },

      login: (user, token) => {
        tokenManager.setAuthToken(token)
        if (user.id) {
          tokenManager.setCustomerId(user.id)
        }
        set({
          user,
          isAuthenticated: true,
        })
      },

      logout: () => {
        tokenManager.clearAllTokens()
        set({
          user: null,
          isAuthenticated: false,
        })
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }))
      },

      setLoading: (isLoading) => {
        set({ isLoading })
      },
    }),
    {
      name: 'kasuwa-user-storage',
    }
  )
)
