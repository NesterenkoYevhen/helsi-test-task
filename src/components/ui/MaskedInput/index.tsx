import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'

interface IMaskedInputProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
  mask?: string
  maskOptions?: {
    lazy?: boolean
    placeholderChar?: string
  }
}

export const MaskedInput = forwardRef<HTMLInputElement, IMaskedInputProps>(
  function MaskedInput(props, ref) {
    const { onChange, mask, maskOptions, ...other } = props

    if (!mask) {
      return <input {...other} ref={ref} />
    }

    return (
      <IMaskInput
        {...other}
        mask={mask}
        {...maskOptions}
        inputRef={ref}
        onAccept={(value: string) =>
          onChange({ target: { name: props.name, value } })
        }
      />
    )
  }
)