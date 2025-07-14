// ** React Imports
import { Fragment, useEffect, useMemo, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import {
  DialogActions,
  FormControl,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'

// ** React Hook Form
import { Controller, useForm, useFieldArray } from 'react-hook-form'

// ** Axios & Endpoint
import axios from 'src/configs/axios'
import endpoints from 'src/configs/endpoints'

// ** Types Import
import { ActionType, PermissionFormValueType } from 'src/types/pages/permission'

// ** Utils Import
import { extractUID } from './utils'

// ** Third Party Imports
import { BeatLoader } from 'react-spinners'
// ** Types
interface DefaultForm {
  roleName: string
  permissions: PermissionFormValueType<ActionType>[]
  uid?: string
  serverError?: string
}

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
  permissionList: PermissionFormValueType<ActionType>[]
  editRowFormDetails: DefaultForm
  handleEditToggle: (mode: 'add' | 'edit' | 'cancle') => void
}

// ** Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Validation
import { requiredNoSpecialCharsWithLabel } from 'src/validators'

// ** Validate

const schema = yup.object().shape({
  roleName: requiredNoSpecialCharsWithLabel('Role Name')
})

// ** Component
const TableHeader = ({
  value,
  handleFilter,
  permissionList,
  editRowFormDetails,
  handleEditToggle
}: TableHeaderProps) => {
  const [open, setOpen] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting }
  } = useForm<DefaultForm>({
    resolver: yupResolver(schema),

    defaultValues: {
      roleName: '',
      permissions: []
    }
  })

  const { fields: permissionsFields } = useFieldArray({
    control,
    name: 'permissions'
  })

  // ** Determine permission status
  const permissionStatus = useMemo(() => {
    const actions = (watch('permissions') || []).flatMap(m => m.actions)
    if (!actions.length) return 'none'
    const all = actions.every(a => a.isSelected)
    const some = actions.some(a => a.isSelected)
    return all ? 'all' : some ? 'some' : 'none'
  }, [watch('permissions')])

  // ** Populate form data on edit
  useEffect(() => {
    const hasEditData = Object.values(editRowFormDetails).every(v => (typeof v === 'string' ? v.length : v.length > 0))

    if (hasEditData) {
      reset(editRowFormDetails)
      setOpen(true)
    } else {
      setValue('permissions', permissionList)
    }
  }, [permissionList, editRowFormDetails])

  // ** Toggle  dialog
  const handleDialogToggle = () => setOpen(prev => !prev)

  const handleCloseDialog = () => {
    setOpen(false)
    handleEditToggle('cancle')
    setValue('roleName', '')
  }

  // ** Handle select all checkbox
  const handleSelectAllCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    const updated = (watch('permissions') || []).map(module => ({
      ...module,
      actions: module.actions.map(action => ({
        ...action,
        isSelected: checked
      }))
    }))
    setValue('permissions', updated)
  }

  // ** Submit form
  const onSubmit = async (data: DefaultForm) => {
    try {
      const payload = {
        roleName: data.roleName,
        permissionIds: extractUID(data.permissions)
      }
      // await axios.post(endpoints.rolePermission.endpoint, payload)
      if (data?.uid) {
        await axios.put(`${endpoints.rolePermission.endpoint}/${data.uid}`, payload)
      } else {
        await axios.post(endpoints.rolePermission.endpoint + '/', payload)
      }

      handleEditToggle(data?.uid ? 'edit' : 'add')
      handleDialogToggle()
      reset()
    } catch (error) {
      //
      console.error(error)
    }
  }

  return (
    <>
      <Box
        sx={{
          p: 5,
          pb: 3,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <TextField
          size='small'
          value={value}
          placeholder='Search Permission'
          onChange={e => handleFilter(e.target.value)}
          sx={{ mr: 4, mb: 2 }}
        />
        <Button variant='contained' onClick={handleDialogToggle} sx={{ mb: 2 }}>
          Add Permission
        </Button>
      </Box>

      <Dialog fullWidth maxWidth='md' scroll='body' open={open} onClose={handleDialogToggle}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Dialog Header */}
          <DialogTitle sx={{ textAlign: 'center', pt: 10, px: 10 }}>
            <Typography variant='h5'>Role Permissions</Typography>
            <Typography variant='body2'>Set Role Permissions</Typography>
          </DialogTitle>

          {/* Dialog Content */}
          <DialogContent sx={{ px: 10, pb: 5 }}>
            {/* Role Name Field */}
            <Box my={4}>
              <FormControl fullWidth>
                <Controller
                  name='roleName'
                  control={control}
                  rules={{
                    required: 'Role Name is required',
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: 'Role Name must not contain spaces or symbols'
                    }
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <TextField
                        {...field}
                        label='Role Name'
                        placeholder='Enter Role Name'
                        error={Boolean(fieldState.error)}
                      />
                      {fieldState.error && (
                        <FormHelperText sx={{ color: 'error.main' }}>{fieldState.error.message}</FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
            </Box>

            {/* Permission Table */}
            <Typography variant='h6'>Role Permissions</Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
                        Administrator Access
                        <Tooltip title='Allows full access to the system'>
                          <Icon icon='tabler:info-circle' fontSize='1.25rem' style={{ marginLeft: 6 }} />
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <FormControlLabel
                        label='Select All'
                        control={
                          <Checkbox
                            size='small'
                            onChange={handleSelectAllCheckbox}
                            indeterminate={permissionStatus === 'some'}
                            checked={permissionStatus === 'all'}
                          />
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {permissionsFields.length > 0 &&
                    permissionsFields.map((module, indexP) => (
                      <TableRow key={indexP}>
                        <TableCell sx={{ fontWeight: 600 }}>{module.title}</TableCell>
                        {module.actions.map((action, indexC) => (
                          <TableCell key={indexC}>
                            <Controller
                              control={control}
                              name={`permissions.${indexP}.actions.${indexC}.isSelected`}
                              render={({ field }) => (
                                <FormControlLabel
                                  label={action.action}
                                  control={
                                    <Checkbox
                                      size='small'
                                      checked={action.isSelected}
                                      onChange={e => field.onChange(e.target.checked)}
                                    />
                                  }
                                />
                              )}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>

          {/* Dialog Actions */}
          <DialogActions sx={{ justifyContent: 'center', pb: 10 }}>
            <Box className='demo-space-x'>
              <Button type='submit' variant='contained'>
                {isSubmitting ? <BeatLoader size={15} color='#ffffff' /> : 'Submit'}
              </Button>
              <Button color='secondary' variant='outlined' onClick={handleCloseDialog}>
                Cancel
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default TableHeader
