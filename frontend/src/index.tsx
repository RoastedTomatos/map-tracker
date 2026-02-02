import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#050816',
      paper: '#0f172a',
    },
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#22c55e',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
