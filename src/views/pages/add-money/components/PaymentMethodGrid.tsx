// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'

// ** Motion Imports
import { motion } from 'motion/react'

// ** Types
import { PaymentMethod } from '../types'

interface PaymentMethodGridProps {
  paymentMethods: PaymentMethod[]
  selectedMethod: string | null
  onMethodSelect: (methodId: string) => void
}

const PaymentMethodGrid = ({
  paymentMethods,
  selectedMethod,
  onMethodSelect
}: PaymentMethodGridProps) => {
  const theme = useTheme()

  return (
    <Grid container spacing={3}>
      {paymentMethods.map((method) => {
        const isSelected = selectedMethod === method.id
        
        return (
          <Grid item xs={12} sm={6} md={4} key={method.id}>
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Card
                onClick={() => onMethodSelect(method.id)}
                sx={{
                  cursor: 'pointer',
                  height: '100%',
                  border: `2px solid ${
                    isSelected 
                      ? theme.palette.primary.main 
                      : 'transparent'
                  }`,
                  backgroundColor: isSelected 
                    ? `${theme.palette.primary.main}08` 
                    : 'background.paper',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: isSelected 
                      ? theme.palette.primary.main 
                      : theme.palette.primary.light,
                    boxShadow: theme.shadows[4]
                  },
                  ...(isSelected && {
                    boxShadow: `0 0 0 1px ${theme.palette.primary.main}20`,
                    transform: 'scale(1.02)'
                  })
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  {/* Payment method icon placeholder */}
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: isSelected 
                        ? theme.palette.primary.main 
                        : theme.palette.grey[100],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: isSelected 
                          ? 'white' 
                          : 'text.secondary',
                        fontWeight: 600,
                        fontSize: '0.875rem'
                      }}
                    >
                      {method.name.charAt(0)}
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      mb: 0.5,
                      color: isSelected 
                        ? 'primary.main' 
                        : 'text.primary'
                    }}
                  >
                    {method.name}
                  </Typography>
                  
                  {method.description && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.75rem'
                      }}
                    >
                      {method.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default PaymentMethodGrid