'use client'

import React from 'react'
import { Card, CardContent, Box, Typography, Chip, Divider, Stack } from '@mui/material'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  image: string
  quantity: number
  price: number
}

interface OrderCardProps {
  orderId: string
  products: Product[]
}

const ProductCard: React.FC<OrderCardProps> = ({ orderId, products }) => {
  const totalProducts = products.length

  return (
    <Card
      variant='outlined'
      sx={{
        bgcolor: 'grey.50',
        borderRadius: 3,
        mb: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}
    >
      <CardContent>
        {/* Header */}
        <Box display='flex' alignItems='center' justifyContent='space-between' flexWrap='wrap' mb={2}>
          <Chip label={`Order ID: #${orderId}`} color='default' sx={{ fontSize: 12, fontWeight: 500 }} />
          <Typography variant='body1' fontWeight={500}>
            Number of Products: {totalProducts.toString().padStart(2, '0')}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Products List */}
        <Stack spacing={1.5}>
          {products.map(product => (
            <Box
              key={product.id}
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              bgcolor='background.paper'
              borderRadius={2}
              px={2}
              py={1.5}
              boxShadow='0 1px 4px rgba(0,0,0,0.05)'
            >
              <Box display='flex' alignItems='center' gap={2}>
                <Box
                  sx={{
                    position: 'relative',
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    overflow: 'hidden'
                  }}
                >
                  <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                </Box>
                <Box>
                  <Typography
                    variant='subtitle2'
                    fontWeight={600}
                    sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Quantity: {product.quantity}
                  </Typography>
                </Box>
              </Box>

              <Typography variant='body1' fontWeight={600} color='success.main'>
                ${product.price}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ProductCard
