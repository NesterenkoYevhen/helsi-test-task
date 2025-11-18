import { FC } from 'react'
import { StyledErrorCard } from './styles'
import { ListItemText, Typography } from '@mui/material'

interface IErrorListItemProps {
  error: string
  label: string
}

export const ErrorListItem: FC<IErrorListItemProps> = ({
  error,
  label
}) => (
  <StyledErrorCard
  >
    <ListItemText
      primary={
        <Typography variant="subtitle2" fontWeight={600}>
          {label}
        </Typography>
      }
      secondary={
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      }
    />
  </StyledErrorCard>
)