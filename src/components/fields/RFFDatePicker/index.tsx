import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Field, type FieldRenderProps } from 'react-final-form'
import { type FieldValidator } from 'final-form'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/uk'
import { StyledRFFDatePicker } from './styles'
import { FC } from 'react'

interface IRFFDatePickerProps {
  name: string
  label: string
  required?: boolean
  fullWidth?: boolean
  validate?: FieldValidator<string>
  disabled?: boolean
  minDate?: string | Dayjs
  maxDate?: string | Dayjs
}

export const RFFDatePicker: FC<IRFFDatePickerProps> = ({
  name,
  label,
  required,
  fullWidth,
  validate,
  disabled,
  minDate,
  maxDate
}) => {
  const defaultMin = dayjs('1900-01-01')
  const defaultMax = dayjs()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
      <Field name={name} validate={validate}>
        {({ input, meta }: FieldRenderProps<string>) => {
          const isError = meta.touched && !!meta.error
          const dateValue = input.value ? dayjs(input.value) : null

          return (
            <StyledRFFDatePicker
              label={label}
              value={dateValue}
              disabled={disabled}
              minDate={minDate ? dayjs(minDate) : defaultMin}
              maxDate={maxDate ? dayjs(maxDate) : defaultMax}
              onChange={(newValue: Dayjs | null) => {
                input.onChange(newValue ? newValue.format('YYYY-MM-DD') : '')
              }}
              slotProps={{
                textField: {
                  required,
                  fullWidth,
                  variant: 'filled',
                  error: isError,
                  helperText: isError ? meta.error : ' ',
                  onBlur: input.onBlur,
                  inputProps: {
                    readOnly: true
                  },
                  onKeyDown: (e) => e.preventDefault(),
                  FormHelperTextProps: {
                    sx: { minHeight: 20, ml: 0 }
                  }
                }
              }}
            />
          )
        }}
      </Field>
    </LocalizationProvider>
  )
}
