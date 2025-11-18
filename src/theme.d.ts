import '@mui/material/styles'

import type { ThemeCustom } from '@/theme/custom'

declare module '@mui/material/styles' {
  interface Theme {
    custom: ThemeCustom
  }
  interface ThemeOptions {
    custom?: Partial<ThemeCustom>
  }
}