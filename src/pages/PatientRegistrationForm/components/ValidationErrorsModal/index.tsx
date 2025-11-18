import { List, Typography, Button } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import { Modal } from '@/components/ui/Modal'
import { getFieldLabel } from '../../constants/formFields'
import { PatientRegistrationFormValues } from '../../types/form'
import { ErrorListItem } from './components/ErrorListItem'

interface ValidationErrorsModalProps {
  open: boolean
  onClose: () => void
  errors: Record<string, string | undefined>
}

export const ValidationErrorsModal = ({
  open,
  onClose,
  errors
}: ValidationErrorsModalProps) => {
  const errorEntries = Object.entries(errors).filter(([, error]) => error)

  if (errorEntries.length === 0) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Помилки валідації"
      icon={<ErrorOutline color="error" />}
      actions={
        <Button onClick={onClose} variant="contained" color="primary" fullWidth>
          Зрозуміло
        </Button>
      }
    >
      <Typography variant="body2" color="text.secondary" mb={2}>
        Будь ласка, виправте наступні помилки перед збереженням:
      </Typography>

      <List disablePadding>
        {errorEntries.map(([fieldName, error]) => (
          <ErrorListItem
            key={fieldName}
            error={error!}
            label={getFieldLabel(fieldName as keyof PatientRegistrationFormValues)}
          />
        ))}
      </List>
    </Modal>
  )
}