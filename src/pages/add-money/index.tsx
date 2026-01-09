// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import AddMoney from 'src/views/pages/add-money/AddMoney'

const AddMoneyPage = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <AddMoney />
      </Grid>
      <Grid item xs={12} md={4}>
        123
      </Grid>
    </Grid>
  )
}

AddMoneyPage.acl = {
  action: 'read',
  subject: 'permission'
}
export default AddMoneyPage
