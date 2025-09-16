import React, { useState } from 'react'
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
  Typography
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
// import DeleteIcon from '@mui/icons-material/Delete'
// import AddIcon from '@mui/icons-material/Add'
// import RemoveIcon from '@mui/icons-material/Remove'

interface Product {
  id: number
  name: string
  qty: number
  cost: number
}

const initialProducts: Product[] = [
  { id: 1, name: 'iPhone 14 64GB', qty: 1, cost: 15800 },
  { id: 2, name: 'Red Nike Angelo', qty: 0, cost: 398 },
  { id: 3, name: 'Tablet 1.02 inch', qty: 0, cost: 3000 },
  { id: 4, name: 'IdeaPad Slim 3i', qty: 0, cost: 3000 }
]

const OrderListTable = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  const handleQtyChange = (id: number, value: number) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, qty: value < 0 ? 0 : value } : p)))
  }

  const increment = (id: number) => {
    const product = products.find(p => p.id === id)
    if (product) handleQtyChange(id, product.qty + 1)
  }

  const decrement = (id: number) => {
    const product = products.find(p => p.id === id)
    if (product) handleQtyChange(id, product.qty - 1)
  }

  const removeProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>Item</TableCell>
            <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>QTY</TableCell>
            <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100', textAlign: 'right' }}>Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id} sx={{ padding: 2 }}>
              <TableCell>
                <Box display='flex' alignItems='center' gap={1}>
                  {/* <IconButton onClick={() => removeProduct(product.id)}>
                    <DeleteIcon fontSize='small' />
                  </IconButton> */}
                  <IconButton aria-label='capture screenshot' color='error' size='small'>
                    <Icon icon='tabler:trash' fontSize='inherit' />
                  </IconButton>
                  <Typography variant='body2'>{product.name}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box display='flex' alignItems='center'>
                  <TextField
                    size='small'
                    type='number'
                    value={product.qty}
                    onChange={e => handleQtyChange(product.id, Number(e.target.value))}
                    inputProps={{ style: { textAlign: 'center', width: 40 } }}
                  />
                </Box>
              </TableCell>
              <TableCell sx={{ textAlign: 'right', fontWeight: 600 }}>${product.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderListTable
