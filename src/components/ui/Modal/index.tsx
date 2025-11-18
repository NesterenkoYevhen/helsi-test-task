import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Typography,
  type DialogProps
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { FC, ReactNode } from 'react'

interface IModalProps extends Omit<DialogProps, 'onClose' | 'title' | 'children'> {
  open: boolean
  onClose: () => void
  title: string | ReactNode
  icon?: ReactNode
  actions?: ReactNode
  children: ReactNode
  showCloseButton?: boolean
  contentDividers?: boolean
}

export const Modal: FC<IModalProps> = ({
  open,
  onClose,
  title,
  icon,
  actions,
  children,
  showCloseButton = true,
  contentDividers = true,
  maxWidth = 'sm',
  ...dialogProps
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth={maxWidth}
    fullWidth
    slotProps={{
      paper: {
        sx: { borderRadius: 2 }
      }
    }}
    {...dialogProps}
  >
    <DialogTitle pb={1}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={1}>
          {icon}
          {typeof title === 'string' ? (
            <Typography variant="h6" component="span">
              {title}
            </Typography>
          ) : title}
        </Box>
        {showCloseButton && (
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </DialogTitle>

    <DialogContent dividers={contentDividers}>
      {children}
    </DialogContent>

    {actions && (
      <DialogActions sx={{ px: 3, py: 2 }}>
        {actions}
      </DialogActions>
    )}
  </Dialog>
)