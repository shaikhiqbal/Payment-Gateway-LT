import { Box, Button, Divider, Typography, Card } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import Cleave from 'cleave.js/react'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'

/* ---------------- OTP INPUT STYLE ---------------- */

const OtpInput = styled(Cleave)(({ theme }) => ({
  width: 48,
  height: 48,
  fontSize: '1.25rem',
  textAlign: 'center',
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`
  }
}))

const defaultOtp = {
  v1: '',
  v2: '',
  v3: '',
  v4: '',
  v5: '',
  v6: ''
}

const OTP_TIME = 30

interface EscrowDiscriptionFormProps {
  onNext: () => void
  onBack: () => void
}

export default function EscrowDiscriptionForm({ onNext }: EscrowDiscriptionFormProps) {
  // ** States
  const [seconds, setSeconds] = useState<number>(OTP_TIME)
  const [canResend, setCanResend] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: defaultOtp })

  const onSubmit = (data: any) => {
    const otp = Object.values(data).join('')
    console.log('OTP:', otp)
    console.log(canResend)
    onNext()
  }

  useEffect(() => {
    if (seconds === 0) {
      setCanResend(true)
      return
    }

    const timer = setTimeout(() => {
      setSeconds(prev => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [seconds])

  return (
    <Card sx={{ p: 4, borderRadius: 3 }}>
      {/* BILLING SUMMARY */}
      <Box>
        <Row label='Transfer From' value='7352012357935562' />
        <Row label='Transfer To' value='Rahul Verma' />
        <Row label='Amount' value='₹102.00' />
        <Row label='Transaction Fee' value='₹2.55' />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Row label='Subtotal' value='₹104.55' />
      <Row label='Tax' value='₹0.00' />

      <Divider sx={{ my: 3 }} />

      <Row label='Total at renewal' value='₹104.55' bold />
      <Row label='Adjustment due today' value='₹104.55' bold />

      {/* OTP SECTION */}
      <Box mt={4}>
        <Typography fontWeight={600} mb={1}>
          Enter Secure OTP
        </Typography>
        <Typography variant='body2' color='text.secondary' mb={2}>
          We sent a 6 digit code to your registered mobile
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display='flex' gap={2} justifyContent='center'>
            {Object.keys(defaultOtp).map((key, index) => (
              <Controller
                key={key}
                name={key as keyof typeof defaultOtp}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <OtpInput {...field} options={{ blocks: [1], numeral: true }} autoFocus={index === 0} />
                )}
              />
            ))}
          </Box>
          <Typography mt={1} textAlign='center'>
            {seconds > 9 ? seconds : `0${seconds}`} seconds remaining to resend OTP
          </Typography>
          {Object.keys(errors).length > 0 && (
            <Typography color='error' mt={1} textAlign='center'>
              Please enter valid OTP
            </Typography>
          )}
          <Button fullWidth type='submit' variant='contained' size='large' sx={{ mt: 4, borderRadius: 2 }}>
            Confirm and Update
          </Button>
        </form>

        {/* INFO BOX */}
        <Box
          mt={3}
          p={2}
          sx={{
            bgcolor: 'warning.light',
            borderRadius: 2
          }}
        >
          <Typography variant='body2'>Your escrow will be completed immediately after verification</Typography>
        </Box>
      </Box>
    </Card>
  )
}

/* ---------------- ROW COMPONENT ---------------- */

const Row = ({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) => (
  <Box display='flex' justifyContent='space-between' mb={1.5}>
    <Typography fontWeight={bold ? 600 : 400}>{label}</Typography>
    <Typography fontWeight={bold ? 600 : 400}>{value}</Typography>
  </Box>
)
