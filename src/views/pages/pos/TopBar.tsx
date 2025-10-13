import React from 'react'

// ** MUI Imports
import { Box, Button, ButtonProps, Fab, Grid, TextField, Typography } from '@mui/material'
import styled from '@emotion/styled'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: '#001F54', // navy blue
  color: '#fff',
  '&:hover': {
    backgroundColor: '#00153B' // darker navy for hover
  }
}))

const TopBar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 3,
        flexWrap: 'wrap',
        pb: 2,
        mb: 2,
        borderBottom: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      {/* Left Side */}
      <Box>
        <Typography variant='h6'>Welcome, John Deo</Typography>
        <Typography variant='body2' sx={{ mb: 2 }}>
          Role: Product Manager
        </Typography>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 3,
          flexWrap: 'wrap'
        }}
      >
        {/* Search Field with Icon */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
          {/* <Icon icon='oui:token-search-type' style={{ color: 'gray' }} />

          <TextField variant='standard' id='input-with-icon-grid' label='Search Product...' /> */}
          <TextField label='Search Product...' id='size-small' size='small' />
        </Box>

        {/* Buttons */}
        <CustomButton variant='contained' size='small' startIcon={<Icon icon='oui:tag' />}>
          View All Brands
        </CustomButton>

        <Button variant='contained' color='warning' size='small' startIcon={<Icon icon='oui:star-empty-space' />}>
          Featured
        </Button>
      </Box>
    </Box>
  )
}

export default TopBar
