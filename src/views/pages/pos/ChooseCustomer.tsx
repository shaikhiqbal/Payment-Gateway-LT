import React, { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Redux Hook
import { useSelector, useDispatch } from 'react-redux'

// ** Action
import { selectCustomer } from 'src/store/pages/pos'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { RootState } from 'src/store'

// ** Form
import CustomerForm from './forms/CustomerForm'
import toast from 'react-hot-toast'

const fakeCustomers = [
  { name: 'John Doe', id: 1 },
  { name: 'Jane Smith', id: 2 },
  { name: 'Alice Johnson', id: 3 },
  { name: 'Bob Brown', id: 4 }
]

const ChooseCustomer = () => {
  // ** State
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)
  const [error, setError] = useState(false)
  const [openCustomerDialog, setOpenCustomerDialog] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const { isCustomerSelected, warningCountSelectCutomer } = useSelector((state: RootState) => state.pos)

  // ** Customer Dialog
  const toggleCustomerDialog = () => setOpenCustomerDialog(!openCustomerDialog)

  const addNewCustomer = (data: { name: string; id: number }) => {
    const { name } = data
    const id = fakeCustomers.length + 1
    fakeCustomers.push({ name, id })
    setSelectedCustomerId(id)

    toast.success('Customer Added Successfully')
    setOpenCustomerDialog(false)
  }

  useEffect(() => {
    if (selectedCustomerId !== null && isCustomerSelected === false) {
      dispatch(selectCustomer(true))
    }
  }, [selectedCustomerId, dispatch, isCustomerSelected])

  useEffect(() => {
    if (warningCountSelectCutomer) {
      setError(true)
    }
  }, [warningCountSelectCutomer])

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
        <Autocomplete
          options={fakeCustomers}
          sx={{ flexGrow: 1 }}
          getOptionLabel={option => option.name}
          value={fakeCustomers.find(c => c.id === selectedCustomerId) || null}
          onChange={(event, newValue) => {
            setSelectedCustomerId(newValue ? newValue.id : null)
            console.log('Selected ID:', newValue ? newValue.id : null)
            setError(false)
          }}
          renderInput={params => <TextField {...params} label='Select Customer' size='small' error={error} />}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
        <Fab color='error' aria-label='add' size='small' onClick={toggleCustomerDialog} title='Add New Customer'>
          <Icon icon='solar:user-plus-line-duotone' />
        </Fab>
        <Fab color='warning' aria-label='add' size='small'>
          <Icon icon='material-symbols-light:qr-code-scanner-rounded' />
        </Fab>
      </Box>

      <Dialog open={openCustomerDialog} onClose={toggleCustomerDialog} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title' sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
          Create New Customer
        </DialogTitle>
        <DialogContent>
          <CustomerForm storeCustomerData={addNewCustomer} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default ChooseCustomer
