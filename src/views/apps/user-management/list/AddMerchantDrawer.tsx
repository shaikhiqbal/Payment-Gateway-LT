import { Fragment, useEffect } from 'react'

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

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Axios
import axios from 'src/configs/axios'
import endpoints from 'src/configs/endpoints'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types Import
import { PermissionTableRowType } from 'src/types/pages/permission'

// ** Custom Components
import CountryField from 'src/pages/components/form-element/location/CountryField'

// ** Data
import { countries } from 'src/@fake-db/autocomplete'

// ** Third Party Loader
import { BeatLoader } from 'react-spinners'
import { MerchantType } from 'src/types/apps/merchantTypes'
import { Alert } from '@mui/material'

// ** Encrypt Password
import { encryptData } from 'src/@core/utils/cryptoHelper'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  roleList: PermissionTableRowType[]
  editRow: MerchantType | null
  setEditRow: (row: MerchantType | null) => void
  fetchUsers: () => void
}

// interface UserData {
//   firstName: string
//   lastName: string
//   emailId: string
//   countryCode: string
//   mobileNum: string
//   username: string
//   password: string
//   roleName: string
// }

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
  emailId: yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Enter a valid email address')
    .required(),
  mobileNum: yup
    .number()
    .typeError('Contact Number field is required')
    .min(10, obj => showErrors('Contact Number', obj.value.length, obj.min))
    .required(),
  firstName: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  lastName: yup.string().required(),
  countryCode: yup.string().required(),
  password: yup.string().when(['uid'], {
    is: (uid: string | undefined) => !uid,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  userRoles: yup.object({
    uid: yup.string().required()
  }),
  uid: yup.string().notRequired() // add uid to schema for .when to work
})

const defaultValues: MerchantType = {
  firstName: '',
  lastName: '',
  emailId: '',
  countryCode: '',
  mobileNum: '',
  password: '',
  userRoles: {
    uid: ''
  }
}

const AddMerchantDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, roleList, editRow, setEditRow, fetchUsers } = props

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: MerchantType) => {
    try {
      debugger
      if (data.password && typeof data.password == 'string') data.password = encryptData(data.password)
      data.countryCode = data.countryCode.includes('+') ? data.countryCode : `+${data.countryCode}`
      if (data.uid) {
        await axios.put(endpoints.userManagement.endpoint + data.uid, data)
        setEditRow(null)
      } else {
        await axios.post(endpoints.userManagement.endpoint, data)
      }
      reset()
      toggle()
      fetchUsers()
    } catch (error: any) {
      if (error?.response?.status == 400) {
        setError('serverError', { type: 'serverError', message: error?.response?.data?.content })
      }
      console.error('Error:', error)
    }
  }

  const handleClose = () => {
    // setValue('contact', Number(''))
    toggle()
    reset()
  }

  useEffect(() => {
    if (editRow) {
      const data = { ...editRow }
      data.countryCode = data.countryCode.replace('+', '')
      reset(data)
    }
  }, [editRow, reset])

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
        <Typography variant='h6'>{editRow ? 'Edit' : 'Add'} User</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{ borderRadius: 1, color: 'text.primary', backgroundColor: 'action.selected' }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        {errors?.serverError ? (
          <Alert severity='error' sx={{ mb: 4 }}>
            {errors?.serverError?.message}
          </Alert>
        ) : null}
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
              name='emailId'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='email'
                  label='Email'
                  placeholder='johndoe@email.com'
                  error={Boolean(errors.emailId)}
                />
              )}
            />
            {errors.emailId && <FormHelperText sx={{ color: 'error.main' }}>{errors.emailId.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='countryCode'
              control={control}
              rules={{ required: 'Contact Number is required' }}
              render={({ field }) => {
                const selectedCountry = countries.find(c => c.phone === field.value) || null

                return (
                  <Fragment>
                    <CountryField
                      {...field}
                      value={selectedCountry}
                      onChange={(event, newValue) => {
                        field.onChange(newValue?.phone || null)
                      }}
                      valueType='phone'
                      label='Country Code *'
                      error={!!errors.countryCode}
                      helperText={errors.countryCode?.message}
                      fullWidth
                      ref={field.ref}
                    />
                  </Fragment>
                )
              }}
            />
            {/* {errors.countryCode && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.countryCode.message}</FormHelperText>
            )} */}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='mobileNum'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Phone' placeholder='1234567890' error={Boolean(errors.mobileNum)} />
              )}
            />
            {errors.mobileNum && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.mobileNum.message}</FormHelperText>
            )}
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

          <FormControl fullWidth sx={{ mb: 4 }} error={Boolean(errors.userRoles)}>
            <InputLabel id='userRoles-label'>Select Role Name</InputLabel>
            <Controller
              control={control}
              name='userRoles.uid'
              rules={{
                required: 'Role Name is required!'
              }}
              render={({ field }) => (
                <Select labelId='userRoles-label' label='Select Role Name' {...field} error={Boolean(errors.userRoles)}>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {roleList?.map(role => (
                    <MenuItem value={role.uid} key={role.uid}>
                      {role.roleName as string}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.userRoles?.uid && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.userRoles?.uid.message as string}</FormHelperText>
            )}
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              {isSubmitting ? <BeatLoader size={15} color='#ffffff' /> : 'Submit'}
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
