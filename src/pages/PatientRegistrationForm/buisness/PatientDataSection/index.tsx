import { useFormState, useForm } from 'react-final-form'
import { PatientRegistrationFormValues } from '../../types/form'
import { Paper, Stack, Typography } from '@mui/material'
import { RFFTextField } from '@/components/fields/RFFTextfield'
import { RFFDatePicker } from '@/components/fields/RFFDatePicker'
import { DESIRABLE_CONNECTION_OPTIONS, GENDERS_OPTIONS } from '@/constants/patientRegistrationFormOptions'
import { RFFAutocomplete } from '@/components/fields/RFFAutocomplete'
import { useEffect } from 'react'
import { composeValidators, email, firstUppercase, latinUkrDigitsSpecial, minLength, phone, required, rnokpp, singleLanguageUaOrEn } from '../../validators'

export const PatientDataSection = () => {
  const { values } = useFormState<PatientRegistrationFormValues>()
  const form = useForm()


  useEffect(() => {
    if (values.rnokpp) {
      form.resetFieldState('rnokpp')
      form.change('rnokpp', values.rnokpp)
      form.blur('rnokpp')
    }
  }, [values.birthDate, values.gender])

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Дані пацієнта
      </Typography>

      <Stack spacing={2}>
        <Stack display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
          <RFFTextField
            name="lastName"
            label="Прізвище"
            required
            fullWidth
            validate={composeValidators(required, latinUkrDigitsSpecial, singleLanguageUaOrEn, firstUppercase)}
          />
          <RFFTextField
            name="firstName"
            label="Ім'я"
            required
            fullWidth
            validate={composeValidators(required, latinUkrDigitsSpecial, singleLanguageUaOrEn, firstUppercase)}
          />
          <RFFTextField
            name="middleName"
            label="По батькові"
            required
            fullWidth
            validate={composeValidators(latinUkrDigitsSpecial, singleLanguageUaOrEn, firstUppercase)}
            switchChecked={values.ignoreMiddleName}
            switchHelperText="Немає по батькові згідно документів"
            onSwitchChange={(checked) => {
              form.change('ignoreMiddleName', checked)
              if (checked) {
                form.change('middleName', '')
              }
            }}
          />
        </Stack>

        <Stack display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
          <RFFTextField
            name="rnokpp"
            label="РНОКПП (ІПН)"
            required
            fullWidth
            validate={composeValidators(rnokpp({
              birthDate: values.birthDate,
              gender: values.gender
            }))}
            switchChecked={values.ignoreRnokpp}
            switchHelperText="Немає ІПН за віком чи має відмітку у паспорті"
            onSwitchChange={(checked) => {
              form.change('ignoreRnokpp', checked)
              if (checked) {
                form.change('rnokpp', '')
              }
            }}
          />
          <RFFDatePicker
            name="birthDate"
            label="Дата народження"
            required
            fullWidth
            validate={required}
          />
          <RFFAutocomplete
            name="gender"
            label="Стать"
            required
            fullWidth
            options={GENDERS_OPTIONS}
            validate={required}
          />
        </Stack>

        <Stack display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <RFFTextField
            name="birthCountry"
            label="Країна народження"
            required
            fullWidth
            validate={composeValidators(required, latinUkrDigitsSpecial, singleLanguageUaOrEn, firstUppercase)}
          />
          <RFFTextField
            name="birthPlace"
            label="Місце народження"
            required
            fullWidth
            validate={composeValidators(required, latinUkrDigitsSpecial, singleLanguageUaOrEn)}
          />
        </Stack>

        <Stack display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <RFFAutocomplete
            name="relationshipMethod"
            label="Бажаний спосіб зв'язку із пацієнтом"
            fullWidth
            options={DESIRABLE_CONNECTION_OPTIONS}
            validate={required}
          />
          <RFFTextField
            name="secretWord"
            label="Секретне слово (не менше 6 символів)"
            required
            fullWidth
            validate={composeValidators(required, latinUkrDigitsSpecial, minLength(6))}
          />
        </Stack>

        <Stack display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <RFFTextField
            name="phone"
            label="Контактний номер телефону"
            placeholder="+38 (___) ___-__-__"
            fullWidth
            validate={phone}
            mask="+38 (000) 000-00-00"
            maskOptions={{
              lazy: true,
              placeholderChar: '_'
            }}
          />
          <RFFTextField
            name="email"
            label="Адреса електронної пошти"
            placeholder="example@example.com"
            fullWidth
            validate={email}
          />
        </Stack>
      </Stack>
    </Paper>
  )
}