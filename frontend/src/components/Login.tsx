import { Button, TextField, Box, Typography } from '@mui/material'
import { useState } from 'react'

const API_URL = process.env.REACT_APP_API_URL!

export function Login({ onSuccess }: { onSuccess: () => void }) {
  const [key, setKey] = useState('')

  //Since the application size, i decided to not move all feth logic to separate files (api.ts for example)
  const submit = async () => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    })

    if (!res.ok) {
      alert('Invalid key')
      return
    }

    const data = await res.json()
    localStorage.setItem('access_key', data.access_key)
    onSuccess()
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.default"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={4}
        bgcolor="background.paper"
        borderRadius={2}
        boxShadow={3}
        gap={3}
      >
        <Typography variant="h5" fontWeight={600}>
          Login to App
        </Typography>
        <TextField
          label="Access key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          sx={{ width: '300px' }}
        />
        <Button
          variant="contained"
          onClick={submit}
          sx={{ width: '300px', mt: 1 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  )
}
