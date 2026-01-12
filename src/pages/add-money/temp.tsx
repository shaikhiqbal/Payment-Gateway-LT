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
  title: 'Add Money',
  methods: [
    {
      id: 'evoucher',
      labelTop: 'ADD WITH',
      labelMain: 'E Vouchers',
      processing: 'Choose',
      colors: {
        from: '#4CC8A2',
        to: '#2BAF8A'
      },
      action: 'openEvoucherForm',
      icon: 'mdi:voucher-outline',
      info: 'Redeem your voucher code'
    },
    {
      id: 'ach',
      labelTop: '',
      labelMain: 'ACH',
      processing: '3-4 Business Days',
      colors: {
        from: '#6A74F7',
        to: '#4B58D6'
      },
      action: 'openACHForm',
      icon: 'tabler:building-bank',
      info: 'Bank routing transfer'
    },
    {
      id: 'wire',
      labelTop: '',
      labelMain: 'Wire',
      processing: 'Instant',
      colors: {
        from: '#F3A55A',
        to: '#DB8743'
      },
      action: 'openWireForm',
      icon: 'tabler:direction-sign',
      info: 'Instant wire transfer'
    },
    {
      id: 'qrcode',
      labelTop: 'Generate',
      labelMain: 'QR Code',
      processing: 'Generate',
      colors: {
        from: '#9B59B6',
        to: '#8E44AD'
      },
      action: 'openQRGenerator',
      icon: 'tabler:barcode',
      info: 'Scan QR to receive'
    }
  ],
  footer: {
    copyright: '© 2025 Lock Trust'
  }
}

const AddMoney = () => {
  // ** State
  const [loading, setLoading] = useState<boolean>(true)
  const [method, setMethod] = useState<'ACH' | 'EVoucherList' | 'Wire' | 'QrCode'>('ACH')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // ** Toggle Modal
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const openMethodForm = (action: string) => {
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
    ? new Array(4).fill(0).map((_, i) => (
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

AddMoney.acl = {
  action: 'read',
  subject: 'permission'
}
export default AddMoney
