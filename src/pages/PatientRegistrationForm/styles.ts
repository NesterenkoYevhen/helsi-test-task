import { Box, styled } from '@mui/material'

export const StyledPatientRegistrationFormHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.custom.lightBlue,
  color: '#fff',
  padding: 12,
  display: 'flex',
  alignItems: 'center'
}))

export const StyledPatientRegistrationFormContainer = styled(Box)(({ theme }) => ({
  minHeight: '100dvh',
  backgroundColor: theme.custom.grey1
}))