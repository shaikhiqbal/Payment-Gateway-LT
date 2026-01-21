import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const BalanceCard = () => {
  return (
    <Card
      elevation={0}
      sx={{
        width: 360,
        borderRadius: '20px',
        color: '#fff',
        background: 'linear-gradient(135deg, #1f1f1f 0%, #56BEC5 140%)',
        p: 3
      }}
    >
      {/* Top label */}
      <Typography variant='body2' sx={{ opacity: 0.75, mb: 1 }}>
        Esther’s card balance
      </Typography>

      {/* Amount */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
        <Typography variant='h3' sx={{ fontWeight: 600, lineHeight: 1 }}>
          $838,350
        </Typography>
        <Typography variant='h6' sx={{ ml: 0.5, opacity: 0.8 }}>
          .90
        </Typography>
      </Box>

      <Typography variant='body2' sx={{ opacity: 0.75, mb: 3 }}>
        Available balance
      </Typography>

      {/* Card number */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Typography letterSpacing={2}>****</Typography>
        <Typography letterSpacing={2}>****</Typography>
        <Typography letterSpacing={2}>2165</Typography>
      </Box>
    </Card>
  )
}

export default BalanceCard
