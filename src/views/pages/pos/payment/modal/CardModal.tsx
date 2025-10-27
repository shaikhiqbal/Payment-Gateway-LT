// src/components/modals/PaymentFormModal.tsx
import React from 'react'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'

// ** Components
import BasePaymentModal from '../BasePaymentModal'
import CardPayment from 'src/views/components/card-payment'

interface PaymentFormModalProps {
  open: boolean
  onClose: () => void
}

interface PaymentFormValues {
  cardNumber: string
  nameOnCard: string
  expiryDate: string
  cvv: string
  issuingBank: string
  cardType: string
  modeOfPayment: string
}

const PaymentFormModal: React.FC<PaymentFormModalProps> = ({ open, onClose }) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors }
  } = useForm<PaymentFormValues>({
    defaultValues: {
      cardNumber: '',
      nameOnCard: '',
      expiryDate: '',
      cvv: '',
      issuingBank: '',
      cardType: '',
      modeOfPayment: 'CREDIT_CARD'
    }
  })

  const onSubmit = (data: PaymentFormValues) => {
    console.log('Payment Data:', data)
    onClose()
  }

  return (
    <BasePaymentModal open={open} title='Payment' onClose={onClose}>
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <CardPayment control={control} watch={watch} setValue={setValue} clearErrors={clearErrors} errors={errors} />
      </Box>
    </BasePaymentModal>
  )
}

export default PaymentFormModal
