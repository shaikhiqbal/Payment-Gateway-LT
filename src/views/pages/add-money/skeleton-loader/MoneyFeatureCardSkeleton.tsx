import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Grid from '@mui/material/Grid'

const MoneyFeatureCardSkeleton = () => {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 5,
        height: '170px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Top Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Left Icon Placeholder */}
        <Skeleton variant='rounded' width={60} height={60} sx={{ borderRadius: 3 }} />

        {/* Balance Section */}
        <Box sx={{ textAlign: 'right' }}>
          <Skeleton variant='text' width={90} height={18} />
          <Skeleton variant='text' width={140} height={28} />
        </Box>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Wallet ID Placeholder */}
        <Skeleton variant='text' width={120} height={20} />

        {/* Add Funds Button Placeholder */}
        <Skeleton variant='rounded' width={110} height={36} sx={{ borderRadius: 4 }} />
      </Box>
    </Card>
  )
}

export default MoneyFeatureCardSkeleton
