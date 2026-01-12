// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  title: string
}

const StepIndicator = ({ currentStep, totalSteps, title }: StepIndicatorProps) => {
  const theme = useTheme()

  return (
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <Typography
        variant='h5'
        sx={{
          fontWeight: 600,
          mb: 1,
          color: 'text.primary'
        }}
      >
        {title}
      </Typography>
      {/* <Typography
        variant='body2'
        sx={{
          color: 'text.secondary',
          fontSize: '0.875rem'
        }}
      >
        Step {currentStep} of {totalSteps}
      </Typography> */}

      {/* Progress indicator */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            width: 60,
            height: 4,
            borderRadius: 2,
            backgroundColor: theme.palette.grey[200],
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* <Box
            sx={{
              width: `${(currentStep / totalSteps) * 100}%`,
              height: '100%',
              backgroundColor: theme.palette.primary.main,
              borderRadius: 2,
              transition: 'width 0.3s ease'
            }}
          /> */}
        </Box>
      </Box>
    </Box>
  )
}

export default StepIndicator
