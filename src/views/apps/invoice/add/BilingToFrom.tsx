import React from 'react'

// ** MUI Imports
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  styled,
  Typography,
  alpha,
  MenuItemProps,
  InputLabel
} from '@mui/material'

// ** React Hook Form Imports
import { Controller, useFormContext } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components
const CustomSelectItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  color: theme.palette.success.main,
  backgroundColor: 'transparent !important',
  '&:hover': {
    color: `${theme.palette.success.main} !important`,
    backgroundColor: `${alpha(theme.palette.success.main, 0.1)} !important`
  },
  '&.Mui-focusVisible': {
    backgroundColor: `${alpha(theme.palette.success.main, 0.2)} !important`
  },
  '&.Mui-selected': {
    color: `${theme.palette.success.contrastText} !important`,
    backgroundColor: `${theme.palette.success.main} !important`,
    '&.Mui-focusVisible': {
      backgroundColor: `${theme.palette.success.dark} !important`
    }
  }
}))

interface BilingToFromProps {
  title: string
  name: 'billedBy' | 'customerName'
}

// ** Details Object
const details = {
  billedBy: {
    name: 'Billed By',
    menu: [{ label: 'John Doe' }, { label: 'Alice Smith' }, { label: 'Michael Johnson' }]
  },
  customerName: {
    name: 'Customer Name',
    menu: [{ label: 'Jane Smith' }, { label: 'Robert Brown' }, { label: 'Emily Davis' }]
  }
}

const BilingToFrom = ({ title, name }: BilingToFromProps) => {
  const { control } = useFormContext()

  const clients = details[name].menu
  return (
    <Grid item xs={12} sm={6}>
      <Box
        sx={theme => ({
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          padding: theme.spacing(4),
          backgroundColor: theme.palette.background.paper
        })}
      >
        <Typography variant='h6' sx={{ mb: 4, fontWeight: 'bold' }}>
          {title}
        </Typography>

        {/* <Typography>{details[name].name}:</Typography> */}

        <FormControl fullWidth size='small'>
          <InputLabel id={`invoice-${name}-label`}>{details[name].name}</InputLabel>

          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <Select {...field} labelId={`invoice-${name}-label`} label='Status'>
                <CustomSelectItem>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      '& svg': { mr: 2 }
                    }}
                  >
                    <Icon icon='tabler:plus' fontSize='1.125rem' />
                    Add New Customer
                  </Box>
                </CustomSelectItem>

                {clients?.map(client => (
                  <MenuItem key={client.label} value={client.label}>
                    {client.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Box>
    </Grid>
  )
}

export default BilingToFrom
