import React from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const actions = [
  { label: 'Hold', color: 'warning', icon: 'tabler:player-pause', modal: '#hold-order' },
  { label: 'Void', color: 'info', icon: 'tabler:trash', modal: '' },
  { label: 'Payment', color: 'success', icon: 'tabler:cash-banknote', modal: '#payment-completed' },
  { label: 'View Orders', color: 'secondary', icon: 'tabler:shopping-cart', modal: '#orders' },
  { label: 'Reset', color: 'primary', icon: 'tabler:reload', modal: '#reset' },
  { label: 'Transaction', color: 'error', icon: 'tabler:refresh-dot', modal: '#recents' }
]
const index = () => {
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: '#fff',
        borderTop: theme => `1px solid ${theme.palette.divider}`,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 2
      }}
    >
      {actions.map((action, idx) => (
        <Button
          key={idx}
          variant='contained'
          color={action.color as any}
          startIcon={<Icon icon={action.icon} />}
          {...(action.modal ? { 'data-bs-toggle': 'modal', 'data-bs-target': action.modal } : {})}
        >
          {action.label}
        </Button>
      ))}
    </Paper>
  )
}

export default index
