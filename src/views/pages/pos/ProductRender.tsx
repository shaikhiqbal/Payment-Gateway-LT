import React from 'react'

// ** MUI Imports
import Skeleton from '@mui/material/Skeleton'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Box, Grid } from '@mui/material'

// ** Animation
import { AnimatePresence, motion } from 'motion/react'

const MotionImg = motion.img

interface Product {
  id: string
  name: string
  image: string
  price: number
}

interface ProductRenderProps {
  list: Product[]
  loading: boolean
}

interface ProductCardProps {
  name: string
  price: number
  image: string
}

const ProductCard: React.FC<ProductCardProps> = ({ name = 'Goldy Brare', price = 23, image = 'url' }) => {
  return (
    <Card
      sx={{
        maxWidth: 250,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer'
      }}
    >
      {/* Image Box */}
      <Box
        sx={{
          margin: 4,
          aspectRatio: '1 / 1',
          overflow: 'hidden', // important: clip the scaling image
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          bgcolor: theme => (theme.palette.mode === 'light' ? '#F9FAFB' : 'grey.300')
        }}
      >
        <MotionImg
          src={image}
          alt={name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }} // 🔥 only image scales on hover
        />
      </Box>

      {/* Content */}
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: theme => `${theme.spacing(0, 5.25, 4)} !important`,
          gap: 1
        }}
      >
        <Typography variant='subtitle1' fontWeight='bold'>
          {name}
        </Typography>

        <Typography variant='body2' color='text.secondary' sx={{ borderTop: '1px dashed gray', pt: 1 }}>
          ${price}
        </Typography>
      </CardContent>
    </Card>
  )
}

const ProductRender = (props: ProductRenderProps) => {
  const { list, loading } = props

  const renderProduct = list.map((item: Product) => (
    <ProductCard key={item.id} name={item.name} price={item.price} image={item.image} />
  ))

  return (
    <Grid container spacing={4}>
      {list.map((item: Product) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={item.id}>
          <ProductCard name={item.name} price={item.price} image={item.image} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductRender
