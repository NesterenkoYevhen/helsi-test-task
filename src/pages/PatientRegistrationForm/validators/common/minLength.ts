import { type FieldValidator } from 'final-form'

export const minLength = (min: number): FieldValidator<string> => {
  return (value) => {
    if (!value) return undefined
    return value.length >= min ? undefined : `Мінімум ${min} символів`
  }
}