import { Fragment, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import EscrowTransferForm from './EscrowTransferForm'
import EscrowDiscriptionForm from './EscrowDiscriptionForm'
import ProductAndService from './ProductAndService'

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0
  })
}

const AddEcrowForm = () => {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)

  const next = () => {
    setDirection(1)
    setStep(prev => prev + 1)
  }

  const back = () => {
    setDirection(-1)
    setStep(prev => prev - 1)
  }

  return (
    <Fragment>
      <AnimatePresence custom={direction} mode='wait'>
        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {step === 1 && <EscrowTransferForm onNext={next} />}
          {step === 2 && <EscrowDiscriptionForm onNext={next} onBack={back} />}
          {step === 3 && <ProductAndService onBack={back} />}
        </motion.div>
      </AnimatePresence>
    </Fragment>
  )
}

export default AddEcrowForm
