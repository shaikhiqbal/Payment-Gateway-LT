import Chip from '@mui/material/Chip'

export default function StatusChip({ status }: { status: string }) {
  const map: any = {
    Paid: { color: 'success', icon: 'tabler:check' },
    Refunded: { color: 'info', icon: 'tabler:arrow-back' },
    Cancelled: { color: 'error', icon: 'tabler:x' },
    Overdue: { color: 'warning', icon: 'tabler:alert-triangle' },
    'Partially Paid': { color: 'primary', icon: 'tabler:circle-half-2' },
    Draft: { color: 'default', icon: 'tabler:note' },
    Unpaid: { color: 'error', icon: 'tabler:alert-circle' }
  }

  const cfg = map[status]

  return <Chip label={status} color={cfg?.color} size='small' />
}
