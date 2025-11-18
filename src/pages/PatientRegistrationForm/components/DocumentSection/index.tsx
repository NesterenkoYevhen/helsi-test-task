import { useFormState } from 'react-final-form'
import { RFFAutocomplete } from '@/components/fields/RFFAutocomplete'
import { RFFTextField } from '@/components/fields/RFFTextfield'
import { RFFDatePicker } from '@/components/fields/RFFDatePicker'
import {
  composeValidators,
  documentExpiryDate,
  documentIssuedBy,
  documentSeries,
  required,
  unzr
} from '../../validators'
import { PatientRegistrationFormValues } from '../../types/form'
import { useFieldRevalidation } from '@/hooks/useFieldRevalidation'
import { FormSection } from '@/components/ui/FormSection'
import { FormRow } from '@/components/ui/FormRaw'
import { FORM_FIELDS } from '../../constants/formFields'
import { DOCUMENT_TYPES_OPTIONS } from '../../constants/formOptions'

export const DocumentSection = () => {
  const { values } = useFormState<PatientRegistrationFormValues>()

  useFieldRevalidation('documentSeries', [values.documentType])
  useFieldRevalidation('unzr', [values.birthDate])
  useFieldRevalidation('documentExpiryDate', [values.documentIssueDate])

  return (
    <FormSection title="Документ, що посвідчує особу">
      <FormRow>
        <RFFAutocomplete
          name={FORM_FIELDS.documentType.name}
          label={FORM_FIELDS.documentType.label}
          required={FORM_FIELDS.documentType.required}
          fullWidth
          options={DOCUMENT_TYPES_OPTIONS}
          validate={required}
        />
        <RFFTextField
          name={FORM_FIELDS.documentSeries.name}
          label={FORM_FIELDS.documentSeries.label}
          required={FORM_FIELDS.documentSeries.required}
          fullWidth
          validate={documentSeries(values.documentType)}
        />
      </FormRow>

      <FormRow>
        <RFFDatePicker
          name={FORM_FIELDS.documentIssueDate.name}
          label={FORM_FIELDS.documentIssueDate.label}
          required={FORM_FIELDS.documentIssueDate.required}
          fullWidth
          validate={required}
        />
        <RFFDatePicker
          name={FORM_FIELDS.documentExpiryDate.name}
          label={FORM_FIELDS.documentExpiryDate.label}
          fullWidth
          minDate={values.documentIssueDate}
          maxDate="2100-01-01"
          validate={documentExpiryDate({ issueDate: values.documentIssueDate })}
        />
      </FormRow>

      <FormRow>
        <RFFTextField
          name={FORM_FIELDS.documentIssuedBy.name}
          label={FORM_FIELDS.documentIssuedBy.label}
          required={FORM_FIELDS.documentIssuedBy.required}
          fullWidth
          multiline
          validate={composeValidators(required, documentIssuedBy)}
        />
        <RFFTextField
          name={FORM_FIELDS.unzr.name}
          label={FORM_FIELDS.unzr.label}
          placeholder={FORM_FIELDS.unzr.placeholder}
          fullWidth
          validate={unzr({ birthDate: values.birthDate })}
          helperText={FORM_FIELDS.unzr.helperText}
        />
      </FormRow>
    </FormSection>
  )
}