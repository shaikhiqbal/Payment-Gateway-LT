// ** MUI Imports
import { Card, CardHeader, CardContent, Skeleton } from '@mui/material'

const ChartLoader = () => {
  return (
    <Card>
      <CardHeader title={<Skeleton width={120} height={28} />} subheader={<Skeleton width={80} height={20} />} />
      <CardContent>
        <Skeleton variant='rectangular' height={400} animation='wave' />
      </CardContent>
    </Card>
  )
}

export default ChartLoader
