// ** React Imports
import { useState, ReactNode, MouseEvent } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Axios
import axios from 'src/configs/axios'
import endpoints from 'src/configs/endpoints'

// ** Routes
import { useRouter } from 'next/router'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

import { AnimatePresence, motion } from 'motion/react'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import LoginForm from 'src/views/pages/auth/form/login'
import VerifyUser from 'src/views/pages/auth/form/VerifyUser'

// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const TwoStepsIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 650,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  super: {
    password: 'admin',
    email: 'admin@vuexy.com'
  },
  local: {
    password: 'niraj123',
    email: 'kardileomkar7262@gmail.com'
  },
  live: {
    password: 'sneha@123',
    email: 'sneha@logicluminary.com'
  }
}

interface FormData {
  email: string
  password: string
}

interface UserDetails {
  token: string
  mobileNum: string
  otp?: number
}

const slideVariants = {
  hiddenLeft: { x: -400, opacity: 0 },
  hiddenRight: { x: 400, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exitLeft: { x: -400, opacity: 0 },
  exitRight: { x: 400, opacity: 0 }
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [userTypeToLog, setUserTypeToLog] = useState<'local' | 'live' | 'super'>('local')
  const [isVerify, setIsVerify] = useState<boolean>(false)
  const [userDetails, setUserDetails] = useState<UserDetails>({
    token: '',
    mobileNum: ''
  })

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const handleGetToken = (data: UserDetails): void => {
    setUserDetails(data)
    setIsVerify(true)
  }

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <AnimatePresence mode='wait'>
              <motion.div
                key={isVerify ? 'verify' : 'login'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {isVerify ? (
                  <TwoStepsIllustration
                    alt='two-steps-illustration'
                    src={`/images/pages/auth-v2-two-steps-illustration-${theme.palette.mode}.png`}
                  />
                ) : (
                  <LoginIllustration
                    alt='login-illustration'
                    src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </Box>
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <AnimatePresence mode='wait'>
            {!isVerify ? (
              <motion.div
                key='login'
                initial='hiddenLeft'
                animate='visible'
                exit='exitLeft'
                variants={slideVariants}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                  <Box sx={{ my: 6 }}>
                    <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                      {`Welcome to ${themeConfig.templateName}! 👋🏻`}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Please sign-in to your account and start the adventure
                    </Typography>
                  </Box>

                  <Alert icon={false} sx={{ py: 3, mb: 6, ...bgColors.primaryLight }}>
                    <Typography variant='body2' sx={{ mb: 2, color: 'primary.main' }}>
                      Admin: <strong>admin@vuexy.com</strong> / Pass: <strong>admin</strong>
                    </Typography>
                    <Typography variant='body2' sx={{ color: 'primary.main' }}>
                      Client: <strong>client@vuexy.com</strong> / Pass: <strong>client</strong>
                    </Typography>
                  </Alert>

                  <LoginForm onVerify={handleGetToken} />
                </Box>
              </motion.div>
            ) : (
              <motion.div
                key='verify'
                initial='hiddenRight'
                animate='visible'
                exit='exitRight'
                variants={slideVariants}
                transition={{ duration: 0.5 }}
              >
                <VerifyUser token={userDetails.token} mobile={userDetails.mobileNum} otp={userDetails.otp ?? 0} />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
