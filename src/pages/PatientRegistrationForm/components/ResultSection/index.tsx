import { Typography } from '@mui/material'
import { PatientRegistrationFormValues } from '../../types/form'
import { FC } from 'react'
import { StyledJSONContainer, StyledResultContainer } from './styles'
import { clearObject } from '@/utils/clearObject'

interface IResultSectionProps {
  submittedData: PatientRegistrationFormValues
}

export const ResultSection: FC<IResultSectionProps> = ({ submittedData }) => (
  <StyledResultContainer>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
      Введені дані:
    </Typography>
    <StyledJSONContainer component="pre">
      {JSON.stringify(clearObject(submittedData, ['ignoreMiddleName', 'ignoreRnokpp']), null, 2)}
    </StyledJSONContainer>
  </StyledResultContainer>
)