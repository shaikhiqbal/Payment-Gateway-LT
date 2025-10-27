import React, { useEffect, useState } from 'react'
import { Modal, Box, Typography, IconButton, Divider, Button, TextField, CardMedia } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

// import { Add, Remove, Close } from '@mui/icons-material'

// ** Icon
import Icon from 'src/@core/components/icon'

// ** Hooks
import { useDispatch } from 'react-redux'

// ** Action
import { updateQuantity } from 'src/store/pages/pos/cartSlice'

// ** Types
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface EditCartProps {
  open: boolean
  onClose: () => void
  product: CartItem | null // ✅ allow null safely
}

// ** Component
const EditCart: React.FC<EditCartProps> = ({ open, onClose, product }) => {
  const [saveLoader, setSaveLoader] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch()

  // ** Form Hooks
  const { control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      quantity: 1
    }
  })

  const quantity = watch('quantity')

  useEffect(() => {
    if (product && open) {
      setValue('quantity', product.quantity)
    }
  }, [open, product, setValue])

  // If product is null, don’t render content
  if (!product) return null

  const handleIncrease = () => setValue('quantity', quantity + 1)
  const handleDecrease = () => setValue('quantity', quantity > 1 ? quantity - 1 : 1)

  // Handle Save
  const handleSave = handleSubmit(data => {
    setSaveLoader(true)
    setTimeout(() => {
      dispatch(updateQuantity({ id: product.id, quantity: data.quantity }))
      onClose()
      setSaveLoader(false)
      reset()
    }, 600)
  })

  //   useEffect(() => {
  //     if (product) {
  //       setValue('quantity', product.quantity)
  //     }
  //   }, [reset, product])

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          width: 380,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {/* Header */}
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6' fontWeight={600}>
            Edit Item
          </Typography>
          <IconButton
            aria-label='capture screenshot'
            color='secondary'
            size='small'
            sx={{ bgcolor: 'grey.100' }}
            onClick={onClose}
          >
            <Icon icon='tabler:x' fontSize='inherit' />
          </IconButton>
        </Box>

        <Divider />

        {/* Product Preview */}
        <Box display='flex' alignItems='center' gap={2}>
          <CardMedia
            component='img'
            src={product.image}
            alt={product.name}
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              objectFit: 'cover',
              boxShadow: 1
            }}
          />
          <Box>
            <Typography variant='subtitle1' fontWeight={600}>
              {product.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              ${product.price.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Quantity Controller */}
        <Controller
          name='quantity'
          control={control}
          render={({ field: { value, onChange } }) => (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              bgcolor='grey.50'
              borderRadius={2}
              p={1.5}
            >
              <Typography variant='body2' fontWeight={600}>
                Quantity
              </Typography>

              <Box display='flex' alignItems='center' gap={1}>
                <IconButton
                  aria-label='capture screenshot'
                  color='primary'
                  size='small'
                  sx={{ bgcolor: 'grey.100' }}
                  onClick={handleDecrease}
                >
                  <Icon icon='tabler:minus' fontSize='inherit' />
                </IconButton>

                <TextField
                  type='number'
                  size='small'
                  value={value}
                  onChange={e => onChange(Number(e.target.value))}
                  inputProps={{
                    style: { textAlign: 'center', width: 50 }
                  }}
                />
                <IconButton
                  aria-label='capture screenshot'
                  color='primary'
                  size='small'
                  sx={{ bgcolor: 'grey.100' }}
                  onClick={handleIncrease}
                >
                  <Icon icon='tabler:plus' fontSize='inherit' />
                </IconButton>
              </Box>
            </Box>
          )}
        />

        {/* Summary */}
        <Box display='flex' justifyContent='space-between' mt={1}>
          <Typography variant='subtitle2' color='text.secondary'>
            Total
          </Typography>
          <Typography variant='subtitle1' fontWeight={600}>
            ${(product.price * quantity).toFixed(2)}
          </Typography>
        </Box>

        {/* Footer */}
        <Box display='flex' justifyContent='flex-end' gap={1} mt={2}>
          <Button onClick={onClose} color='inherit'>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSave} disabled={saveLoader}>
            {saveLoader ? 'Updating...' : 'Update'}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditCart
