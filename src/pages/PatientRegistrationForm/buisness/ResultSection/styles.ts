import { styled } from '@mui/material/styles'
import { Box, Paper } from '@mui/material'

export const StyledResultSectionContainer = styled(Paper)(({ theme }) => ({
  padding: 18,
  backgroundColor: theme.custom.grey2
}))

export const StyledResultSectionJSONContainer = styled(Box)<{
  component?: React.ElementType
}>(({ theme }) => ({
  backgroundColor: '#fff',
  padding: 12,
  borderRadius: 6,
  overflow: 'auto',
  fontSize: '0.875rem',
  border: `1px solid ${theme.custom.grey3}`,
  fontFamily: 'monospace'
}))
