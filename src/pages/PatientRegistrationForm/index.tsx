import { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Button
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { Form } from 'react-final-form'
import { type PatientRegistrationFormValues } from './types/form'
import { PatientDataSection } from './buisness/PatientDataSection'
import { DocumentSection } from './buisness/DocumentSection'
import { ResultSection } from './buisness/ResultSection'
import { StyledPatientRegistrationFormContainer, StyledPatientRegistrationFormHeader } from './styles'
import { ValidationErrorsModal } from './buisness/ValidationErrorsModal'

const PatientRegistrationForm = () => {
  const [submittedData, setSubmittedData] =
    useState<PatientRegistrationFormValues | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)

  const onSubmit = (values: PatientRegistrationFormValues) => {
    setSubmittedData(values)
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }, 100)
  }

  const handleSubmitWithValidation = (errors: Record<string, string> | undefined) => {
    if (errors && Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      setIsErrorModalOpen(true)
      setSubmittedData(null)
      return errors
    }
    return undefined
  }

  return (
    <StyledPatientRegistrationFormContainer>
      <StyledPatientRegistrationFormHeader>
        <IconButton sx={{ color: 'white', mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">Створення персони</Typography>
      </StyledPatientRegistrationFormHeader>

      <Box p={3}>
        <Form
          onSubmit={onSubmit}
          validate={() => {
            return undefined
          }}
          render={({ handleSubmit, hasValidationErrors, errors }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (hasValidationErrors) {
                  handleSubmitWithValidation(errors)
                } else {
                  handleSubmit(e)
                }
              }}
            >
              <PatientDataSection />
              <DocumentSection />

              <Box display="flex" justifyContent="center" mb={3}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Зберегти
                </Button>
              </Box>
            </form>
          )}
        />

        {submittedData && (
          <ResultSection submittedData={submittedData} />
        )}
      </Box>

      <ValidationErrorsModal
        open={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        errors={validationErrors}
      />
    </StyledPatientRegistrationFormContainer>
  )
}

export default PatientRegistrationForm