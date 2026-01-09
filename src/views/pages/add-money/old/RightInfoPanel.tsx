import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

const RightInfoPanel = () => {
  return (
    <Box height='100%' display='flex' alignItems='center' justifyContent='center' bgcolor='background.default'>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: 'center',
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant='h6' mb={2}>
          Add Funds to unlock free trade positions
        </Typography>

        <Typography color='text.secondary'>Unlock 5 free positions for each completed step.</Typography>
      </Paper>
    </Box>
  )
}

export default RightInfoPanel
