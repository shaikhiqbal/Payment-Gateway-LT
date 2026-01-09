// ** MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** Icon Component
import Icon from 'src/@core/components/icon'

// ** Types
interface MoneyFeatureCardProps {
  id: string
  labelTop: string | null
  labelMain: string
  processing: string | null
  colors: {
    from: string
    to: string
  }
  action: string
  icon: string
  info: string
  openMethodForm: (method: string) => void
}

const MoneyFeatureCard = (props: MoneyFeatureCardProps) => {
  const { labelTop, labelMain, processing, colors, icon, info } = props

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 5,
        height: '170px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
        color: '#fff',
        position: 'relative'
      }}
    >
      {/* Top Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Icon Box */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: 3,
            bgcolor: 'rgba(255,255,255,0.15)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          <Icon icon={icon} fontSize={34} />
        </Box>

        {/* Balance Section */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography sx={{ fontSize: 14, opacity: 0.8, color: '#fff' }}>{processing ? processing : ''}</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: 26, fontWeight: 700, color: '#fff' }}>{labelMain}</Typography>
            {/* <Typography sx={{ opacity: 0.6, color: '#fff' }}>00</Typography> */}

            <IconButton size='small' sx={{ color: 'white' }}>
              <Icon icon='tabler:eye' />
            </IconButton>
          </Box>
          <Typography sx={{ fontSize: 14, color: '#fff' }}>{info}</Typography>
        </Box>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Wallet ID + icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* <Icon icon='tabler:copy' fontSize={20} />
          <Icon icon='tabler:share' fontSize={20} /> */}
        </Box>

        {/* Add Funds Button */}
        <Button
          variant='contained'
          sx={{
            bgcolor: '#fff',
            color: colors.from,
            borderRadius: 5,
            px: 3,
            py: 1.2,
            textTransform: 'none',
            fontWeight: 600,
            display: 'flex',
            gap: 1,
            '&:hover': { bgcolor: '#fff' }
          }}
          onClick={() => props.openMethodForm(props.action)}
        >
          <Icon icon='tabler:qrcode' />
          Add funds
        </Button>
      </Box>
    </Card>
  )
}

export default MoneyFeatureCard
