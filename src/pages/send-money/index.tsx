// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import SendMoney from 'src/views/pages/add-send-money'

interface PaymentMethod {
  id: string
  name: string
  icon?: string
  description?: string
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'wallet-transfer',
    name: 'Wallet Transfer',
    description: 'Wallet to wallet',
    icon: 'tabler:wallet'
  },
  {
    id: 'ach-transfer',
    name: 'ACH Transfer',
    description: 'Send via bank',
    icon: 'tabler:building-bank'
  },
  {
    id: 'email-phone',
    name: 'Email / Phone',
    description: 'Send via contact',
    icon: 'tabler:mail'
  },
  {
    id: 'canada',
    name: 'Canada',
    description: 'International transfer',
    icon: 'tabler:flag'
  },
  {
    id: 'check',
    name: 'Check',
    description: 'Create & send check',
    icon: 'tabler:check'
  },
  {
    id: 'other-wallet',
    name: 'Other Wallet',
    description: 'Send to external wallet',
    icon: 'tabler:wallet'
  },
  {
    id: 'card',
    name: 'Card',
    description: 'Send to card',
    icon: 'tabler:credit-card'
  }
]

const AddMoneyPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <SendMoney PAYMENT_METHODS={PAYMENT_METHODS} title='Send Funds' />
      </Grid>
    </Grid>
  )
}

AddMoneyPage.acl = {
  action: 'read',
  subject: 'permission'
}
export default AddMoneyPage
