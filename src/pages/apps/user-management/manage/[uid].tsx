import React, { useState } from 'react'

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
import { MerchantType, MerchantViewType } from 'src/types/apps/merchantTypes'
import { Alert, Card, CardContent, CardHeader, FormControlLabel, Switch } from '@mui/material'

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

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
  countryCode: '91',
  mobileNum: '',
  password: '',
  active: false,
  userRoles: {
    uid: ''
  }
}

const index = () => {
  // ** State
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  // ** Hooks
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: MerchantType) => {
    try {
      data.countryCode = data.countryCode.includes('+') ? data.countryCode : `+${data.countryCode}`
      if (data.uid) {
        await axios.put(endpoints.userManagement.endpoint + data.uid, data)
      } else {
        await axios.post(endpoints.userManagement.endpoint, data)
      }
      reset()
    } catch (error: any) {
      if (error?.response?.status == 400) {
        setError('serverError', { type: 'serverError', message: error?.response?.data?.content })
      }
      console.error('Error:', error)
    }
  }

  const handleClose = () => {
    reset()
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      reset({
        firstName: 'Alice',
        lastName: 'Smith',
        emailId: 'alice.smith@example.com',
        countryCode: '1',
        mobileNum: '9876543210',
        password: 'Test@1234',
        active: true,
        userRoles: {
          uid: 'role123'
        }
      })
    }, 3000)
    return () => clearTimeout(timeOutId)
  }, [])

  return (
    <Card>
      <CardHeader title='Merchant' subheader='Manage your merchant details' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='firstName'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='First Name'
                  placeholder='John'
                  error={Boolean(errors.firstName)}
                  disabled={isDisabled}
                />
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
                <TextField
                  {...field}
                  label='Last Name'
                  placeholder='Doe'
                  error={Boolean(errors.lastName)}
                  disabled={isDisabled}
                />
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
                  disabled={isDisabled}
                />
              )}
            />
            {errors.emailId && <FormHelperText sx={{ color: 'error.main' }}>{errors.emailId.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='countryCode'
              control={control}
              render={({ field }) => {
                const selectedCountry = countries.find(c => c.phone === field.value) || null

                return (
                  <Fragment>
                    <CountryField
                      {...field}
                      value={selectedCountry}
                      onChange={(_, newValue) => {
                        field.onChange(newValue?.phone || null)
                      }}
                      valueType='phone'
                      label='Country Code *'
                      error={!!errors.countryCode}
                      helperText={errors.countryCode?.message}
                      fullWidth
                      disabled={isDisabled}
                    />
                  </Fragment>
                )
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='mobileNum'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Phone'
                  placeholder='1234567890'
                  error={Boolean(errors.mobileNum)}
                  disabled={isDisabled}
                />
              )}
            />
            {errors.active && <FormHelperText sx={{ color: 'error.main' }}>{errors.active.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='active'
              control={control}
              render={({ field }) => (
                <Fragment>
                  <FormControlLabel
                    control={
                      <Switch checked={field.value} onChange={field.onChange} color='success' disabled={isDisabled} />
                    }
                    label='Active'
                  />
                  {errors.active && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.active.message}</FormHelperText>
                  )}
                </Fragment>
              )}
            />
            {errors.mobileNum && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.mobileNum.message}</FormHelperText>
            )}
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              {isSubmitting ? <BeatLoader size={15} color='#ffffff' /> : 'Submit'}
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button> */}
            <Button type='submit' color='error' variant='contained' sx={{ mr: 3 }}>
              Block Account
            </Button>
            <Button type='submit' color='error' variant='contained' sx={{ mr: 3 }}>
              Block VT
            </Button>
            <Button type='submit' color='warning' variant='contained' sx={{ mr: 3 }}>
              Block User
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}

index.acl = {
  action: 'read',
  subject: 'user-management'
}

export default index
