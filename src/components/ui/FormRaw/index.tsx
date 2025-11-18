import { Stack } from '@mui/material'
import { FC, ReactNode } from 'react'

interface IFormRowProps {
  children: ReactNode
  columns?: 2 | 3
}

export const FormRow: FC<IFormRowProps> = ({ children, columns = 2 }) => (
  <Stack display="grid" gridTemplateColumns={`repeat(${columns}, 1fr)`} gap={2}>
    {children}
  </Stack>
)