import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItemText,
  Typography,
  IconButton,
  Box
} from '@mui/material'
import { Close as CloseIcon, ErrorOutline } from '@mui/icons-material'
import { StyledErrorCard } from './styles'

interface ValidationErrorsModalProps {
  open: boolean
  onClose: () => void
  errors: Record<string, string | undefined>
  fieldLabels?: Record<string, string>
}

const DEFAULT_FIELD_LABELS: Record<string, string> = {
  lastName: 'Прізвище',
  firstName: 'Ім\'я',
  middleName: 'По батькові',
  rnokpp: 'РНОКПП (ІПН)',
  birthDate: 'Дата народження',
  gender: 'Стать',
  birthCountry: 'Країна народження',
  birthPlace: 'Місце народження',
  relationshipMethod: 'Бажаний спосіб зв\'язку',
  secretWord: 'Секретне слово',
  phone: 'Контактний номер телефону',
  email: 'Адреса електронної пошти',
  documentType: 'Тип документу',
  documentSeries: 'Серія (за наявності), номер',
  documentIssueDate: 'Коли видано',
  documentExpiryDate: 'Діє до',
  documentIssuedBy: 'Ким видано',
  unzr: 'Запис № (УНЗР)'
}

export const ValidationErrorsModal = ({
  open,
  onClose,
  errors,
  fieldLabels = DEFAULT_FIELD_LABELS
}: ValidationErrorsModalProps) => {
  const errorEntries = Object.entries(errors).filter(([, error]) => error)

  if (errorEntries.length === 0) {
    return null
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2
          }
        }
      }}
    >
      <DialogTitle pb={1}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <ErrorOutline color="error" />
            <Typography variant="h6" component="span">
              Помилки валідації
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Будь ласка, виправте наступні помилки перед збереженням:
        </Typography>

        <List disablePadding>
          {errorEntries.map(([fieldName, error]) => (
            <StyledErrorCard
              key={fieldName}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle2" fontWeight={600}>
                    {fieldLabels[fieldName] || fieldName}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                }
              />
            </StyledErrorCard>
          ))}
        </List>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          fullWidth
        >
          Зрозуміло
        </Button>
      </DialogActions>
    </Dialog>
  )
}