import { Paper, Stack, Typography } from '@mui/material'
import { FC, ReactNode } from 'react'

interface IFormSectionProps {
  title: string
  children: ReactNode
}

export const FormSection: FC<IFormSectionProps> = ({ title, children }) => (
  <Paper sx={{ p: 3, mb: 3 }}>
    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
      {title}
    </Typography>
    <Stack spacing={2}>{children}</Stack>
  </Paper>
)