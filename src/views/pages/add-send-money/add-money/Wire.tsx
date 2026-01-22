// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'

const Wire = () => {
  return (
    <>
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography variant='h6' fontWeight={600}>
          Bank Details
        </Typography>
      </Box>

      {/* Body */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant='caption' color='text.secondary' mb={0.5}>
              Account Number
            </Typography>
            <TextField fullWidth size='small' value='613036703' InputProps={{ readOnly: true }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant='caption' color='text.secondary' mb={0.5}>
              Routing Number
            </Typography>
            <TextField fullWidth size='small' value='322271627' InputProps={{ readOnly: true }} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Info */}
        <Box
          sx={{
            p: 2,
            borderRadius: 1,
            backgroundColor: theme => theme.palette.action.hover
          }}
        >
          <Typography variant='body2' color='text.secondary'>
            Please mention your <strong>Wallet ID (7352012357935562)</strong> in the reference section while making the
            wire transfer. This helps us identify and load your wallet faster.
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default Wire
