import { Box } from '@mui/material'
import { MapView } from './components/MapView'
import { useObjects } from './hooks/useObjects'
import { Login } from './components/Login'
import { useState } from 'react'
import { Sidebar } from './components/Sidebar'

const SIDEBAR_WIDTH = 320

export const App = () => {
  const [isAuth, setIsAuth] = useState(
    Boolean(localStorage.getItem('access_key'))
  )

  useObjects(isAuth)

  if (!isAuth) {
    return <Login onSuccess={() => setIsAuth(true)} />
  }

  return (
    <Box
      display="flex"
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      overflow="hidden"
      sx={{
        '*': { boxSizing: 'border-box', margin: 0, padding: 0 },
      }}
    >
      <Box flex="1 1 auto" minWidth={0} height="100%" overflow="hidden">
        <MapView />
      </Box>

      <Box
        width={`${SIDEBAR_WIDTH}px`}
        height="100%"
        bgcolor="background.paper"
        boxShadow={3}
        overflow="hidden"
      >
        <Sidebar />
      </Box>
    </Box>
  )
}
