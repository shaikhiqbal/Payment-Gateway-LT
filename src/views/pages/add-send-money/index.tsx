// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Motion Imports
import { motion } from 'motion/react'

// ** Custom Components
import { AmountSelector, StepIndicator } from './components'

// ** Types
import { PaymentMethod, AddFundsFormData } from './types'

// ** Payments Components
// ** Add Money
import { ACH, QrCode, Wire } from './add-money'

// ** Send Money
import {
  ACHTransfer,
  EmailPhoneTransfer,
  EscrowSetup,
  Canneda,
  Check,
  OtherWallet,
  SendToCard,
  WalletTransfer
} from './send-money'

import ReceiptEditor from '../cheque/ReceiptEditor'

// ** Send Mopney

const PRESET_AMOUNTS = [50, 100, 200]
const CURRENCIES = ['EUR', 'USD', 'GBP']

const PAYMENT_COMPONENT_MAP: Record<string, JSX.Element> = {
  ach: <ACH />,
  evoucher: <Wire />,
  wire: <Wire />,
  qrcode: <QrCode />,
  'wallet-transfer': <WalletTransfer />,
  'ach-transfer': <ACHTransfer />,
  'email-phone': <EmailPhoneTransfer />,
  escrow: <EscrowSetup />,
  canada: <Canneda />,
  check: <ReceiptEditor />,
  'other-wallet': <OtherWallet />,
  card: <SendToCard />
}

const AddMoney = ({ PAYMENT_METHODS, title }: { PAYMENT_METHODS: PaymentMethod[]; title: string }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('EUR')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [saveAsDefault, setSaveAsDefault] = useState(false)

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    if (value) {
      setSelectedAmount(parseFloat(value) || null)
    } else {
      setSelectedAmount(null)
    }
  }

  // const handlePaymentMethodSelect = (methodId: string) => {
  //   setSelectedPaymentMethod(methodId)
  // }

  const handleContinue = () => {
    const formData: AddFundsFormData = {
      amount: selectedAmount,
      currency: selectedCurrency,
      paymentMethod: selectedPaymentMethod,
      saveAsDefault
    }

    // Mock handler - API integration can be added here
    console.log('Add Funds Form Data:', formData)
  }

  const isFormValid = selectedAmount && selectedAmount > 0 && selectedPaymentMethod

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card>
        <CardContent sx={{ p: 6 }}>
          <StepIndicator title={title} />

          <Box sx={{ mt: 6 }}>
            {/* Currency Selector */}
            <Box sx={{ mb: 4 }}>
              <FormControl size='small' sx={{ minWidth: 120 }}>
                <InputLabel>Currency</InputLabel>
                <Select value={selectedCurrency} label='Currency' onChange={e => setSelectedCurrency(e.target.value)}>
                  {CURRENCIES.map(currency => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Amount Selection */}
            <Box sx={{ mb: 6 }}>
              <Typography variant='h6' sx={{ mb: 3, fontWeight: 600 }}>
                Select Amount
              </Typography>

              <AmountSelector
                presetAmounts={PRESET_AMOUNTS}
                selectedAmount={selectedAmount}
                customAmount={customAmount}
                currency={selectedCurrency}
                onAmountSelect={handleAmountSelect}
                onCustomAmountChange={handleCustomAmountChange}
              />
            </Box>

            {/* Payment Methods */}
            <Box sx={{ mb: 6 }}>
              <FormControl fullWidth size='medium'>
                <InputLabel id='payment-method-label'>Payment Method</InputLabel>

                <Select
                  labelId='payment-method-label'
                  id='payment-method-select'
                  value={selectedPaymentMethod ?? ''}
                  label='Payment Method'
                  onChange={(e: SelectChangeEvent) => setSelectedPaymentMethod(e.target.value)}
                  sx={{
                    width: 300,
                    height: 56,
                    borderRadius: '14px',
                    '& .MuiSelect-select': {
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '14px'
                    }
                  }}
                >
                  <MenuItem value=''>
                    <em>Select payment method</em>
                  </MenuItem>

                  {PAYMENT_METHODS.map(method => (
                    <MenuItem key={method.id} value={method.id}>
                      {method.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Save as Default Toggle */}
            {/* <Box sx={{ mb: 6 }}>
              <FormControlLabel
                control={
                  <Switch checked={saveAsDefault} onChange={e => setSaveAsDefault(e.target.checked)} color='primary' />
                }
                label='Save as default payment method'
              />
            </Box> */}

            {selectedPaymentMethod && <Box sx={{ mb: 6 }}>{PAYMENT_COMPONENT_MAP[selectedPaymentMethod]}</Box>}

            {/* Continue Button */}
            <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.1 }}>
              <Button
                variant='contained'
                size='large'
                fullWidth
                disabled={!isFormValid}
                onClick={handleContinue}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none'
                }}
              >
                Select payment and continue
              </Button>
            </motion.div>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AddMoney
