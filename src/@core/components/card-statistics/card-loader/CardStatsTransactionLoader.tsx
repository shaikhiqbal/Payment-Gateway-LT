// ** MUI Imports
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'

const CardStatsTransactionLoader = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {/* Avatar Skeleton */}
        <Skeleton variant='circular' width={42} height={42} sx={{ mb: 3.5 }} />

        {/* Title */}
        <Skeleton variant='text' width={120} height={28} sx={{ mb: 1 }} />

        {/* Subtitle */}
        <Skeleton variant='text' width={100} height={20} sx={{ mb: 1 }} />

        {/* Stats */}
        <Skeleton variant='text' width={80} height={20} sx={{ mb: 3.5 }} />

        {/* Chip */}
        <Skeleton variant='rounded' width={60} height={24} />
      </CardContent>
    </Card>
  )
}

export default CardStatsTransactionLoader
