// ** React Imports
import { useState } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Next & Axios
import { useRouter } from 'next/router'
import axios from 'src/configs/axios'
import endpoints from 'src/configs/endpoints'
import { BeatLoader } from 'react-spinners'

interface FormData {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  super: { email: 'admin@vuexy.com', password: 'admin' },
  local: { email: 'kardileomkar7262@gmail.com', password: 'niraj123' },
  live: { email: 'sneha@logicluminary.com', password: 'sneha@123' }
}

interface LoginFormProps {
  onVerify: (data: any) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onVerify }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [userTypeToLog, setUserTypeToLog] = useState<'local' | 'live' | 'super'>('local')
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false)

  const router = useRouter()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: defaultValues[userTypeToLog],
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const handleUserType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as 'local' | 'live' | 'super'
    setUserTypeToLog(value)
    reset(defaultValues[value])
  }

  const onSubmit = async (userDetail: FormData) => {
    try {
      setIsSubmiting(true)
      const response = await axios.post(endpoints.auth.login, userDetail)
      const { content } = response.data

      onVerify(content)
    } catch (error) {
      setError('email', { type: 'manual', message: 'Login failed. Check your credentials.' })
    } finally {
      setIsSubmiting(false)
    }
  }

  return (
    <>
      <RadioGroup row value={userTypeToLog} onChange={handleUserType}>
        <FormControlLabel value='local' control={<Radio />} label='Local User' />
        <FormControlLabel value='live' control={<Radio />} label='Live User' />
        <FormControlLabel value='super' control={<Radio />} label='Super User' />
      </RadioGroup>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                autoFocus
                label='Email'
                placeholder='admin@vuexy.com'
                error={Boolean(errors.email)}
                {...field}
              />
            )}
          />
          {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel htmlFor='password' error={Boolean(errors.password)}>
            Password
          </InputLabel>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <OutlinedInput
                id='password'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                error={Boolean(errors.password)}
                endAdornment={
                  <Button onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</Button>
                }
                {...field}
              />
            )}
          />
          {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
        </FormControl>
        <Button fullWidth size='large' variant='contained' type='submit'>
          {isSubmiting ? <BeatLoader size={15} color='#ffffff' /> : 'Login'}
        </Button>
      </form>
    </>
  )
}

export default LoginForm
