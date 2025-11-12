// ** React Imports
import { MouseEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid, { GridProps } from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { ProductFormData } from './ProductInformation'
import { UseFormWatch } from 'react-hook-form'

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

interface ProductOverviewProps {
  ImageUploader: React.ReactNode
  watch: UseFormWatch<ProductFormData>
}

const ProductOverview: React.FC<ProductOverviewProps> = ({ ImageUploader, watch }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>{ImageUploader}</CardContent>
      <CardContent>
        <Typography variant='h6' sx={{ mb: 2 }}>
          {watch('productName') || 'Apple iPhone 11 Pro'}
        </Typography>
        <Typography variant='body2' sx={{ mb: 3.5 }}>
          {watch('description') ||
            'Apple iPhone 11 Pro smartphone. Announced Sep 2019. Features 5.8″ display Apple A13 Bionic'}
        </Typography>
        <Typography sx={{ fontWeight: 500, mb: 3 }}>
          Price:{' '}
          <Box component='span' sx={{ fontWeight: 'bold' }}>
            {/* {watch('productPrice') || '$899'} */}
          </Box>
        </Typography>
      </CardContent>
    </Box>
  )
}

export default ProductOverview
