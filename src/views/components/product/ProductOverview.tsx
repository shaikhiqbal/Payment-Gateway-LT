// ** MUI Imports

// ** Hook Imports
import { ProductFormData } from './ProductInformation'

// ** Types Imports
import { UseFormWatch } from 'react-hook-form'

// ** Styled Imports
import { styled } from '@mui/material/styles'

// ** MUI Imports
import { Box, Chip, alpha, Typography, CardContent, keyframes } from '@mui/material'

// ** Third Party
import namer from 'color-namer'

interface ProductOverviewProps {
  ImageUploader: React.ReactNode
  watch: UseFormWatch<ProductFormData>
  variants: {
    [key: string]: string
  }
}

// ** Animations
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const ColorChip = styled(Chip)(({ theme }) => ({
  height: 22,
  borderRadius: theme.spacing(1),
  fontSize: '0.75rem',
  fontWeight: 500,
  border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
  transition: 'all 0.2s ease',
  animation: `${slideIn} 0.3s ease-out`,
  '&:hover': {
    transform: 'scale(1.05)'
  }
}))

const ColorChipRender = ({ color }: { color: string }) => {
  const hex = color.toUpperCase()
  const colorName = namer(hex).ntc[0]?.name || hex
  return (
    <ColorChip
      size='small'
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: color,
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          />
          {colorName}
        </Box>
      }
      sx={{
        bgcolor: 'white',
        color: 'black',
        border: '1px solid rgba(0,0,0,0.12)',
        '&:hover': {
          bgcolor: 'rgba(0,0,0,0.04)'
        }
      }}
    />
  )
}
const renderVariantNames = (variants: { [key: string]: string }) => {
  return Object.entries(variants).map(([key, value]) => {
    if (key.toLowerCase() === 'color') {
      return (
        <Typography sx={{ fontWeight: 500, mb: 3 }} key={key}>
          {key}: <ColorChipRender key={key} color={value} />
        </Typography>
      )
    }
    return <Typography sx={{ fontWeight: 100, mb: 3 }} key={key}>{`${key}: ${value}`}</Typography>
  })
}

const ProductOverview: React.FC<ProductOverviewProps> = ({ ImageUploader, variants }) => {
  return (
    <Box>
      <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>{ImageUploader}</CardContent>
      <CardContent>{renderVariantNames(variants)}</CardContent>
    </Box>
  )
}

export default ProductOverview
