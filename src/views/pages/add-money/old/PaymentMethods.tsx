import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

const methods = ['Skrill', 'Neteller', 'Sofort', 'Trustly', 'Credit / Debit', 'Bank Transfer']

const PaymentMethods = () => {
  return (
    <Grid container spacing={2} mb={4}>
      {methods.map(method => (
        <Grid item xs={6} md={4} key={method}>
          <Paper
            variant='outlined'
            sx={{
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main'
              }
            }}
          >
            <Typography variant='body2'>{method}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default PaymentMethods
