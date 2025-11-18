import { type FieldValidator } from 'final-form'

export const phone: FieldValidator<string> = (value) => {
  if (!value) return undefined
  const phoneRegex = /^\+38\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/
  return phoneRegex.test(value)
    ? undefined
    : 'Некоректний номер телефона. Приклад: +38 (093) 999-88-77'
}