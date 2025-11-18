import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (

    <Box flex={1} p={3} overflow="auto">
      <Outlet />
    </Box>

  )
}
