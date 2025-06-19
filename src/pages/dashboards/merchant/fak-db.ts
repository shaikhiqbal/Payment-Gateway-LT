import { TransactionStatusShap } from 'src/views/dashboards/merchant/types'

export const transactionStatus: TransactionStatusShap[] = [
  {
    stats: '$168,490.46',
    title: 'Approved',
    chipText: 'Verified',
    subtitle: 'Total approved transactions',
    avatarIcon: 'material-symbols-light:check-circle-outline',
    avatarColor: 'success',
    chipColor: 'success',
    avatarSize: 40,
    iconSize: 24
  },
  {
    stats: '$0',
    title: 'Onhold',
    chipText: 'Pending',
    subtitle: 'Transactions waiting for approval',
    avatarIcon: 'material-symbols-light:punch-clock',
    avatarColor: 'warning',
    chipColor: 'warning',
    avatarSize: 40,
    iconSize: 24
  },
  {
    stats: '$0',
    title: 'Declined',
    chipText: 'Rejected',
    subtitle: 'Transactions that were declined',
    avatarIcon: 'material-symbols-light:close-small-outline',
    avatarColor: 'error',
    chipColor: 'error',
    avatarSize: 40,
    iconSize: 24
  },
  {
    stats: '$377.00',
    title: 'Chargeback',
    chipText: 'Reversed',
    subtitle: 'Transactions refunded by the bank',
    avatarIcon: 'material-symbols-light:arrow-drop-down-circle-outline',
    avatarColor: 'info',
    chipColor: 'info',
    avatarSize: 40,
    iconSize: 24
  }
]
