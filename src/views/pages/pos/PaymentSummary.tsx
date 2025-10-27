import React, { useState } from 'react'

// ** MUI Imports
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Switch,
  FormControlLabel
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const PaymentSummary = () => {
  const [roundOff, setRoundOff] = useState(true)

  return (
    <TableContainer component={Paper} sx={{ border: 'none', boxShadow: 'none' }}>
      <Table size='small'>
        <TableBody>
          {/* Shipping */}
          <TableRow>
            <TableCell sx={{ border: 'none' }}>
              Shipping
              <IconButton aria-label='capture screenshot' color='secondary' size='small'>
                <Icon icon='ic:twotone-edit-note' fontSize='inherit' />
              </IconButton>
            </TableCell>
            <TableCell align='right' sx={{ color: 'text.secondary' }}>
              $40.21
            </TableCell>
          </TableRow>

          {/* Tax */}
          <TableRow>
            <TableCell sx={{ border: 'none' }}>
              Tax
              <IconButton aria-label='capture screenshot' color='secondary' size='small'>
                <Icon icon='ic:twotone-edit-note' fontSize='inherit' />
              </IconButton>
            </TableCell>
            <TableCell align='right' sx={{ color: 'text.secondary' }}>
              $25
            </TableCell>
          </TableRow>

          {/* Coupon */}
          <TableRow>
            <TableCell sx={{ border: 'none' }}>
              Coupon
              <IconButton aria-label='capture screenshot' color='secondary' size='small'>
                <Icon icon='ic:twotone-edit-note' fontSize='inherit' />
              </IconButton>
            </TableCell>
            <TableCell align='right' sx={{ color: 'text.secondary' }}>
              $25
            </TableCell>
          </TableRow>

          {/* Discount */}
          <TableRow>
            <TableCell sx={{ border: 'none' }}>
              <Typography component='span' color='error'>
                Discount
              </Typography>
              <IconButton aria-label='capture screenshot' color='secondary' size='small'>
                <Icon icon='ic:twotone-edit-note' fontSize='inherit' />
              </IconButton>
            </TableCell>
            <TableCell align='right' color='error'>
              $15.21
            </TableCell>
          </TableRow>

          {/* Roundoff Switch */}
          <TableRow>
            <TableCell sx={{ border: 'none' }}>
              <FormControlLabel
                control={<Switch checked={roundOff} onChange={() => setRoundOff(!roundOff)} size='small' />}
                label='Roundoff'
              />
            </TableCell>
            <TableCell align='right' sx={{ color: 'text.secondary' }}>
              +0.11
            </TableCell>
          </TableRow>

          {/* Sub Total */}
          <TableRow>
            <TableCell sx={{ border: 'none' }}>Sub Total</TableCell>
            <TableCell align='right' sx={{ color: 'text.secondary' }}>
              $60,454
            </TableCell>
          </TableRow>

          {/* Total Payable */}
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 'bold',
                borderTop: '1px dashed'
              }}
            >
              Total Payable
            </TableCell>
            <TableCell
              align='right'
              sx={{
                fontWeight: 'bold',
                borderTop: '1px dashed',
                color: 'text.secondary'
              }}
            >
              $56,590
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PaymentSummary
