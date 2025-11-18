import {
  TextField,
  InputAdornment,
  CircularProgress,
  FilledInput,
  Switch
} from '@mui/material'
import { Field, type FieldRenderProps } from 'react-final-form'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { type FieldValidator } from 'final-form'
import { StyledRFFTextfield } from './styles'
import { FC } from 'react'
import { MaskedInput } from '@/components/ui/MaskedInput'

interface IRFFTextFieldProps
  extends Omit<React.ComponentProps<typeof TextField>, 'name'> {
  name: string
  validate?: FieldValidator<string>
  loading?: boolean
  mask?: string
  maskOptions?: {
    lazy?: boolean
    placeholderChar?: string
  }
  showHelperText?: boolean

  switchChecked?: boolean
  switchHelperText?: string
  onSwitchChange?: (checked: boolean) => void
}

export const RFFTextField: FC<IRFFTextFieldProps> = ({
  name,
  validate,
  loading,
  mask,
  maskOptions,
  switchChecked = false,
  switchHelperText,
  onSwitchChange,
  showHelperText = false,
  ...rest
}) => {
  const hasSwitch = !!onSwitchChange
  const shouldValidate = hasSwitch ? !switchChecked : true

  return (
    <Field name={name} validate={shouldValidate ? validate : undefined}>
      {({ input, meta }: FieldRenderProps<string>) => {
        const isError = !switchChecked && meta.touched && !!meta.error
        const helperText = switchChecked
          ? switchHelperText ?? ' '
          : isError
            ? meta.error
            : rest.helperText ?? ' '

        return (
          <StyledRFFTextfield
            {...rest}
            {...input}
            variant="filled"
            disabled={rest.disabled || switchChecked}
            error={isError}
            helperText={showHelperText && !isError ? rest.helperText : helperText}
            slots={{ input: FilledInput }}
            slotProps={{
              formHelperText: { sx: { minHeight: 20, ml: 0 } },
              input: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputComponent: mask ? MaskedInput as any : undefined,
                inputProps: {
                  mask,
                  maskOptions
                },
                endAdornment: (
                  <>
                    {loading && (
                      <InputAdornment position="end">
                        <CircularProgress size={20} />
                      </InputAdornment>
                    )}

                    {isError && (
                      <InputAdornment position="end">
                        <InfoOutlinedIcon color="error" />
                      </InputAdornment>
                    )}

                    {hasSwitch && (
                      <InputAdornment position="end">
                        <Switch
                          checked={switchChecked}
                          onChange={(e) => onSwitchChange(e.target.checked)}
                          size="small"
                        />
                      </InputAdornment>
                    )}
                  </>
                )
              }
            }}
          />
        )
      }}
    </Field>
  )
}