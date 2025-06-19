import { ChipProps, SxProps, Theme } from '@mui/material'
import { ThemeColor } from 'src/@core/layouts/types'

export interface TransactionStatusShap {
  stats: string
  title: string
  chipText: string
  subtitle: string
  avatarIcon: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  chipColor?: ChipProps['color']
}
