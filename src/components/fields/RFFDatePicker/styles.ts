import { styled } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

export const StyledRFFDatePicker = styled(DatePicker)(() => ({
  '& .MuiPickersInputBase-root': {
    backgroundColor: 'transparent',
    borderRadius: 0,
    '&:hover': { backgroundColor: 'transparent' },
    '&.Mui-focused': { backgroundColor: 'transparent' },
    '&.Mui-error': { backgroundColor: 'transparent' },
    '&.Mui-disabled': { backgroundColor: 'transparent' }
  }
}))