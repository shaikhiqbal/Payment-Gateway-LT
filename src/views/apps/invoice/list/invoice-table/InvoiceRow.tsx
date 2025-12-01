import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Avatar from '@mui/material/Avatar'
import StatusChip from './StatusChip'

export default function InvoiceRow({ item }: any) {
  return (
    <TableRow hover>
      <TableCell>{item.id}</TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar src={item.avatar} sx={{ width: 32, height: 32 }} />
        {item.customer}
      </TableCell>

      <TableCell>{item.createdOn}</TableCell>
      <TableCell>{item.amount}</TableCell>
      <TableCell>{item.paid}</TableCell>

      <TableCell>
        <StatusChip status={item.status} />
      </TableCell>

      <TableCell>{item.paymentMode}</TableCell>
      <TableCell>{item.dueDate}</TableCell>
    </TableRow>
  )
}
