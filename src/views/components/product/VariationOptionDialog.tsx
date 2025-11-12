import React, { useState } from 'react'

// ** MUI Imports
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Autocomplete,
  Typography,
  IconButton
} from '@mui/material'

// ** Third Party Imports
import { ChromePicker } from 'react-color'
import namer from 'color-namer'

// ** MUI Styles Imports
import { styled } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'

const StyledChromePicker = styled(Box)(({ theme }) => ({
  '& .chrome-picker': {
    width: '100% !important',
    backgroundColor: `${theme.palette.background.paper} !important`,
    border: `1px solid ${theme.palette.divider} !important`,
    borderRadius: `${theme.shape.borderRadius}px !important`,
    boxShadow: `${theme.shadows[3]} !important`,
    fontFamily: theme.typography.fontFamily,

    '& div[style*="margin-top: 12px"]': {
      marginTop: '0 !important'
    },

    '& svg': {
      marginTop: '0 !important'
    },

    '& input': {
      backgroundColor: `transparent !important`,
      border: `1px solid ${theme.palette.divider} !important`,
      borderRadius: `${theme.shape.borderRadius}px !important`,
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px !important',
      outline: 'none !important',
      boxShadow: 'none !important',
      transition: 'border-color 0.2s ease-in-out !important',
      '&:hover': {
        borderWidth: '1px !important',
        borderColor: `${theme.palette.primary.main} !important`
      },
      '&:focus': {
        borderColor: `${theme.palette.primary.main} !important`,
        borderWidth: '2px !important'
      }
    },
    '& label': {
      color: `${theme.palette.text.secondary} !important`,
      fontSize: '12px !important',
      fontWeight: '400 !important'
    }
  }
}))

function isValidHex(hex: string): boolean {
  return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(hex)
}

// ** Props Interface
interface ColorPickerProps {
  open: boolean
  onClose: () => void
  onSave: (list: { label: string; value: string }[]) => void
}

interface AddSizeProps {
  open: boolean
  onClose: () => void
}

// ** Color Picker Dialog
export function ColorPicker({ open, onClose }: ColorPickerProps) {
  const [customHex, setCustomHex] = useState('#FF0000')
  const [selectedColors, setSelectedColors] = useState<{ label: string; value: string }[]>([])

  const handleColorSave = () => {
    const map = new Map<string, { label: string; value: string }>()
    selectedColors.forEach(c => {
      if (c && typeof c.value === 'string' && isValidHex(c.value)) {
        map.set(c.value.toUpperCase(), { label: c.label, value: c.value.toUpperCase() })
      }
    })

    // onColorsChange(Array.from(map.values()))
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        Select Colors
        <IconButton aria-label='close' onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }} size='small'>
          <Icon icon='tabler:x' />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            getOptionLabel={opt => (typeof opt === 'string' ? opt : opt.label)}
            value={selectedColors}
            onChange={(_, newValue: (string | { label: string; value: string })[]) => {
              const normalized: { label: string; value: string }[] = newValue.map(v => {
                if (typeof v === 'string') {
                  if (isValidHex(v)) {
                    const colorName = namer(v).ntc[0]?.name || v.toUpperCase()
                    return { label: colorName, value: v.toUpperCase() }
                  }
                  return { label: v, value: v }
                } else {
                  return { label: v.label, value: v.value.toUpperCase() }
                }
              })

              const map = new Map<string, { label: string; value: string }>()
              normalized.forEach(item => {
                map.set(String(item.value).toUpperCase(), { label: item.label, value: item.value.toUpperCase() })
              })
              setSelectedColors(Array.from(map.values()))
            }}
            renderTags={(value: any[], getTagProps) =>
              value.map((option, index) => {
                const hex = typeof option === 'string' ? option : option.value
                const lab = typeof option === 'string' ? option : option.label
                return (
                  <Chip
                    {...getTagProps({ index })}
                    key={(hex || lab) + index}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            bgcolor: hex,
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: '50%'
                          }}
                        />
                        {lab}
                      </Box>
                    }
                    onDelete={() => {
                      const valueHex = typeof option === 'string' ? option : option.value
                      setSelectedColors(
                        selectedColors.filter(c => c.value.toUpperCase() !== String(valueHex).toUpperCase())
                      )
                    }}
                  />
                )
              })
            }
            renderInput={params => <TextField {...params} label='Choose colors or paste HEX' size='small' />}
          />
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography variant='subtitle2' sx={{ mb: 1 }}>
            Color Picker
          </Typography>
          <StyledChromePicker>
            <ChromePicker
              color={customHex || '#ffffff'}
              onChange={(c: any) => {
                const hexValue = String(c.hex).toUpperCase()
                setCustomHex(hexValue)

                if (isValidHex(hexValue)) {
                  const exists = selectedColors.some(p => p.value.toUpperCase() === hexValue)
                  if (!exists) {
                    const colorName = namer(hexValue).ntc[0]?.name || hexValue
                    setSelectedColors([...selectedColors, { label: colorName, value: hexValue }])
                  }
                }
              }}
            />
          </StyledChromePicker>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleColorSave} variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function AddSize({ open, onClose }: AddSizeProps) {
  const [newSize, setNewSize] = useState('')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const handleSizeAdd = () => {
    if (newSize.trim()) {
      const upperSize = newSize.trim().toUpperCase()
      if (!selectedSizes.includes(upperSize)) {
        setSelectedSizes([...selectedSizes, upperSize])
      }
      setNewSize('')
    }
  }

  const handleSizeRemove = (size: string) => {
    setSelectedSizes(selectedSizes.filter(s => s !== size))
  }

  const handleSizeSave = () => {
    // Add any additional logic here before closing
    onClose()
  }

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth='sm' fullWidth>
      <DialogTitle>
        Add Sizes
        <IconButton
          aria-label='close'
          onClick={() => onClose()}
          sx={{ position: 'absolute', right: 8, top: 8 }}
          size='small'
        >
          <Icon icon='tabler:x' />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            size='small'
            label='Size (e.g., S, M, L)'
            value={newSize}
            onChange={e => setNewSize(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSizeAdd()
              }
            }}
          />
          <Button variant='contained' onClick={handleSizeAdd} endIcon={<Icon icon='tabler:plus' />}>
            Add
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {selectedSizes.map(s => (
            <Chip key={s} label={s} onDelete={() => handleSizeRemove(s)} />
          ))}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button onClick={handleSizeSave} variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
