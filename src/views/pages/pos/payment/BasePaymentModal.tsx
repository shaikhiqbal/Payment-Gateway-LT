// src/components/modals/BasePaymentModal.tsx
import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'
import { motion } from 'framer-motion'

interface BasePaymentModalProps {
  open: boolean
  title: string
  onClose: () => void
  onConfirm?: () => void
  children?: React.ReactNode
}

const BasePaymentModal: React.FC<BasePaymentModalProps> = ({ open, title, onClose, onConfirm, children }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.25 }}
      >
        <DialogTitle>
          <Typography variant='h6'>{title}</Typography>
        </DialogTitle>

        <DialogContent dividers>{children}</DialogContent>

        <DialogActions>
          <Button onClick={onClose} color='inherit'>
            Cancel
          </Button>
          <Button variant='contained' onClick={onConfirm || onClose}>
            Confirm
          </Button>
        </DialogActions>
      </motion.div>
    </Dialog>
  )
}

export default BasePaymentModal
