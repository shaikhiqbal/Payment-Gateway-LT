// ** React Imports
import { useEffect, useState } from 'react'

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

// ** Types Import
import { ActionType, PermissionFormValueType } from 'src/types/pages/permission'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
  permissionList: PermissionFormValueType<ActionType>[]
}

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface DefaultForm {
  roleName: string
  permissions: PermissionFormValueType<ActionType>[]
}
const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, handleFilter, permissionList } = props

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  // ** Toggle Dialog
  const handleDialogToggle = () => setOpen(!open)

  // ** Form Controllers
  const { control, handleSubmit, setValue, watch } = useForm<DefaultForm>({
    defaultValues: {
      roleName: '',
      permissions: []
    }
  })

  // ** Watch Permissions
  const permissionStatus = (() => {
    const perms = watch('permissions') || []
    const actions = perms.flatMap(m => m.actions)
    if (!actions.length) return 'none'
    const all = actions.every(a => a.isSelected)
    const some = actions.some(a => a.isSelected)
    return all ? 'all' : some ? 'some' : 'none'
  })()

  const { fields: permisions, append } = useFieldArray({
    control,
    name: 'permissions'
  })

  // ** Set Permission List
  useEffect(() => {
    if (permissionList) {
      setValue('permissions', permissionList)
    }
  }, [permissionList])

  // ** Handle Form Submit
  const onSubmit = async (data: DefaultForm) => {
    try {
      console.log(data)
    } catch (error) {}
  }

  return (
    <>
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search Permission'
          onChange={e => handleFilter(e.target.value)}
        />
        <Button sx={{ mb: 2 }} variant='contained' onClick={handleDialogToggle}>
          Add Permission
        </Button>
      </Box>
      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleDialogToggle} open={open}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            sx={{
              textAlign: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Typography variant='h5' component='span'>
              {/* {`${dialogTitle} Role`} */}
            </Typography>
            <Typography variant='body2'>Set Role Permissions</Typography>
          </DialogTitle>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(5)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <Box sx={{ my: 4 }}>
              <FormControl fullWidth>
                <TextField label='Role Name' placeholder='Enter Role Name' />
              </FormControl>
            </Box>
            <Typography variant='h6'>Role Permissions</Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ pl: '0 !important' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          fontSize: '0.875rem',
                          whiteSpace: 'nowrap',
                          alignItems: 'center',
                          textTransform: 'capitalize',
                          '& svg': { ml: 1, cursor: 'pointer' }
                        }}
                      >
                        Administrator Access
                        <Tooltip placement='top' title='Allows a full access to the system'>
                          <Box sx={{ display: 'flex' }}>
                            <Icon icon='tabler:info-circle' fontSize='1.25rem' />
                          </Box>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <FormControlLabel
                        label='Select All'
                        sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                        control={
                          <Checkbox
                            size='small'
                            // onChange={handleSelectAllCheckbox}
                            indeterminate={permissionStatus == 'some'}
                            checked={permissionStatus == 'all'}
                          />
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {permisions?.length
                    ? permisions.map((module, indexP) => {
                        const { title, actions } = module
                        return (
                          <TableRow key={indexP} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                color: theme => `${theme.palette.text.primary} !important`
                              }}
                            >
                              {title}
                            </TableCell>

                            {actions.map((action, indexC) => (
                              <TableCell>
                                <Controller
                                  control={control}
                                  name={`permissions.${indexP}.actions.${indexC}.isSelected`}
                                  render={({ field, fieldState }) => (
                                    <FormControlLabel
                                      label={action.action}
                                      control={<Checkbox size='small' {...field} />}
                                    />
                                  )}
                                />
                              </TableCell>
                            ))}
                          </TableRow>
                        )
                      })
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Box className='demo-space-x'>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
              <Button color='secondary' variant='outlined' onClick={handleDialogToggle}>
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
