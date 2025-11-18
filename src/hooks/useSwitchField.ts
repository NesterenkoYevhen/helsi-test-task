import { useCallback } from 'react'
import { useForm } from 'react-final-form'

export const useSwitchField = () => {
  const form = useForm()

  const createSwitchHandler = useCallback(
    (field: string, ignoreField: string) => (checked: boolean) => {
      form.change(ignoreField, checked)
      if (checked) {
        form.change(field, '')
      }
    },
    [form]
  )

  return { createSwitchHandler }
}