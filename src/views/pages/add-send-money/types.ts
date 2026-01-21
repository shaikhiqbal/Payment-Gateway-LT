export interface PaymentMethod {
  id: string
  name: string
  icon?: string
  description?: string
}

export interface AddFundsFormData {
  amount: number | null
  currency: string
  paymentMethod: string | null
  saveAsDefault: boolean
}

export interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  title: string
}

export interface AmountSelectorProps {
  presetAmounts: number[]
  selectedAmount: number | null
  customAmount: string
  currency: string
  onAmountSelect: (amount: number) => void
  onCustomAmountChange: (value: string) => void
}

export interface PaymentMethodGridProps {
  paymentMethods: PaymentMethod[]
  selectedMethod: string | null
  onMethodSelect: (methodId: string) => void
}
