// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { ProductDropzoneWrapper } from 'src/@core/styles/libs/react-dropzone'

// ** Custom Components Imports
import Icon from 'src/@core/components/icon'

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  marginBottom: theme.spacing(8.5)
}))

const ImageUploader = () => {
  // ** State
  const [files, setFiles] = useState<File[]>([])

  // ** Hooks
  const theme = useTheme()

  const iconColor = theme.palette.mode === 'light' ? 'rgba(93, 89, 98, 0.14)' : 'rgba(247, 244, 254, 0.14)'

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const img = files.map((file: FileProp) => (
    <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file as any)} />
  ))

  return (
    <ProductDropzoneWrapper>
      <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 450 } : {}}>
        <input {...getInputProps()} />
        {files.length ? (
          img
        ) : (
          <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {/* <Img alt='Upload img' src={/images/misc/upload-{theme.palette.mode}.png} /> */}

            <Icon icon={'material-symbols-light:image-outline-sharp'} fontSize='8.625rem' color={iconColor} />
          </Box>
        )}
      </Box>
    </ProductDropzoneWrapper>
  )
}

export default ImageUploader
