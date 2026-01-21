import { useForm, Controller } from 'react-hook-form'
import { Box, Card, Typography, TextField, Autocomplete, Stack, Divider, Button } from '@mui/material'

type User = {
  id: string
  fullName: string
  email: string
  phone: string
}

const USERS: User[] = [
  {
    id: '1',
    fullName: 'Rahul Sharma',
    email: 'rahul@gmail.com',
    phone: '+91 98765 43210'
  },
  {
    id: '2',
    fullName: 'Anita Verma',
    email: 'anita@gmail.com',
    phone: '+91 91234 56789'
  }
]

type FormValues = {
  user: User | null
  remark: string
}

export default function WalletTransfer() {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      user: null,
      remark: ''
    }
  })

  const selectedUser = watch('user')

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Box maxWidth={480}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {/* Transfer To */}
          <Controller
            name='user'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={USERS}
                getOptionLabel={option => `${option.fullName} (${option.email})`}
                onChange={(_, value) => field.onChange(value)}
                renderInput={params => (
                  <TextField {...params} label='Transfer To' placeholder='Search by name or email' />
                )}
              />
            )}
          />

          {/* Selected User Card */}
          {selectedUser && (
            <Card
              variant='outlined'
              sx={{
                p: 2,
                borderColor: 'primary.main',
                backgroundColor: 'primary.50'
              }}
            >
              <Typography fontWeight={600}>{selectedUser.fullName}</Typography>
              <Typography variant='body2' color='text.secondary'>
                {selectedUser.email}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {selectedUser.phone}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant='caption' color='text.secondary'>
                Wallet Transfer
              </Typography>
            </Card>
          )}

          {/* Remark */}
          <Controller
            name='remark'
            control={control}
            render={({ field }) => (
              <TextField {...field} label='Remark (Optional)' placeholder='Add a note' multiline rows={2} />
            )}
          />

          {/* <Button variant='contained' size='large' type='submit'>
            Send Money
          </Button> */}
        </Stack>
      </form>
    </Box>
  )
}
