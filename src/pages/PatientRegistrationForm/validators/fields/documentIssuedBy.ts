import { type FieldValidator } from 'final-form'

export const documentIssuedBy: FieldValidator<string> = (value) => {
  if (!value) return undefined

  const trimmed = value.trim()

  if (trimmed.length < 3) {
    return 'Введіть повну назву установи'
  }

  if (/[ёыэ]/i.test(trimmed)) {
    return 'Має бути українською або латиницею'
  }

  const validPattern =
    /^[a-zA-ZА-Яа-яІіЇїЄєҐґ0-9 ,.\-()/'"№]+$/u

  if (!validPattern.test(trimmed)) {
    return 'Містить недопустимі символи'
  }

  if (/\s{2,}/.test(trimmed)) {
    return 'Не допускаються подвійні пробіли'
  }

  if (/^[a-zа-яієїґ]/.test(trimmed)) {
    return 'Перша літера має бути великою'
  }

  if (trimmed.length < 5) {
    return 'Занадто коротка назва установи'
  }

  return undefined
}
