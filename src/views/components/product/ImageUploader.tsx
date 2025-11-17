// ** React Imports
import { useCallback, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { ProductDropzoneWrapper, ProductUploadedImageWrapper } from 'src/@core/styles/libs/react-dropzone'

// ** Custom Components Imports
import Icon from 'src/@core/components/icon'
import { Button } from '@mui/material'

const ImageUploader = () => {
  // ** State
  const [files, setFiles] = useState<File[]>([])

  // ** Hooks
  const theme = useTheme()

  const iconColor = theme.palette.mode === 'light' ? 'rgba(93, 89, 98, 0.14)' : 'rgba(247, 244, 254, 0.14)'

  const { getRootProps, getInputProps, open } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const handleReplace = useCallback(() => {
    open()
  }, [open])

  return (
    <>
      {!files.length ? (
        <ProductDropzoneWrapper>
          <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 450 } : {}}>
            <input {...getInputProps()} />

            <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Icon icon={'material-symbols-light:image-outline-sharp'} fontSize='8.625rem' color={iconColor} />
            </Box>
          </Box>
        </ProductDropzoneWrapper>
      ) : (
        <ProductUploadedImageWrapper>
          <Box className='uploaded-image'>
            <img src={URL.createObjectURL(files[0])} alt={files[0].name} />
          </Box>
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              onClick={handleReplace}
              size='small'
              variant='contained'
              color='primary'
              startIcon={<Icon icon='tabler:replace' />}
            >
              Replace Image
            </Button>
          </Box>
          {/* Hidden input for file selection */}
          <input {...getInputProps()} style={{ display: 'none' }} />
        </ProductUploadedImageWrapper>
      )}
    </>
  )
}

export default ImageUploader
