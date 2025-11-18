import { useFormState } from 'react-final-form'

import { RFFTextField } from '@/components/fields/RFFTextfield'
import { RFFDatePicker } from '@/components/fields/RFFDatePicker'
import { RFFAutocomplete } from '@/components/fields/RFFAutocomplete'
import { FormSection } from '@/components/ui/FormSection'
import { FormRow } from '@/components/ui/FormRaw'

import { useSwitchField } from '@/hooks/useSwitchField'
import { useFieldRevalidation } from '@/hooks/useFieldRevalidation'

import {
  composeValidators,
  email,
  firstUppercase,
  latinUkrDigitsSpecial,
  minLength,
  phone,
  required,
  rnokpp,
  singleLanguageUaOrEn
} from '../../validators'

import { FORM_FIELDS } from '../../constants/formFields'
import { DESIRABLE_CONNECTION_OPTIONS, GENDERS_OPTIONS } from '../../constants/formOptions'

import { PatientRegistrationFormValues } from '../../types/form'

const NAME_VALIDATION = composeValidators(
  required,
  latinUkrDigitsSpecial,
  singleLanguageUaOrEn,
  firstUppercase
)

const NAME_VALIDATION_OPTIONAL = composeValidators(
  latinUkrDigitsSpecial,
  singleLanguageUaOrEn,
  firstUppercase
)

const PLACE_VALIDATION = composeValidators(
  required,
  latinUkrDigitsSpecial,
  singleLanguageUaOrEn,
  firstUppercase
)

const BIRTH_PLACE_VALIDATION = composeValidators(
  required,
  latinUkrDigitsSpecial,
  singleLanguageUaOrEn
)

export const PatientDataSection = () => {
  const { values } = useFormState<PatientRegistrationFormValues>()
  const { createSwitchHandler } = useSwitchField()

  useFieldRevalidation('rnokpp', [values.birthDate, values.gender])

  return (
    <FormSection title="Дані пацієнта">
      <FormRow columns={3}>
        <RFFTextField
          name={FORM_FIELDS.lastName.name}
          label={FORM_FIELDS.lastName.label}
          required={FORM_FIELDS.lastName.required}
          fullWidth
          validate={NAME_VALIDATION}
        />
        <RFFTextField
          name={FORM_FIELDS.firstName.name}
          label={FORM_FIELDS.firstName.label}
          required={FORM_FIELDS.firstName.required}
          fullWidth
          validate={NAME_VALIDATION}
        />
        <RFFTextField
          name={FORM_FIELDS.middleName.name}
          label={FORM_FIELDS.middleName.label}
          required={FORM_FIELDS.middleName.required}
          fullWidth
          validate={NAME_VALIDATION_OPTIONAL}
          switchChecked={values.ignoreMiddleName}
          switchHelperText={FORM_FIELDS.middleName.switchText}
          onSwitchChange={createSwitchHandler('middleName', 'ignoreMiddleName')}
        />
      </FormRow>

      <FormRow columns={3}>
        <RFFTextField
          name={FORM_FIELDS.rnokpp.name}
          label={FORM_FIELDS.rnokpp.label}
          required={FORM_FIELDS.rnokpp.required}
          fullWidth
          validate={rnokpp({ birthDate: values.birthDate, gender: values.gender })}
          switchChecked={values.ignoreRnokpp}
          switchHelperText={FORM_FIELDS.rnokpp.switchText}
          onSwitchChange={createSwitchHandler('rnokpp', 'ignoreRnokpp')}
        />
        <RFFDatePicker
          name={FORM_FIELDS.birthDate.name}
          label={FORM_FIELDS.birthDate.label}
          required={FORM_FIELDS.birthDate.required}
          fullWidth
          validate={required}
        />
        <RFFAutocomplete
          name={FORM_FIELDS.gender.name}
          label={FORM_FIELDS.gender.label}
          required={FORM_FIELDS.gender.required}
          fullWidth
          options={GENDERS_OPTIONS}
          validate={required}
        />
      </FormRow>

      <FormRow>
        <RFFTextField
          name={FORM_FIELDS.birthCountry.name}
          label={FORM_FIELDS.birthCountry.label}
          required={FORM_FIELDS.birthCountry.required}
          fullWidth
          validate={PLACE_VALIDATION}
        />
        <RFFTextField
          name={FORM_FIELDS.birthPlace.name}
          label={FORM_FIELDS.birthPlace.label}
          required={FORM_FIELDS.birthPlace.required}
          fullWidth
          validate={BIRTH_PLACE_VALIDATION}
        />
      </FormRow>

      <FormRow>
        <RFFAutocomplete
          name={FORM_FIELDS.relationshipMethod.name}
          label={FORM_FIELDS.relationshipMethod.label}
          fullWidth
          options={DESIRABLE_CONNECTION_OPTIONS}
          validate={required}
        />
        <RFFTextField
          name={FORM_FIELDS.secretWord.name}
          label={FORM_FIELDS.secretWord.label}
          required={FORM_FIELDS.secretWord.required}
          fullWidth
          validate={composeValidators(required, latinUkrDigitsSpecial, minLength(6))}
        />
      </FormRow>

      <FormRow>
        <RFFTextField
          name={FORM_FIELDS.phone.name}
          label={FORM_FIELDS.phone.label}
          placeholder={FORM_FIELDS.phone.placeholder}
          fullWidth
          validate={phone}
          mask="+38 (000) 000-00-00"
          maskOptions={{ lazy: true, placeholderChar: '_' }}
        />
        <RFFTextField
          name={FORM_FIELDS.email.name}
          label={FORM_FIELDS.email.label}
          placeholder={FORM_FIELDS.email.placeholder}
          fullWidth
          validate={email}
        />
      </FormRow>
    </FormSection>
  )
}