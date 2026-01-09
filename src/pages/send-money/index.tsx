import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Components
import MoneyFeatureCard from 'src/views/pages/add-money/old/MoneyFeatureCard'
import MoneyFeatureCardSkeleton from 'src/views/pages/add-money/skeleton-loader/MoneyFeatureCardSkeleton'

// ** Modal
import ModalHelper from 'src/views/pages/add-money/old/ModalHelper'

// ** FakeDb
const addVariantsList = {
  title: 'Send Money',
  methods: [
    {
      id: 'wallet_transfer',
      labelTop: 'Wallet to',
      labelMain: 'Wallet Transfer',
      processing: '',
      colors: {
        from: '#1DA1FF',
        to: '#0D8BFF'
      },
      action: 'openWalletTransfer',
      icon: 'tabler:wallet',
      info: 'Send money between wallets'
    },
    {
      id: 'ach_transfer',
      labelTop: 'Send via',
      labelMain: 'ACH Transfer',
      processing: '',
      colors: {
        from: '#FF9F7F',
        to: '#FF784E'
      },
      action: 'openACHTransfer',
      icon: 'tabler:building-bank',
      info: 'Send money via ACH transfer'
    },
    {
      id: 'email_phone',
      labelTop: 'Send via',
      labelMain: 'Email / Phone',
      processing: '',
      colors: {
        from: '#00C48C',
        to: '#00A76F'
      },
      action: 'openEmailPhoneTransfer',
      icon: 'tabler:mail',
      info: 'Send via email or phone'
    },
    {
      id: 'escrow_setup',
      labelTop: 'Wallet',
      labelMain: 'Escrow Setup',
      processing: '',
      colors: {
        from: '#7B61FF',
        to: '#5A3FFF'
      },
      action: 'openEscrowSetup',
      icon: 'tabler:lock',
      info: 'Setup escrow wallet'
    },
    {
      id: 'canada',
      labelTop: '',
      labelMain: 'Canada',
      processing: '',
      colors: {
        from: '#2ED8B6',
        to: '#1BBFA0'
      },
      action: 'openCanadaTransfer',
      icon: 'tabler:map-pin',
      info: 'Send money to Canada'
    },
    {
      id: 'check',
      labelTop: 'Create',
      labelMain: 'Check',
      processing: '',
      colors: {
        from: '#FF6F91',
        to: '#FF4D6D'
      },
      action: 'openCheckCreate',
      icon: 'tabler:file-invoice',
      info: 'Create and send check'
    },
    {
      id: 'other_wallet',
      labelTop: 'Send to',
      labelMain: 'Other wallet',
      processing: '',
      colors: {
        from: '#22C55E',
        to: '#16A34A'
      },
      action: 'openOtherWalletTransfer',
      icon: 'arcticons:wallet',
      info: 'Send money to another wallet'
    },
    {
      id: 'card',
      labelTop: 'Send to',
      labelMain: 'Card',
      processing: '',
      colors: {
        from: '#F59E0B',
        to: '#D97706'
      },
      action: 'openCardTransfer',
      icon: 'tabler:credit-card',
      info: 'Send money to card'
    }
  ]
}

const SendMoney = () => {
  // ** State
  const [loading, setLoading] = useState<boolean>(true)
  const [method, setMethod] = useState<'ACH' | 'EVoucherList' | 'Wire' | 'QrCode'>('ACH')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // ** Toggle Modal
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const openMethodForm = (action: string) => {
    debugger
    switch (action) {
      case 'openACHForm':
        setMethod('ACH')
        break
      case 'openEvoucherForm':
        setMethod('EVoucherList')
        break
      case 'openWireForm':
        setMethod('Wire')
        break
      case 'openQRGenerator':
        setMethod('QrCode')
        break
      default:
        setMethod('ACH')
    }
    toggle()
  }

  // ** Render
  const renderAddWalletCard = loading
    ? new Array(8).fill(0).map((_, i) => (
        <Grid item xs={12} md={6} lg={3} key={i}>
          <MoneyFeatureCardSkeleton />
        </Grid>
      ))
    : addVariantsList.methods.map((c, i) => (
        <Grid item xs={12} md={6} lg={3} key={i}>
          <MoneyFeatureCard {...c} openMethodForm={openMethodForm} />
        </Grid>
      ))

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])
  return (
    <>
      <Grid container spacing={4}>
        {renderAddWalletCard}
      </Grid>
      <ModalHelper method={method} isOpen={isOpen} toggle={toggle} />
    </>
  )
}

SendMoney.acl = {
  action: 'read',
  subject: 'permission'
}
export default SendMoney
