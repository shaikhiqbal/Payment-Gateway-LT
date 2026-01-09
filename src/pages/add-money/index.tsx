// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// ** Custom Component Imports
import AddMoney from 'src/views/pages/add-money/AddMoney'

const AddMoneyPage = () => {
  const theme = useTheme()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8}>
        <AddMoney />
      </Grid>
      <Grid item xs={12} md={4}>
        {/* Right-side illustration/info panel placeholder */}
        <Card sx={{ height: '100%', minHeight: 400 }}>
          <CardContent sx={{ p: 6, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* Illustration placeholder */}
            <Box
              sx={{
                width: '100%',
                height: 200,
                borderRadius: 3,
                backgroundColor: theme.palette.grey[100],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 4,
                border: `2px dashed ${theme.palette.grey[300]}`
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Illustration Placeholder
              </Typography>
            </Box>
            
            {/* Info content placeholder */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Quick & Secure
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Add funds to your account safely with our trusted payment partners.
              </Typography>
              
              {/* Feature list placeholder */}
              <Box sx={{ textAlign: 'left' }}>
                {[
                  'Instant processing',
                  'Bank-level security',
                  'Multiple payment options',
                  '24/7 support'
                ].map((feature, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.primary.main,
                        mr: 2
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

AddMoneyPage.acl = {
  action: 'read',
  subject: 'permission'
}
export default AddMoneyPage
