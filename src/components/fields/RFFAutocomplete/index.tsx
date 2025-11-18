import { Autocomplete } from '@mui/material'
import { Field, type FieldRenderProps } from 'react-final-form'
import type { FieldValidator } from 'final-form'
import { StyledRFFTextfield } from '../RFFTextfield/styles'
import { FC } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface IRFFAutocompleteProps {
  name: string
  label?: string
  options: SelectOption[]
  validate?: FieldValidator<string>
  fullWidth?: boolean
  required?: boolean
}

export const RFFAutocomplete: FC<IRFFAutocompleteProps> = ({
  name,
  label,
  options,
  validate,
  fullWidth,
  required
}) => {
  return (
    <Field name={name} validate={validate}>
      {({ input, meta }: FieldRenderProps<string>) => {
        const selectedOption =
          options.find((o) => o.value === input.value) ?? null

        return (
          <Autocomplete
            options={options}
            value={selectedOption}
            fullWidth={fullWidth}
            onChange={(_, newValue) => {
              input.onChange(newValue?.value ?? '')
            }}
            onBlur={input.onBlur}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(o, v) => o.value === v.value}
            renderInput={(params) => (
              <StyledRFFTextfield
                {...params}
                variant="filled"
                label={label}
                required={required}
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ' '}
              />
            )}
          />
        )
      }}
    </Field>
  )
}
