// styles/numberInput.ts
import { Theme } from '@mui/material/styles'

const rcInputNumberStyles = (theme: Theme) => ({
  '&.rc-input-number': {
    width: '7rem',
    position: 'relative',

    // ** Handler Wrap
    '.rc-input-number-handler-wrap': {
      zIndex: 1,
      width: '100%',
      top: '0.35rem',
      display: 'flex',
      position: 'absolute',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',

      '.rc-input-number-handler': {
        width: 20,
        height: 20,
        color: theme.palette.common.white,
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,

        svg: {
          top: '-2px',
          width: '0.8rem',
          height: '0.8rem',
          position: 'relative'
        },

        '&.rc-input-number-handler-up-disabled, &.rc-input-number-handler-down-disabled': {
          backgroundColor: 'rgba(34, 41, 47, 0.5)'
        }
      }
    },

    // ** Input Wrapper
    '.rc-input-number-input-wrap input': {
      border: 0,
      width: '79%',
      padding: '5px',
      left: '0.75rem',
      color: theme.palette.text.primary,
      position: 'relative',
      textAlign: 'center',
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius
    },

    // ** Focused
    '&.rc-input-number-focused input': {
      outline: 0
    },

    // ** Disabled
    '&.rc-input-number-disabled': {
      cursor: 'default',

      '.rc-input-number-handler-wrap .rc-input-number-handler': {
        opacity: 0.5,
        cursor: 'default',
        backgroundColor: 'rgba(34, 41, 47, 0.5)'
      }
    },

    // ** Size lg
    '&.input-lg': {
      width: '9.375rem',

      '.rc-input-number-handler': {
        width: 24,
        height: 24,

        svg: {
          top: '1px',
          width: '1rem',
          height: '1rem'
        }
      },

      '.rc-input-number-input-wrap input': {
        width: '82%',
        left: '0.85rem',
        fontSize: '1.143rem'
      }
    },

    // ** Cart Input
    '&.cart-input': {
      width: '5.5rem',
      height: '2.15rem',

      '.rc-input-number-input-wrap input': {
        left: '0.2rem'
      }
    }
  },

  // ** Dark Layout
  '.dark-layout &.rc-input-number': {
    '.rc-input-number-handler-up-disabled, .rc-input-number-handler-down-disabled': {
      backgroundColor: theme.palette.grey[600]
    },

    '.rc-input-number-input-wrap input': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default
    },

    '&.rc-input-number-disabled': {
      '.rc-input-number-handler': {
        opacity: 1,
        backgroundColor: theme.palette.grey[600]
      },

      '.rc-input-number-input-wrap input': {
        opacity: 0.5
      }
    }
  }
})

export default rcInputNumberStyles
