# Add Funds Feature

## Overview
A production-ready React component for adding funds to user accounts with multiple payment methods and smooth animations.

## Features
- **Step Indicator**: Shows current progress (Step 2 of 4)
- **Currency Selection**: EUR (default), USD, GBP
- **Amount Selection**: Preset buttons (€50, €100, €200) + custom input
- **Payment Methods**: 6 options including Skrill, Neteller, Sofort, Trustly, Credit/Debit Card, Bank Transfer
- **Save Default**: Toggle to save payment method as default
- **Animations**: Smooth fade-in, hover effects, and micro-interactions using motion/react

## File Structure
```
src/views/pages/add-money/
├── AddMoney.tsx              # Main component
├── types.ts                  # TypeScript interfaces
├── components/
│   ├── index.ts             # Component exports
│   ├── StepIndicator.tsx    # Progress indicator
│   ├── AmountSelector.tsx   # Amount selection with presets
│   └── PaymentMethodGrid.tsx # Payment method cards
└── README.md                # This file
```

## Components

### AddMoney (Main Component)
- Manages all form state
- Handles validation (amount > 0 + payment method selected)
- Mock API handler ready for integration
- Responsive layout with animations

### StepIndicator
- Reusable progress indicator
- Shows current step and progress bar
- Configurable steps and title

### AmountSelector
- Preset amount buttons with hover/tap animations
- Custom amount input with currency symbol
- Validates numeric input only
- Scale animation on selection

### PaymentMethodGrid
- Grid of selectable payment method cards
- Hover and selection animations
- Icon placeholders (ready for actual icons)
- Responsive grid layout

## Usage
```tsx
import AddMoney from 'src/views/pages/add-money/AddMoney'

// Used in pages/add-money/index.tsx with two-column layout
```

## Animations
- **Page Load**: Fade + slide-in (0.4s ease-out)
- **Amount Selection**: Scale animation (1.05x) with shadow
- **Payment Cards**: Hover lift (scale 1.02, y: -2px)
- **Button Press**: Tap scale (0.98x)
- **Input Focus**: Scale (1.02x) on focus

## Accessibility
- Keyboard navigation support
- Proper ARIA labels
- Focus states on all interactive elements
- Semantic HTML structure

## API Integration
The `handleContinue` function is ready for API integration:
```tsx
const formData: AddFundsFormData = {
  amount: selectedAmount,
  currency: selectedCurrency,
  paymentMethod: selectedPaymentMethod,
  saveAsDefault
}
```

## Styling
- Uses existing MUI theme colors and spacing
- Follows project's design tokens
- Responsive breakpoints (xs, sm, md)
- No hardcoded colors or magic numbers

## Future Enhancements
- Add payment method icons
- Implement actual API calls
- Add form validation messages
- Add loading states
- Add success/error feedback