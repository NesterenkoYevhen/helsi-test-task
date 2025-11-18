import { type FieldValidator } from 'final-form'

export const required: FieldValidator<string> = (value) => {
  return value?.trim() ? undefined : 'Обов\'язкове поле'
}