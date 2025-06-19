import mock from 'src/@fake-db/mock'
// ** Types
import { TransactionStatusShap } from 'src/views/dashboards/merchant/types'

const transactionStatus: TransactionStatusShap[] = [
  {
    title: 'Approved',
    icon: 'hugeicons:anonymous',
    amount: 168490.46
  },
  {
    title: 'Onhold',
    icon: 'hugeicons:anonymous',
    amount: 0
  },
  {
    title: 'Declined',
    icon: 'hugeicons:anonymous',
    amount: 0
  },
  {
    title: 'Chargeback',
    icon: 'hugeicons:anonymous',
    amount: 377.0
  }
]

mock.onGet('/api/dashboard/transaction/status').reply(config => {
  return [
    200,
    {
      data: transactionStatus
    }
  ]
})
