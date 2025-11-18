import { Typography } from '@mui/material'
import { PatientRegistrationFormValues } from '../../types/form'
import { FC } from 'react'
import { StyledResultSectionContainer, StyledResultSectionJSONContainer } from './styles'
import { clearObject } from '@/utils/clearObject'

interface IResultSectionProps {
  submittedData: PatientRegistrationFormValues
}

export const ResultSection: FC<IResultSectionProps> = ({ submittedData }) => {

  return (
    <StyledResultSectionContainer>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Введені дані:
      </Typography>
      <StyledResultSectionJSONContainer
        component="pre"
      >
        {JSON.stringify(clearObject(submittedData), null, 2)}
      </StyledResultSectionJSONContainer>
    </StyledResultSectionContainer>
  )
}