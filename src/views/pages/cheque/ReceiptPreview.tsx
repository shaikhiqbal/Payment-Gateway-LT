import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

interface ReceiptPreviewProps {
  data: {
    fullName: string
    bank: string
    amount: string
    description: string
  }
  onEdit: () => void
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ data, onEdit }) => {
  return (
    <Box sx={{ bgcolor: theme => (theme.palette.mode === 'light' ? '#f6f9fa' : '#25293C'), padding: 4 }}>
      <Card sx={{ p: 4 }}>
        <Box>
          <div>
            <img height='35' alt={'logo'} src={'/images/lt/logo_white.jpg'} />
            <Box sx={{ mt: 4, mb: 10.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                {/* Bank Name */} <Typography sx={{ mb: 1 }}>{'Citibank Online'}</Typography> {/* Account Number */}
                <Typography sx={{ mb: 1 }}>{data.bank}</Typography>
              </Box>
              <Box>
                <Typography sx={{ mb: 1 }}>
                  <Typography component='span' fontWeight={800}>
                    Date
                  </Typography>
                  : 12/12/2023
                </Typography>
                <Typography sx={{ mb: 1 }}>VOID AFTER 90 DAYS</Typography>
                <Typography sx={{ mb: 1 }}>
                  <Typography component='span' fontWeight={800}>
                    Amount
                  </Typography>
                  : ${data.amount}
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ mb: 1 }}>Twelve thousand three hundred twelve and 00/100 dollars ***</Typography>
            <Typography sx={{ mb: 1 }}>
              <Typography component='span' fontWeight={800}>
                PAY TO THE ORDER OF
              </Typography>
              {data.fullName}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <Typography component='span' fontWeight={800}>
                For:
              </Typography>
              Payment of services rendered
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <Typography component='span' fontWeight={800}>
                Memo:
              </Typography>
              1234567890
            </Typography>
          </div>
          <Box sx={{ mt: [4, 0], display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ width: 260, textAlign: 'center', mt: 4 }}>
              <Typography sx={{ fontFamily: 'cursive', fontSize: 20, mb: 1 }}> Iqbal Shaikh </Typography>
              <Box sx={{ borderBottom: '1px solid #000', mb: 0.5 }} />
              <Typography sx={{ fontSize: 11, letterSpacing: 1 }}> AUTHORIZED SIGNATURE </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default ReceiptPreview
