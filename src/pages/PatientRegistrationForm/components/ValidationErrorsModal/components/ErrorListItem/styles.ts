import { ListItem, styled } from '@mui/material'

export const StyledErrorCard = styled(ListItem)(({ theme }) => ({
  padding: '6px 0',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none'
  }
}))