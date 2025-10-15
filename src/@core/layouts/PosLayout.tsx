// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Types
import { BlankLayoutWithAppBarProps } from './types'
import { ReactNode } from 'react'

// ** AppBar Imports
import AppBar from 'src/@core/layouts/components/pos-layout-with-appBar'
import AppBarContent from 'src/layouts/components/pos/AppBarContent'

// ** Footer Imports
import Footer from 'src/@core/layouts/components/shared-components/pos-footer'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

interface PosLayoutProps extends BlankLayoutWithAppBarProps {
  userAppBarContent?: ReactNode
}

// Styled component for Blank Layout with AppBar component
const BlankLayoutWithAppBarWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',
  position: 'relative',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5),
    minHeight: `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    overflowX: 'hidden',
    position: 'relative',
    minHeight: `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`
  }
}))

const PosLayout = (props: PosLayoutProps) => {
  // ** Props
  const { children } = props

  // ** Hooks
  const { settings, saveSettings } = useSettings()

  // ** Vars for server side navigation
  // const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems()
  // const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  return (
    <BlankLayoutWithAppBarWrapper>
      <AppBar appBarContent={<AppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} />} />
      <Box
        className='app-content'
        sx={{
          overflowX: 'hidden',
          position: 'relative',
          minHeight: theme => `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`
        }}
      >
        {children}
      </Box>
      <Footer />
    </BlankLayoutWithAppBarWrapper>
  )
}

export default PosLayout
