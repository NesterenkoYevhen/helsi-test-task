import { styled, TextField } from '@mui/material'

export const StyledRFFTextfield = styled(TextField)(() => ({
  '& .MuiFilledInput-root': {
    backgroundColor: 'transparent',
    borderRadius: 0,
    '&:hover': { backgroundColor: 'transparent' },
    '&.Mui-focused': { backgroundColor: 'transparent' },
    '&.Mui-error': { backgroundColor: 'transparent' },
    '&.Mui-disabled': { backgroundColor: 'transparent' }
  }
}))