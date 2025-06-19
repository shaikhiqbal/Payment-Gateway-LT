// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { FormControlLabel, Checkbox } from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addUser } from 'src/store/apps/user'

// ** Types Imports
import { AppDispatch } from 'src/store'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

interface UserData {
  firstName: string
  lastName: string
  email: string
  countryCode: string
  phone: string
  username: string
  password: string
  isAdminAccess: boolean
  manageTransaction: boolean
  report: boolean
  technicale: boolean
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  company: yup.string().required(),
  billing: yup.string().required(),
  country: yup.string().required(),
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Enter a valid email address')
    .required(),
  contact: yup
    .number()
    .typeError('Contact Number field is required')
    .min(10, obj => showErrors('Contact Number', obj.value.length, obj.min))
    .required(),
  firstName: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  username: yup
    .string()
    .min(3, obj => showErrors('Username', obj.value.length, obj.min))
    .required(),
  lastName: yup.string().required(),
  countryCode: yup.string().required(),
  phone: yup.string().required(),
  password: yup.string().required(),
  // Boolean fields are not required
  isAdminAccess: yup.boolean(),
  manageTransaction: yup.boolean(),
  report: yup.boolean(),
  technicale: yup.boolean()
})

const defaultValues: UserData = {
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '',
  phone: '',
  username: '',
  password: '',
  isAdminAccess: false,
  manageTransaction: false,
  report: false,
  technicale: false
}

const AddMerchantDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [plan, setPlan] = useState<string>('basic')
  const [role, setRole] = useState<string>('subscriber')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: UserData) => {
    // dispatch(addUser({ ...data, role, currentPlan: plan }))
    toggle()
    reset()
  }

  const handleClose = () => {
    setPlan('basic')
    setRole('subscriber')
    // setValue('contact', Number(''))
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add User</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{ borderRadius: 1, color: 'text.primary', backgroundColor: 'action.selected' }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='firstName'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='First Name' placeholder='John' error={Boolean(errors.firstName)} />
              )}
            />
            {errors.firstName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='lastName'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Last Name' placeholder='Doe' error={Boolean(errors.lastName)} />
              )}
            />
            {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='email'
                  label='Email'
                  placeholder='johndoe@email.com'
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='countryCode'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Country Code' placeholder='+1' error={Boolean(errors.countryCode)} />
              )}
            />
            {errors.countryCode && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.countryCode.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Phone' placeholder='1234567890' error={Boolean(errors.phone)} />
              )}
            />
            {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='username'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Username' placeholder='johndoe' error={Boolean(errors.username)} />
              )}
            />
            {errors.username && <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='password'
                  label='Password'
                  placeholder='Password'
                  error={Boolean(errors.password)}
                />
              )}
            />
            {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <Controller
              name='isAdminAccess'
              control={control}
              render={({ field }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} id='isAdminAccess' />
                  <label htmlFor='isAdminAccess' style={{ marginLeft: 8 }}>
                    Admin Access
                  </label>
                </Box>
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Controller
              name='manageTransaction'
              control={control}
              render={({ field }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    checked={field.value}
                    onChange={e => field.onChange(e.target.checked)}
                    id='manageTransaction'
                  />
                  <label htmlFor='manageTransaction' style={{ marginLeft: 8 }}>
                    Manage Transaction
                  </label>
                </Box>
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Controller
              name='report'
              control={control}
              render={({ field }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} id='report' />
                  <label htmlFor='report' style={{ marginLeft: 8 }}>
                    Report
                  </label>
                </Box>
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='technicale'
              control={control}
              render={({ field }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} id='technicale' />
                  <label htmlFor='technicale' style={{ marginLeft: 8 }}>
                    Technical
                  </label>
                </Box>
              )}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AddMerchantDrawer
