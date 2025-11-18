import { ListItem, styled } from '@mui/material'

export const StyledErrorCard = styled(ListItem)(() => ({
  padding: '6px 0',
  borderBottom: '1px solid divider',
  '&:last-child': {
    borderBottom: 'none'
  }
}))