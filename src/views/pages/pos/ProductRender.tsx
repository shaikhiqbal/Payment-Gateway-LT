import React, { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Animation
import { motion } from 'motion/react'

// ** Hooks
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { useDispatch } from 'react-redux'

// ** Action
import { handleAlertSelectCustomer } from 'src/store/pages/pos'
import { addToCart } from 'src/store/pages/pos/cartSlice'

// ** Toast
import toast from 'react-hot-toast'

const MotionImg = motion.img

interface Product {
  id: string
  name: string
  image: string
  price: number
}

interface ProductCardProps {
  name: string
  price: number
  image: string
  items: Product
}

// ** Product Card Component
export const ProductCard: React.FC<ProductCardProps> = ({
  name = 'Goldy Brare',
  price = 23,
  image = 'url',
  ...props
}) => {
  // ** Props
  const { items } = props

  // ** States
  const [added, setAdded] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const isCustomerSelected = useSelector((state: RootState) => state.pos.isCustomerSelected)

  // ** Handle Add To Cart
  const handleAddToCart = () => {
    if (!isCustomerSelected) {
      dispatch(handleAlertSelectCustomer(1))

      toast.error('Please select a customer before adding products to the cart.')

      return
    }
    dispatch(addToCart({ ...items, quantity: 1 }))
    setAdded(true)
  }

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        border: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      {/* Image Box */}
      <Box
        sx={{
          margin: 4,
          aspectRatio: '1 / 1',
          overflow: 'hidden',
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
        <Typography variant='body1' fontWeight={900}>
          {name}
        </Typography>

        <Typography variant='body2' color='text.secondary' sx={{ borderTop: '1px dashed gray', pt: 2 }}>
          ${price}
        </Typography>
      </CardContent>
      <Button
        variant='contained'
        color={added ? 'success' : 'primary'}
        onClick={() => handleAddToCart()}
        sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        {added ? 'Added To Cart' : 'Add To Cart'}
      </Button>
    </Card>
  )
}

// ** Product Render Component
const ProductCardSkeleton: React.FC = () => {
  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        border: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      {/* Image Skeleton */}
      <Box
        sx={{
          margin: 4,
          aspectRatio: '1 / 1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: theme => (theme.palette.mode === 'light' ? '#F9FAFB' : 'grey.300')
        }}
      >
        <Skeleton variant='rectangular' width='100%' height='100%' />
      </Box>

      {/* Content Skeleton */}
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
        <Skeleton variant='text' width='80%' height={30} />
        <Skeleton variant='text' width='40%' height={20} sx={{ mt: 2 }} />
      </CardContent>

      {/* Button Skeleton */}
      <Box sx={{ width: '100%', py: 2.5 }}>
        <Skeleton variant='rectangular' width='100%' height={40} />
      </Box>
    </Card>
  )
}

export const ProductLoader: React.FC = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ProductCardSkeleton />
        </Grid>
      ))}
    </>
  )
}
