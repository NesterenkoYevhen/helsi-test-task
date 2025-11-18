import { Box, Typography, IconButton, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { Form } from 'react-final-form'
import { useCallback } from 'react'

import { useFormSubmission } from './hooks/useFormSubmission'
import { PatientDataSection } from './components/PatientDataSection'
import { DocumentSection } from './components/DocumentSection'
import { ResultSection } from './components/ResultSection'
import { ValidationErrorsModal } from './components/ValidationErrorsModal'

import {
  StyledPatientRegistrationFormContainer,
  StyledPatientRegistrationFormHeader,
  StyledSubmitWrapper
} from './styles'
import type { FormErrors, PatientRegistrationFormValues } from './types/form'

const PatientRegistrationForm = () => {
  const {
    submittedData,
    validationErrors,
    isErrorModalOpen,
    handleSubmit,
    handleValidationErrors,
    closeErrorModal
  } = useFormSubmission()

  const onFormSubmit = useCallback(
    (
      formHandleSubmit: () => void,
      hasValidationErrors: boolean,
      errors: FormErrors<PatientRegistrationFormValues>
    ) => {
      if (hasValidationErrors) {
        handleValidationErrors(errors)
      } else {
        formHandleSubmit()
      }
    },
    [handleValidationErrors]
  )

  return (
    <StyledPatientRegistrationFormContainer>
      <StyledPatientRegistrationFormHeader>
        <IconButton color="inherit">
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">Створення персони</Typography>
      </StyledPatientRegistrationFormHeader>

      <Box p={3}>
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit: formHandleSubmit, hasValidationErrors, errors }) => (
            <form onSubmit={(e) => {
              e.preventDefault()
              onFormSubmit(formHandleSubmit, hasValidationErrors, errors)
            }}>
              <PatientDataSection />
              <DocumentSection />

              <StyledSubmitWrapper>
                <Button type="submit" variant="contained" size="large">
                  Зберегти
                </Button>
              </StyledSubmitWrapper>
            </form>
          )}
        />

        {submittedData && <ResultSection submittedData={submittedData} />}
      </Box>

      <ValidationErrorsModal
        open={isErrorModalOpen}
        onClose={closeErrorModal}
        errors={validationErrors}
      />
    </StyledPatientRegistrationFormContainer>
  )
}

export default PatientRegistrationForm
