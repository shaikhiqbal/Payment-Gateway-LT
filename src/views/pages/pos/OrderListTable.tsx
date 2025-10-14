import React, { Fragment, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Box,
  Paper,
  Typography,
  Button,
  Skeleton
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

// ** Forms Modal
import EditCart from './forms/EditCart'

// ** Action
import { removeFromCart } from 'src/store/pages/pos/cartSlice'

// ** Dispatch
import { useDispatch } from 'react-redux'

import { motion, AnimatePresence } from 'framer-motion'

// ** Types
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

const MotionTableRow = motion.create(TableRow)

const OrderListTable = () => {
  // ** State
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null)
  const [deleteLoader, setDeleteLoader] = useState<string | null>(null)

  // ** Hooks
  const cartList = useSelector((state: RootState) => state.cartSlice)
  const { entities } = cartList

  // ** Product List
  const products = Object.values(entities) as CartItem[]

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Toggle
  const handleToggleEditModal = (product: CartItem | null) => {
    setSelectedProduct(product)
    setOpenEditModal(!openEditModal)
  }

  const handleRemove = (id: string) => {
    setDeleteLoader(id)
    setTimeout(() => {
      dispatch(removeFromCart(id))
      setDeleteLoader(null)
    }, 800)
  }

  return (
    <Fragment>
      {products.length ? (
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',

              borderRadius: 1,
              mt: 4
            }}
          >
            <Typography variant='h6' sx={{ mt: 4, mb: 2 }}>
              Order Details
            </Typography>
            <Button variant='outlined' size='small' color='error'>
              Clear All
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>Item</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>QTY</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100', textAlign: 'right' }}>Cost</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100', textAlign: 'right' }}>Edit</TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ maxHeight: '300px', position: 'relative' }}>
                <AnimatePresence>
                  {products.map((product: any) => (
                    <MotionTableRow
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        x: -100,
                        scale: 0.95,
                        transition: { duration: 0.3 }
                      }}
                      sx={{
                        backgroundColor: deleteLoader === product.id ? 'rgba(255,0,0,0.04)' : 'transparent',
                        transition: 'background-color 0.3s ease'
                      }}
                    >
                      <TableCell>
                        <Box display='flex' alignItems='center' gap={1}>
                          <motion.div
                            whileTap={{ scale: 0.8, rotate: -10 }}
                            whileHover={{ rotate: -10 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                          >
                            <IconButton
                              aria-label='delete'
                              color='error'
                              size='small'
                              onClick={() => handleRemove(product.id)}
                            >
                              <Icon icon='tabler:trash' fontSize='inherit' />
                            </IconButton>
                          </motion.div>
                          <Typography variant='body2'>{product.name}</Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <TextField
                          size='small'
                          type='number'
                          value={product.quantity}
                          inputProps={{ style: { textAlign: 'center', width: 40 } }}
                          disabled
                        />
                      </TableCell>

                      <TableCell sx={{ textAlign: 'right', fontWeight: 600 }}>${product.price}</TableCell>

                      <TableCell sx={{ textAlign: 'right' }}>
                        <IconButton
                          aria-label='edit'
                          color='secondary'
                          size='small'
                          onClick={() => handleToggleEditModal(product)}
                          sx={{ bgcolor: 'grey.100' }}
                        >
                          <Icon icon='tabler:edit' fontSize='inherit' />
                        </IconButton>
                      </TableCell>
                    </MotionTableRow>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Typography variant='body2' sx={{ mb: 2, textAlign: 'center', mt: 4 }}>
          {products.length} items in cart
        </Typography>
      )}
      {/* <OrderListSkeleton /> */}
      <EditCart open={openEditModal} onClose={() => handleToggleEditModal(null)} product={selectedProduct} />
    </Fragment>
  )
}

export default OrderListTable
