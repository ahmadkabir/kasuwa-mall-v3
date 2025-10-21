import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  product_id: string
  name: string
  price: number
  quantity: number
  image_urls: string
  maxQuantity: number
  variant?: {
    size?: string
    color?: string
  }
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemCount: (productId: string) => number
  getTotalItems: () => number
  getTotalPrice: () => number
  setIsOpen: (isOpen: boolean) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          (item) => item.product_id === newItem.product_id
        )

        if (existingItemIndex > -1) {
          const updatedItems = [...items]
          const currentQuantity = updatedItems[existingItemIndex].quantity
          const maxQuantity = newItem.maxQuantity || 99

          if (currentQuantity < maxQuantity) {
            updatedItems[existingItemIndex].quantity += 1
            set({ items: updatedItems })
          }
        } else {
          set({
            items: [...items, { ...newItem, quantity: 1 }],
          })
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.product_id !== productId),
        })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set({
          items: get().items.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: Math.min(quantity, item.maxQuantity || 99) }
              : item
          ),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product_id === productId)
        return item?.quantity || 0
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },

      setIsOpen: (isOpen) => {
        set({ isOpen })
      },
    }),
    {
      name: 'kasuwa-cart-storage',
    }
  )
)
