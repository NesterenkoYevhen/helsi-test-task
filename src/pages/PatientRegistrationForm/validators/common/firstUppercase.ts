import { type FieldValidator } from 'final-form'

export const firstUppercase: FieldValidator<string> = (value) => {
  if (!value) return undefined

  const regex = /^[A-ZА-ЯІЇЄҐ][A-Za-zА-ЯІЇЄҐа-яіїєґ0-9\s\W]*$/

  return regex.test(value)
    ? undefined
    : 'Перша літера має бути великою'
}
