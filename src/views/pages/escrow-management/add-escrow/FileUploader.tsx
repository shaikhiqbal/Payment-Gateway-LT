'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'

export type MediaItem = {
  url: string
  type: 'image' | 'video' | 'link'
}

interface FileUploaderProps {
  value: MediaItem[]
  onChange: (value: MediaItem[]) => void
  allowImage: boolean
}

const isValidVideoUrl = (url: string) => {
  return (
    url.includes('youtube.com') ||
    url.includes('youtu.be') ||
    url.includes('vimeo.com') ||
    url.endsWith('.mp4') ||
    url.endsWith('.webm')
  )
}

const getEmbedUrl = (url: string) => {
  if (url.includes('youtube.com')) {
    const id = new URL(url).searchParams.get('v')
    return `https://www.youtube.com/embed/${id}`
  }

  if (url.includes('youtu.be')) {
    const id = url.split('/').pop()
    return `https://www.youtube.com/embed/${id}`
  }

  if (url.includes('vimeo.com')) {
    const id = url.split('/').pop()
    return `https://player.vimeo.com/video/${id}`
  }

  return url // mp4 / webm
}

const FileUploader = ({ value, onChange, allowImage }: FileUploaderProps) => {
  const [link, setLink] = useState('')
  const [error, setError] = useState('')

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const mappedFiles: MediaItem[] = acceptedFiles.map(file => ({
        url: URL.createObjectURL(file),
        type: file.type.startsWith('video') ? 'video' : 'image'
      }))

      // ✅ append multiple images
      onChange([...value, ...mappedFiles])
    },
    [value, onChange]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true, // ✅ allow multiple files
    accept: allowImage ? { 'image/*': [], 'video/*': [] } : { 'video/*': [] }
  })
  const addLink = () => {
    if (!link.trim()) {
      setError('Video URL is required')
      return
    }

    if (!isValidVideoUrl(link)) {
      setError('Enter a valid video URL (YouTube, Vimeo, MP4)')
      return
    }

    onChange([
      ...value,
      {
        url: getEmbedUrl(link),
        type: 'video'
      }
    ])

    setLink('')
    setError('')
  }
  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <>
      {/* Dropzone */}
      <Box
        {...getRootProps()}
        sx={{
          height: 200,
          border: '2px dashed',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          mb: 3
        }}
      >
        <input {...getInputProps()} />
        <Typography>Upload {allowImage ? 'Images / Video' : 'Video only'}</Typography>
      </Box>

      {/* Link input */}
      <Box display='flex' gap={2} mb={1}>
        <TextField
          fullWidth
          size='small'
          label='Paste video URL'
          value={link}
          error={!!error}
          helperText={error}
          onChange={e => {
            setLink(e.target.value)
            setError('')
          }}
        />
        <Button onClick={addLink}>Add</Button>
      </Box>

      {/* Preview */}
      <Box display='flex' gap={2} flexWrap='wrap'>
        {value.map((item, index) => (
          <Box
            key={index}
            sx={{
              width: 120,
              height: 120,
              position: 'relative',
              border: '1px solid',
              borderRadius: 1,
              overflow: 'hidden'
            }}
          >
            <IconButton
              size='small'
              onClick={() => removeItem(index)}
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                bgcolor: 'background.paper'
              }}
            >
              <Icon icon='tabler:x' fontSize={18} />
            </IconButton>

            {item.type === 'image' && (
              <img src={item.url} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}

            {item.type === 'video' &&
              (item.url.endsWith('.mp4') || item.url.endsWith('.webm') ? (
                <video src={item.url} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <iframe
                  src={item.url}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              ))}
          </Box>
        ))}
      </Box>
    </>
  )
}

export default FileUploader
