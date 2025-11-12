// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Hook Imports
import { ProductFormData } from './ProductInformation'

// ** Types Imports
import { UseFormWatch } from 'react-hook-form'

interface ProductOverviewProps {
  ImageUploader: React.ReactNode
  watch: UseFormWatch<ProductFormData>
}

const ProductOverview: React.FC<ProductOverviewProps> = ({ ImageUploader, watch }) => {
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
