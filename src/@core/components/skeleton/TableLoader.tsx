import { Box, Skeleton } from '@mui/material'

const TableLoader = () => (
  <Box sx={{ width: '100%', height: 400, p: 2 }}>
    {[...Array(10)].map((_, i) => (
      <Skeleton key={i} height={50} sx={{ mb: 1 }} />
    ))}
  </Box>
)
export default TableLoader
