import { createTheme } from '@mui/material'
import { customColors } from './custom'

export const theme = createTheme({
  custom: customColors,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
          scrollMarginTop: '90px'
        },
        'html, body, #__next': {
          height: '100%'
        },
        a: {
          textDecoration: 'none'
        },
        li: {
          listStyle: 'none'
        },

        fieldset: {
          border: 'none'
        }
      }
    }
  }
})