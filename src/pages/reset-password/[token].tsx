// ** React Imports
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Alert from '@mui/material/Alert'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Custom Styled Component
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

// ** Third Party Imports
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { yupResolver } from '@hookform/resolvers/yup'
import { BeatLoader } from 'react-spinners'

// ** Utils
import { encryptData, decryptData } from 'src/@core/utils/cryptoHelper'

interface State {
  newPassword: string
  showNewPassword: boolean
  confirmPassword: string
  showConfirmNewPassword: boolean
}

// ** Axios Instance
import axios from 'src/configs/axios'
import endpoints from 'src/configs/endpoints'

// ** Next Imports
import { useRouter } from 'next/router'
import { AlertTitle } from '@mui/material'

export const resetPasswordSchema = yup.object().shape({
  otp: yup.object().shape({
    digit1: yup.string().required('Required'),
    digit2: yup.string().required('Required'),
    digit3: yup.string().required('Required'),
    digit4: yup.string().required('Required'),
    digit5: yup.string().required('Required'),
    digit6: yup.string().required('Required')
  }),
  newPassword: yup.string().required('New Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
})

// ** Styled Components
const ResetPasswordIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 650,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  fontSize: '1rem',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

const CleaveInput = styled(Cleave)(({ theme }) => ({
  maxWidth: 48,
  textAlign: 'center',
  height: '48px !important',
  fontSize: '150% !important',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:not(:last-child)': {
    marginRight: theme.spacing(2)
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    margin: 0,
    WebkitAppearance: 'none'
  }
}))

type Otp = {
  digit1: string
  digit2: string
  digit3: string
  digit4: string
  digit5: string
  digit6: string
}
interface FormFields {
  otp: Otp
  newPassword: string
  confirmPassword: string
}

const defaultValues: FormFields = {
  otp: {
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: ''
  },
  newPassword: '',
  confirmPassword: ''
}

// ** Api's
const resetPassword = async (body: any, token: string) => {
  await axios.post(`${endpoints.auth.generateNewPassword}${token}`, body)
}
const generateOtp = async (token: string) => {
  await axios.get(`${endpoints.auth.generateOTP}${token}`)
}

const ResetPassword = () => {
  // ** States
  const [isBackspace, setIsBackspace] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const [values, setValues] = useState<State>({
    newPassword: '',
    showNewPassword: false,
    confirmPassword: '',
    showConfirmNewPassword: false
  })

  // ** Hooks
  const theme = useTheme()
  const router = useRouter()
  const { token } = router.query
  const resetToken = typeof token === 'string' ? token : ''

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
    clearErrors,
    setError
  } = useForm({
    defaultValues: {
      otp: {
        digit1: '7',
        digit2: '8',
        digit3: '6',
        digit4: '0',
        digit5: '9',
        digit6: '2'
      },
      newPassword: 'Iqbal1234',
      confirmPassword: 'Iqbal1234'
    },
    mode: 'onBlur',
    resolver: yupResolver(resetPasswordSchema)
  })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (body: any) => resetPassword(body, resetToken),
    onSuccess: () => {
      toast.success('Password reset successfully')
    },
    onError: (err: any) => {
      const status = err?.response?.status
      const message = err?.response?.data?.content || 'Something went wrong'

      if ([400, 401, 403, 404].includes(status)) {
        toast.error(message)
        setServerError(message)
      } else {
        toast.error('Unexpected error')
      }

      console.error('Reset Password Error:', err)
    }
  })

  const { mutate: callOtp } = useMutation({
    mutationFn: generateOtp,
    onSuccess: () => {
      toast.success('Check your email for the OTP')
    },
    onError: (error: any) => {
      toast.error('Failed to generate OTP')
      console.error('Generate OTP', error)
    }
  })

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const handleChange = (event: ChangeEvent, onChange: (...event: any[]) => void) => {
    if (!isBackspace) {
      onChange(event)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (form[index].value && form[index].value.length) {
        form.elements[index + 1].focus()
      }
      event.preventDefault()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      setIsBackspace(true)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (index >= 1) {
        if (!(form[index].value && form[index].value.length)) {
          form.elements[index - 1].focus()
        }
      }
    } else {
      setIsBackspace(false)
    }
  }

  // Handle New Password
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const renderInputs = () => {
    return (Object.keys(defaultValues.otp) as (keyof typeof defaultValues.otp)[]).map((val, index) => (
      <Controller
        key={val}
        name={`otp.${val}`}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Box
            type='tel'
            maxLength={1}
            value={value}
            autoFocus={index === 0}
            component={CleaveInput}
            onKeyDown={handleKeyDown}
            onChange={(event: ChangeEvent) => handleChange(event, onChange)}
            options={{ blocks: [1], numeral: true, numeralPositiveOnly: true }}
            sx={{ [theme.breakpoints.down('sm')]: { px: `${theme.spacing(2)} !important` } }}
          />
        )}
      />
    ))
  }

  const onSubmit = (data: FormFields) => {
    /*
    data.otp = encryptData(Object.values(data.otp).join(''))
    data.newPassword = encryptData(data.newPassword)
    data.confirmPassword = encryptData(data.confirmPassword)
    */

    const payload = {
      otp: encryptData(Object.values(data.otp).join('')),
      newPassword: encryptData(data.newPassword),
      confirmPassword: encryptData(data.confirmPassword)
    }
    mutate(payload)
  }

  useEffect(() => {
    if (resetToken) callOtp(resetToken)
  }, [resetToken])

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <ResetPasswordIllustration
            alt='reset-password-illustration'
            src={`/images/pages/auth-v2-reset-password-illustration-${theme.palette.mode}.png`}
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Box sx={{ my: 6 }}>
              <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                Reset Password 🔒
              </Typography>
              {/* <Typography sx={{ fontWeight: 500 }}>for john.doe@email.com</Typography> */}
            </Box>

            <AnimatePresence mode='wait'>
              {!isSuccess ? (
                <motion.div
                  key='form'
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl sx={{ display: 'flex', mb: 4 }}>
                      <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                        Type your 6 digit security code
                      </Typography>
                      <CleaveWrapper
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          // ...(errorsArray.length && {
                          //   '& .invalid:focus': {
                          //     borderColor: theme => `${theme.palette.error.main} !important`,
                          //     boxShadow: theme => `0 1px 3px 0 ${hexToRGBA(theme.palette.error.main, 0.4)}`
                          //   }
                          // })
                        }}
                      >
                        {renderInputs()}
                      </CleaveWrapper>
                      {/* {errorsArray.length ? ( */}
                      {/* <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid OTP</FormHelperText> */}
                      {/* ) : null} */}
                    </FormControl>
                    <FormControl sx={{ display: 'flex', mb: 4 }}>
                      <InputLabel htmlFor='auth-reset-password-v2-new-password'>New Password</InputLabel>
                      <Controller
                        name='newPassword'
                        control={control}
                        render={({ field }) => {
                          return (
                            <OutlinedInput
                              {...field}
                              label='New Password'
                              id='auth-reset-password-v2-new-password'
                              type={values.showNewPassword ? 'text' : 'password'}
                              endAdornment={
                                <InputAdornment position='end'>
                                  <IconButton
                                    edge='end'
                                    onMouseDown={e => e.preventDefault()}
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowConfirmNewPassword}
                                  >
                                    <Icon icon={values.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          )
                        }}
                      />
                      {errors.newPassword && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors?.newPassword?.message}</FormHelperText>
                      )}
                    </FormControl>

                    <FormControl sx={{ display: 'flex', mb: 4 }}>
                      <InputLabel htmlFor='auth-reset-password-v2-confirm-password'>Confirm Password</InputLabel>
                      <Controller
                        name='confirmPassword'
                        control={control}
                        render={({ field }) => {
                          return (
                            <OutlinedInput
                              {...field}
                              label='Confirm Password'
                              id='auth-reset-password-v2-confirm-password'
                              type={values.confirmPassword ? 'text' : 'password'}
                              endAdornment={
                                <InputAdornment position='end'>
                                  <IconButton
                                    edge='end'
                                    onMouseDown={e => e.preventDefault()}
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowConfirmNewPassword}
                                  >
                                    <Icon icon={values.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          )
                        }}
                      />
                      {errors.confirmPassword && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors?.confirmPassword?.message}</FormHelperText>
                      )}
                    </FormControl>

                    {serverError ? (
                      <Alert severity='error' sx={{ mb: 4 }}>
                        {serverError || 'Something went wrong. Please try again.'}
                      </Alert>
                    ) : null}
                    <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                      {isPending ? <BeatLoader color='#FFF' /> : 'Set New Password'}
                    </Button>
                    <Typography
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}
                    >
                      <LinkStyled href='/pages/auth/login-v2'>
                        <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                        <span>Back to login</span>
                      </LinkStyled>
                    </Typography>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key='alert'
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4
                    }}
                  >
                    <Alert
                      onClose={e => {
                        e.preventDefault()
                      }}
                    >
                      Password Generated Successfully
                    </Alert>
                    <Button variant='contained' startIcon={<Icon icon='tabler:minus' />}>
                      Back to Login
                    </Button>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
ResetPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
ResetPassword.guestGuard = true

export default ResetPassword
