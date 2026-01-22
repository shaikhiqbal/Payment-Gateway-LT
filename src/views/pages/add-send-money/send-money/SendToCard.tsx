// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import Payment from 'payment'
import Cards, { Focused } from 'react-credit-cards'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

interface DataType {
  name: string
  imgSrc: string
  imgAlt: string
  cardCvc: string
  expiryDate: string
  cardNumber: string
  cardStatus?: string
  badgeColor?: ThemeColor
}

const data: DataType[] = [
  {
    cardCvc: '587',
    name: 'Tom McBride',
    expiryDate: '12/24',
    imgAlt: 'Mastercard',
    cardNumber: '5577 0000 5577 9865',
    imgSrc: '/images/logos/mastercard.png'
  },
  {
    cardCvc: '681',
    imgAlt: 'Visa card',
    expiryDate: '02/24',
    badgeColor: 'primary',
    cardStatus: 'Primary',
    name: 'Mildred Wagner',
    cardNumber: '4532 3616 2070 5678',
    imgSrc: '/images/logos/visa.png'
  },
  {
    cardCvc: '3845',
    expiryDate: '08/20',
    name: 'Lester Jennings',
    imgAlt: 'American Express card',
    cardNumber: '3700 000000 00002',
    imgSrc: '/images/logos/american-express.png'
  }
]

const SendToCard = () => {
  // ** States
  const [cvc, setCvc] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [focus, setFocus] = useState<Focused>()
  const [cardId, setCardId] = useState<number>(0)
  const [expiry, setExpiry] = useState<string>('')
  const [cardNumber, setCardNumber] = useState<string>('')
  const [dialogTitle, setDialogTitle] = useState<string>('Add')
  const [openEditCard, setOpenEditCard] = useState<boolean>(false)

  // Handle Edit Card dialog and get card ID
  const handleEditCardClickOpen = (id: number) => {
    setDialogTitle('Edit')
    setCardId(id)
    setCardNumber(data[id].cardNumber)
    setName(data[id].name)
    setCvc(data[id].cardCvc)
    setExpiry(data[id].expiryDate)
    setOpenEditCard(true)
  }

  const handleAddCardClickOpen = () => {
    setDialogTitle('Add')
    setCardNumber('')
    setName('')
    setCvc('')
    setExpiry('')
    setOpenEditCard(true)
  }

  const handleEditCardClose = () => {
    setDialogTitle('Add')
    setCardNumber('')
    setName('')
    setCvc('')
    setExpiry('')
    setOpenEditCard(false)
  }

  const handleBlur = () => setFocus(undefined)

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value, Payment)
      setCardNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
      setExpiry(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value, cardNumber, Payment)
      setCvc(target.value)
    }
  }

  return (
    <Box>
      <Dialog
        open={openEditCard}
        onClose={handleEditCardClose}
        aria-labelledby='user-view-billing-edit-card'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
        aria-describedby='user-view-billing-edit-card-description'
      >
        <DialogTitle
          id='user-view-billing-edit-card'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          {dialogTitle} Card
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <DialogContentText
            variant='body2'
            id='user-view-billing-edit-card-description'
            sx={{ textAlign: 'center', mb: 7 }}
          >
            {dialogTitle} card for future billing
          </DialogContentText>
          <form>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <CardWrapper sx={{ '& .rccs': { m: '0 auto' } }}>
                  <Cards cvc={cvc} focused={focus} expiry={expiry} name={name} number={cardNumber} />
                </CardWrapper>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name='number'
                      value={cardNumber}
                      autoComplete='off'
                      label='Card Number'
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      placeholder='0000 0000 0000 0000'
                      onFocus={e => setFocus(e.target.name as Focused)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      name='name'
                      value={name}
                      autoComplete='off'
                      onBlur={handleBlur}
                      label='Name on Card'
                      placeholder='John Doe'
                      onChange={e => setName(e.target.value)}
                      onFocus={e => setFocus(e.target.name as Focused)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name='expiry'
                      label='Expiry'
                      value={expiry}
                      onBlur={handleBlur}
                      placeholder='MM/YY'
                      onChange={handleInputChange}
                      inputProps={{ maxLength: '5' }}
                      onFocus={e => setFocus(e.target.name as Focused)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <FormControl fullWidth>
                      <InputLabel id='user-view-billing-edit-card-status-label'>Card Status</InputLabel>
                      <Select
                        label='Card Status'
                        id='user-view-billing-edit-card-status'
                        labelId='user-view-billing-edit-card-status-label'
                        defaultValue={data[cardId].cardStatus ? data[cardId].cardStatus : ''}
                      >
                        <MenuItem value='Primary'>Primary</MenuItem>
                        <MenuItem value='Expired'>Expired</MenuItem>
                        <MenuItem value='Active'>Active</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name='cvc'
                      label='CVC'
                      value={cvc}
                      autoComplete='off'
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      onFocus={e => setFocus(e.target.name as Focused)}
                      placeholder={Payment.fns.cardType(cardNumber) === 'amex' ? '1234' : '123'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label='Save Card for future billing?'
                      sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditCardClose}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleEditCardClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <CardHeader
        title='Payment Methods'
        action={
          <Button variant='contained' onClick={handleAddCardClickOpen} sx={{ '& svg': { mr: 1 } }}>
            <Icon icon='tabler:plus' fontSize='1rem' />
            Add Card
          </Button>
        }
      />
      {data.map((item: DataType, index: number) => (
        <Box
          key={index}
          sx={{
            p: 4,
            display: 'flex',
            borderRadius: 1,
            flexDirection: ['column', 'row'],
            justifyContent: ['space-between'],
            alignItems: ['flex-start', 'center'],
            mb: index !== data.length - 1 ? 4 : undefined,
            border: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <div>
            <img height='26' alt={item.imgAlt} src={item.imgSrc} />
            <Box sx={{ mt: 3.5, mb: 2.5, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 2, color: 'text.secondary' }}>{item.name}</Typography>
              {item.cardStatus ? (
                <CustomChip rounded skin='light' size='small' label={item.cardStatus} color={item.badgeColor} />
              ) : null}
            </Box>
            <Typography sx={{ color: 'text.secondary' }}>
              **** **** **** {item.cardNumber.substring(item.cardNumber.length - 4)}
            </Typography>
          </div>

          <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
            <Button variant='outlined' sx={{ mr: 2.5 }} onClick={() => handleEditCardClickOpen(index)}>
              Edit
            </Button>
            <Button variant='outlined' color='secondary'>
              Delete
            </Button>
            <Typography sx={{ mt: [6, 10], color: 'text.secondary' }}>Card expires at {item.expiryDate}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default SendToCard
