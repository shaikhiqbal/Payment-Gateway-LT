import Grid from '@mui/material/Grid'
import StatCard from './StatCard'

export default function InvoiceHeader() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <StatCard
          title='Total Invoices'
          value='$25,000'
          percent='↑ 5.62% from last month'
          icon='tabler:wallet'
          color='success.main'
          avatarColor='success'
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <StatCard
          title='Paid Invoices'
          value='$18,500'
          percent='↑ 11.4% from last month'
          icon='tabler:circle-check'
          color='success.main'
          avatarColor='success'
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <StatCard
          title='Pending Invoices'
          value='$6,500'
          percent='↑ 8.52% from last month'
          icon='tabler:clock'
          color='warning.main'
          avatarColor='warning'
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <StatCard
          title='Overdue Invoices'
          value='$2,000'
          percent='↓ 7.45% from last month'
          icon='tabler:alert-circle'
          color='error.main'
          avatarColor='error'
        />
      </Grid>
    </Grid>
  )
}
