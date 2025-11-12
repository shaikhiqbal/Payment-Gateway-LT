import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// ==========================
// 🧩 Type Definitions
// ==========================
export interface ColorValue {
  label: string
  value: string
}

export interface SizeValue {
  label: string
  value: string
}

export type Variation =
  | { name: 'Color'; values: ColorValue[] }
  | { name: 'Size'; values: SizeValue[] }
  | { name: string; values: string[] | ColorValue[] | SizeValue[] }

export interface Category {
  name: string
  slug: string
  description?: string
  status: 'Active' | 'Inactive'
  variations: Variation[]
}

// ==========================
// 🧪 Fake Database (Mock Data)
// ==========================
const fakeDb: Category[] = [
  {
    name: 'Cloth',
    slug: 'cloth-men',
    description: 'Cotton t-shirt with full flexibility at the best price.',
    status: 'Active',
    variations: [
      {
        name: 'Color',
        values: [
          { label: 'Dark Blue', value: '#050ADA' },
          { label: 'Monza', value: '#CD0314' }
        ]
      },
      {
        name: 'Size',
        values: [
          { label: 'S', value: 's' },
          { label: 'XL', value: 'xl' },
          { label: 'XXL', value: 'xxl' }
        ]
      }
    ]
  },
  {
    name: 'Footwear',
    slug: 'footwear-sports',
    description: 'Lightweight sports shoes designed for comfort and performance.',
    status: 'Active',
    variations: [
      {
        name: 'Color',
        values: [
          { label: 'Black', value: '#000000' },
          { label: 'Red', value: '#FF0000' }
        ]
      },
      {
        name: 'Size',
        values: [
          { label: '7', value: '7' },
          { label: '8', value: '8' },
          { label: '9', value: '9' }
        ]
      }
    ]
  },
  {
    name: 'Watch',
    slug: 'watch-digital',
    description: 'Digital wristwatch with LED display and waterproof design.',
    status: 'Inactive',
    variations: [
      {
        name: 'Color',
        values: [
          { label: 'Silver', value: '#C0C0C0' },
          { label: 'Black', value: '#000000' }
        ]
      },
      {
        name: 'Style',
        values: ['Classic', 'Sport', 'Casual']
      }
    ]
  },
  {
    name: 'Laptop',
    slug: 'laptop-gaming',
    description: 'High-performance gaming laptop with RGB keyboard and RTX GPU.',
    status: 'Active',
    variations: [
      {
        name: 'Color',
        values: [
          { label: 'Gunmetal', value: '#2A3439' },
          { label: 'Black', value: '#000000' }
        ]
      },
      {
        name: 'Size',
        values: [
          { label: '15 inch', value: '15' },
          { label: '17 inch', value: '17' }
        ]
      }
    ]
  },
  {
    name: 'Headphones',
    slug: 'headphones-wireless',
    description: 'Noise-cancelling wireless headphones with 20-hour battery life.',
    status: 'Active',
    variations: [
      {
        name: 'Color',
        values: [
          { label: 'Black', value: '#000000' },
          { label: 'White', value: '#FFFFFF' }
        ]
      },
      {
        name: 'Style',
        values: ['Over-Ear', 'On-Ear', 'In-Ear']
      }
    ]
  },
  {
    name: 'Bag',
    slug: 'bag-travel',
    description: 'Durable travel backpack with multiple compartments and waterproof fabric.',
    status: 'Active',
    variations: [
      {
        name: 'Color',
        values: [
          { label: 'Navy Blue', value: '#001F3F' },
          { label: 'Olive', value: '#708238' }
        ]
      },
      {
        name: 'Size',
        values: [
          { label: 'Medium', value: 'm' },
          { label: 'Large', value: 'l' }
        ]
      }
    ]
  },
  {
    name: 'Sunglasses',
    slug: 'sunglasses-men',
    description: 'Polarized sunglasses offering UV protection and lightweight comfort.',
    status: 'Inactive',
    variations: [
      {
        name: 'Color',
        values: [
          { label: 'Black', value: '#000000' },
          { label: 'Brown', value: '#8B4513' }
        ]
      },
      {
        name: 'Style',
        values: ['Aviator', 'Wayfarer', 'Round']
      }
    ]
  },
  {
    name: 'Furniture',
    slug: 'furniture-office',
    description: 'Modern office furniture set with ergonomic design and durable build.',
    status: 'Active',
    variations: [
      {
        name: 'Color',
        values: [
          { label: 'Walnut', value: '#773F1A' },
          { label: 'Black', value: '#000000' }
        ]
      },
      {
        name: 'Size',
        values: [
          { label: 'Small', value: 's' },
          { label: 'Medium', value: 'm' },
          { label: 'Large', value: 'l' }
        ]
      }
    ]
  },
  {
    name: 'Phone Case',
    slug: 'phonecase-silicon',
    description: 'Flexible silicon phone case providing full protection and grip.',
    status: 'Active',
    variations: [
      {
        name: 'Color',
        values: [
          { label: 'Transparent', value: '#EAEAEA' },
          { label: 'Black', value: '#000000' }
        ]
      },
      {
        name: 'Style',
        values: ['Glossy', 'Matte']
      }
    ]
  },
  {
    name: 'Jewelry',
    slug: 'jewelry-women',
    description: 'Elegant handcrafted jewelry set perfect for all occasions.',
    status: 'Active',
    variations: [
      {
        name: 'Color',
        values: [
          { label: 'Gold', value: '#FFD700' },
          { label: 'Silver', value: '#C0C0C0' }
        ]
      },
      {
        name: 'Style',
        values: ['Necklace', 'Earrings', 'Bracelet']
      }
    ]
  }
]

// ==========================
// 🪣 Initial State
// ==========================
interface CategoryState {
  categories: Category[]
}

const initialState: CategoryState = {
  categories: fakeDb
}

// ==========================
// 🧭 Slice
// ==========================
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload)
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(cat => cat.slug !== action.payload)
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(cat => cat.slug === action.payload.slug)
      if (index !== -1) state.categories[index] = action.payload
    }
  }
})

// ==========================
// 🚀 Exports
// ==========================
export const { addCategory, removeCategory, updateCategory } = categorySlice.actions
export default categorySlice.reducer
