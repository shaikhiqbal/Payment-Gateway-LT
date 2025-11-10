import React, { useState, useEffect, useCallback, useMemo } from 'react'

// ** MUI Imports
import {
  Box,
  Button,
  Chip,
  Menu,
  MenuItem,
  Stack,
  Typography,
  FormControl,
  FormLabel,
  FormHelperText,
  Fade,
  Tooltip,
  alpha
} from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'

// ** Third Party
import namer from 'color-namer'
import { ChromePicker, ColorResult } from 'react-color'

// ** Icons
import Icon from 'src/@core/components/icon'
import { FieldValues, SetValueConfig, UseFormSetValue } from 'react-hook-form'

// ** Animations
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

// ** Styled Components
const FormFieldContainer = styled(Box, {
  shouldForwardProp: prop => prop !== 'error'
})<{ error?: boolean }>(({ theme, error }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${error ? theme.palette.error.main : alpha(theme.palette.primary.main, 0.2)}`,
  borderRadius: theme.spacing(1.5),
  background: alpha(theme.palette.background.paper, 0.8),
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: error ? theme.palette.error.main : theme.palette.primary.main
  },
  '&:focus-within': {
    borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
    borderWidth: '1px'
  }
}))

const StyledChromePicker = styled(Box)(({ theme }) => ({
  '& .chrome-picker': {
    width: '250px !important',
    backgroundColor: `${theme.palette.background.paper} !important`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)} !important`,
    borderRadius: `${theme.spacing(1.5)} !important`,
    boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)} !important`,
    fontFamily: theme.typography.fontFamily,
    animation: `${slideIn} 0.3s ease-out`,

    '& input': {
      backgroundColor: `${alpha(theme.palette.background.default, 0.5)} !important`,
      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)} !important`,
      borderRadius: `${theme.spacing(1)} !important`,
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px !important',
      outline: 'none !important',
      '&:focus': {
        borderColor: `${theme.palette.primary.main} !important`
      }
    }
  }
}))

const ColorChip = styled(Chip)(({ theme }) => ({
  height: 32,
  borderRadius: theme.spacing(1),
  fontSize: '0.75rem',
  fontWeight: 500,
  border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
  transition: 'all 0.2s ease',
  animation: `${slideIn} 0.3s ease-out`,
  '&:hover': {
    transform: 'scale(1.05)'
  }
}))

const AddColorButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 2),
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'none',
  border: `1px dashed ${alpha(theme.palette.primary.main, 0.5)}`,
  color: theme.palette.primary.main,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    borderStyle: 'solid'
  }
}))

// ** Types
interface ColorItem {
  label: string
  value: string
}

interface ColorPickerProps<T extends FieldValues = any> {
  label?: string
  value?: ColorItem[]
  onChange?: (colors: ColorItem[]) => void
  error?: boolean
  helperText?: string
  required?: boolean
  disabled?: boolean
  maxColors?: number
  setValue: UseFormSetValue<T>
  fieldName: string
}
{
  /* name={``} */
}

// ✅ Memoized Popup to isolate re-renders
const ColorPickerPopup = React.memo(function ColorPickerPopup({
  pickerColor,
  onColorChange,
  onClose,
  onSelect,
  disabled,
  selectedCount,
  maxColors
}: {
  pickerColor: string
  onColorChange: (color: ColorResult) => void
  onClose: () => void
  onSelect: () => void
  disabled: boolean
  selectedCount: number
  maxColors: number
}) {
  return (
    <MenuItem disableRipple sx={{ p: 0 }}>
      <Box sx={{ p: 2 }}>
        <StyledChromePicker>
          <ChromePicker color={pickerColor} onChange={onColorChange} disableAlpha />
        </StyledChromePicker>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button variant='outlined' size='small' onClick={onClose} sx={{ flex: 1 }}>
            Cancel
          </Button>
          <Button
            variant='contained'
            size='small'
            onClick={onSelect}
            disabled={disabled || selectedCount >= maxColors}
            sx={{ flex: 1 }}
          >
            Add Color
          </Button>
        </Box>
      </Box>
    </MenuItem>
  )
})

const ColorPicker: React.FC<ColorPickerProps> = ({
  label = 'Product Colors',
  value = [],
  onChange,
  error = false,
  helperText,
  required = false,
  disabled = false,
  maxColors = 10,
  setValue,
  fieldName
}) => {
  const [selectedColors, setSelectedColors] = useState<ColorItem[]>(value)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [pickerColor, setPickerColor] = useState('#6366f1')

  const open = Boolean(anchorEl)

  // useEffect(() => {
  //   setSelectedColors(value)
  // }, [value])

  const handleColorsChange = useCallback(
    (colors: ColorItem[]) => {
      onChange?.(colors)
    },
    [onChange]
  )

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => setAnchorEl(null), [])

  // ✅ Throttled update (stops drag-triggered re-render)
  const handleColorChange = useCallback((color: ColorResult) => {
    requestAnimationFrame(() => {
      setPickerColor(color.hex)
    })
  }, [])

  const handleColorSelect = useCallback(() => {
    if (selectedColors.length >= maxColors) {
      handleClose()
      return
    }

    const hex = pickerColor.toUpperCase()
    const colorName = namer(hex).ntc[0]?.name || hex

    if (!selectedColors.find(c => c.value === hex)) {
      const newColors = [...selectedColors, { label: colorName, value: hex }]
      setSelectedColors(newColors)
      handleColorsChange(newColors)
    }
    handleClose()
  }, [selectedColors, maxColors, pickerColor, handleColorsChange])

  const handleDelete = useCallback(
    (value: string) => {
      const newColors = selectedColors.filter(c => c.value !== value)
      setSelectedColors(newColors)
      handleColorsChange(newColors)
    },
    [selectedColors, handleColorsChange]
  )

  useEffect(() => {
    if (selectedColors.length) setValue(fieldName as any, selectedColors, { shouldDirty: true, shouldValidate: true })
  }, [selectedColors])

  return (
    <FormControl fullWidth error={error} disabled={disabled} sx={{ mb: 2 }}>
      <FormLabel sx={{ mb: 1, fontWeight: 200 }}>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </FormLabel>

      <FormFieldContainer error={error}>
        {selectedColors.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Stack direction='row' spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {selectedColors.map((color, index) => (
                <Tooltip key={color.value + index} title={`${color.label} (${color.value})`} arrow>
                  <ColorChip
                    size='small'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: color.value,
                            border: '1px solid rgba(0,0,0,0.1)'
                          }}
                        />
                        {color.label}
                      </Box>
                    }
                    onDelete={disabled ? undefined : () => handleDelete(color.value)}
                    sx={{
                      bgcolor: 'white',
                      color: 'black',
                      border: '1px solid rgba(0,0,0,0.12)',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.04)'
                      }
                    }}
                  />
                </Tooltip>
              ))}
            </Stack>
          </Box>
        )}

        <AddColorButton
          variant='outlined'
          startIcon={<Icon icon='tabler:plus' fontSize={16} />}
          onClick={handleClick}
          disabled={disabled || selectedColors.length >= maxColors}
          size='small'
        >
          {selectedColors.length === 0 ? 'Add Colors' : `Add Color (${selectedColors.length}/${maxColors})`}
        </AddColorButton>

        {/* ✅ Now uses memoized popup */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 1.5,
              boxShadow: theme => `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`
            }
          }}
        >
          <ColorPickerPopup
            pickerColor={pickerColor}
            onColorChange={handleColorChange}
            onClose={handleClose}
            onSelect={handleColorSelect}
            disabled={disabled}
            selectedCount={selectedColors.length}
            maxColors={maxColors}
          />
        </Menu>
      </FormFieldContainer>

      {helperText && <FormHelperText sx={{ mt: 1 }}>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default ColorPicker
export type { ColorItem, ColorPickerProps }
