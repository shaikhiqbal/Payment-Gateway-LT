// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import { styled, useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

// ** Styled Component
import { VoiceZoneWrapper } from 'src/@core/styles/libs/react-dropzone'

// ** Types Imports
import { UseFormSetValue } from 'react-hook-form'
import { FormValues } from '.'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(() => ({
  width: 48,
  height: 48
}))

// ** Types Props
interface VoiceUploaderProps {
  setValue: UseFormSetValue<FormValues>
}
const VoiceUploader: React.FC<VoiceUploaderProps> = props => {
  // ** Props
  const { setValue } = props

  // ** State
  const [files, setFiles] = useState<File[]>([])

  // ** Hooks
  const theme = useTheme()
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac']
    },

    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  // ** Handle Remove File
  const handleRemoveFile = () => {
    setFiles([])
  }

  useEffect(() => {
    if (files.length > 0) {
      setValue('audio', files[0])
    } else {
      setValue('audio', null)
    }
  }, [files, setValue])

  return (
    <VoiceZoneWrapper>
      <Box {...getRootProps({ className: 'voice-uploader' })} sx={files.length ? {} : {}}>
        <input {...getInputProps()} />
        {files.length ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Fab disabled variant='extended' sx={{ '& svg': { mr: 1 } }}>
                <Icon icon='fad:logo-audiobus' fontSize={40} />
              </Fab>
              <Typography sx={{ color: 'text.secondary' }}>
                {files[0].name} ({(files[0].size / 1024).toFixed(2)} KB)
              </Typography>
            </Box>
            <Box>
              <Fab color='error' aria-label='add' size='small' onClick={handleRemoveFile}>
                <Icon icon='ri:close-fill' />
              </Fab>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />

            <Typography sx={{ color: 'text.secondary' }}>
              (Only audio files are accepted. Please upload your audio.)
            </Typography>
          </Box>
        )}
      </Box>
    </VoiceZoneWrapper>
  )
}

export default VoiceUploader
