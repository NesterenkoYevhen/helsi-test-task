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

const PatientRegistrationForm = () => {
  const [submittedData, setSubmittedData] =
    useState<PatientRegistrationFormValues | null>(null)

  const onSubmit = (values: PatientRegistrationFormValues) => {
    setSubmittedData(values)
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }, 100)
  }

  return (
    <StyledPatientRegistrationFormContainer>
      <StyledPatientRegistrationFormHeader
      >
        <IconButton sx={{ color: 'white', mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">Створення персони</Typography>
      </StyledPatientRegistrationFormHeader>

      <Box p={3}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
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
    </StyledPatientRegistrationFormContainer>
  )
}

export default PatientRegistrationForm