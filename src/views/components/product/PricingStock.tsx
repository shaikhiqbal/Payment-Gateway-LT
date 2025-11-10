import React, { Fragment, useState } from 'react'
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material'

// **  Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components
import VariationTable from './VariationTable'
import ColorPicker from './ColorPicker'
import SizeSelect from './SizeSelect'

// ** Form data interface
interface PricingStocksFormData {
  productType: 'single' | 'variable'
  // ** Single Product fields
  quantity?: number
  price?: number
  taxType?: string
  discountType?: string
  discountValue?: number
  quantityAlert?: number

  // ** Variable Product fields
  variantAttribute?: string
  variantOption: {
    color: boolean
    size: boolean
  }
  color: { label: string; value: string }[]
  size: string[]
}

// ** Props interface
interface PricingStocksFormProps {
  onSubmit?: (data: PricingStocksFormData) => void
  handleToggle: () => void
}

const PricingStocksForm: React.FC<PricingStocksFormProps> = ({ handleToggle }) => {
  // ** States
  const [expanded, setExpanded] = useState<boolean>(true)

  return (
    <Fragment>
      <Box sx={{ p: 3, mx: 'auto' }}>
        <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
          <AccordionSummary
            expandIcon={<Icon icon='uiw:up' fontSize='inherit' />}
            sx={{
              '& .MuiAccordionSummary-content': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* <Icon icon='tabler:lifebuoy' /> */}
              <Typography variant='h6'>Pricing & Stocks</Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails sx={{ borderTop: 1, borderColor: 'divider' }}>
            <Button variant='outlined' sx={{ mt: 2 }} color='primary' onClick={handleToggle}>
              Add Variation
            </Button>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Fragment>
  )
}

export default PricingStocksForm
