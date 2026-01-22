import { useEffect, useState } from 'react'

// ** MUI Imports (separate for performance)
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

// ** QR Code
import { QRCodeCanvas } from 'qrcode.react'

const generateRandomValue = () => {
  return `WALLET-${Math.random().toString(36).substring(2, 12)}-${Date.now()}`
}

const QrCode = () => {
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(generateRandomValue())
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleRegenerate = () => {
    setLoading(true)

    setTimeout(() => {
      setValue(generateRandomValue())
      setLoading(false)
    }, 1000)
  }

  return (
    <Box
      sx={{
        maxWidth: 360,
        mx: 'auto',
        p: 3,
        textAlign: 'center',
        borderRadius: 2
      }}
    >
      <Typography variant='h6' fontWeight={600} mb={2}>
        QR Code
      </Typography>

      {/* QR / Skeleton */}
      <Box
        sx={{
          height: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2
        }}
      >
        {loading ? <Skeleton variant='rounded' width={180} height={180} /> : <QRCodeCanvas value={value} size={180} />}
      </Box>

      {/* Value */}
      {!loading && (
        <Typography variant='caption' color='text.secondary' sx={{ wordBreak: 'break-all' }}>
          {value}
        </Typography>
      )}

      {/* Action */}
      <Stack mt={3}>
        <Button variant='outlined' onClick={handleRegenerate}>
          Generate New QR
        </Button>
      </Stack>
    </Box>
  )
}

export default QrCode
