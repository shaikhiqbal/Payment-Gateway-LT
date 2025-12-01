import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'

// ** Custom Input
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Type Import
import { ThemeColor } from 'src/@core/layouts/types'

interface Props {
  title: string
  value: string
  percent: string
  icon: string
  color: string
  avatarColor: ThemeColor
}

export default function StatCard({ title, value, percent, icon, color, avatarColor }: Props) {
  return (
    <Card sx={{ p: 3, display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant='subtitle2'>{title}</Typography>
        <Typography variant='h5' sx={{ my: 1 }}>
          {value}
        </Typography>
        <Typography variant='caption' color={color}>
          {percent}
        </Typography>
      </Box>

      <CustomAvatar skin='light' variant='rounded' color={avatarColor} sx={{ mr: 4, width: 34, height: 34 }}>
        <Icon icon={icon} />
      </CustomAvatar>
    </Card>
  )
}
