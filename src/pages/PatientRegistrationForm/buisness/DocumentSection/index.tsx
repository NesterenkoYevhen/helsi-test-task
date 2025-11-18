import { useForm, useFormState } from 'react-final-form'
import { PatientRegistrationFormValues } from '../../types/form'
import { Paper, Stack, Typography } from '@mui/material'
import { RFFAutocomplete } from '@/components/fields/RFFAutocomplete'
import { RFFTextField } from '@/components/fields/RFFTextfield'
import { RFFDatePicker } from '@/components/fields/RFFDatePicker'
import { DOCUMENT_TYPES_OPTIONS } from '@/constants/patientRegistrationFormOptions'
import { useEffect } from 'react'
import { composeValidators, documentExpiryDate, documentIssuedBy, documentSeries, required, unzr } from '../../validators'

export const DocumentSection = () => {
  const { values } = useFormState<PatientRegistrationFormValues>()
  const form = useForm()


  useEffect(() => {
    if (values.documentSeries) {
      form.resetFieldState('documentSeries')
      form.change('documentSeries', values.documentSeries)
      form.blur('documentSeries')
    }
  }, [values.documentType])

  useEffect(() => {
    if (values.unzr) {
      form.resetFieldState('unzr')
      form.change('unzr', values.unzr)
      form.blur('unzr')
    }
  }, [values.birthDate])

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Документ, що посвідчує особу
      </Typography>

      <Stack spacing={2}>

        <Stack display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <RFFAutocomplete
            name="documentType"
            label="Тип документу"
            required
            fullWidth
            options={DOCUMENT_TYPES_OPTIONS}
            validate={required}
          />

          <RFFTextField
            name="documentSeries"
            label="Серія (за наявності), номер"
            required
            fullWidth
            validate={documentSeries(values.documentType)}
          />
        </Stack>

        <Stack display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <RFFDatePicker
            name="documentIssueDate"
            label="Коли видано"
            required
            fullWidth
            validate={required}
          />

          <RFFDatePicker
            name="documentExpiryDate"
            label="Діє до"
            fullWidth
            minDate={values.documentIssueDate}
            maxDate="2100-01-01"
            validate={documentExpiryDate({
              issueDate: values.documentIssueDate
            })}
          />
        </Stack>

        <Stack display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <RFFTextField
            name="documentIssuedBy"
            label="Ким видано"
            required
            fullWidth
            multiline
            validate={composeValidators(required, documentIssuedBy)}
          />
          <RFFTextField
            name="unzr"
            label="Запис № (УНЗР)"
            placeholder="РРРРММДД-XXXXX"
            fullWidth
            validate={unzr({ birthDate: values.birthDate })}
            helperText="Вкажіть унікальний номер запису в Демографічному реєстрі (Запис №)"
          />
        </Stack>
      </Stack>
    </Paper>
  )
}
