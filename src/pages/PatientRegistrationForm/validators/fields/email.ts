import { type FieldValidator } from 'final-form'

// https://www.ditig.com/characters-allowed-in-email-addresses

export const email: FieldValidator<string> = (value) => {
  if (!value) return undefined

  const trimmedValue = value.trim()

  if (trimmedValue.length > 254) {
    return 'Email занадто довгий (максимум 254 символи)'
  }

  const atIndex = trimmedValue.indexOf('@')
  if (atIndex === -1) {
    return 'Email повинен містити символ @'
  }

  const localPart = trimmedValue.substring(0, atIndex)
  const domain = trimmedValue.substring(atIndex + 1)

  if (localPart.length === 0 || localPart.length > 64) {
    return 'Некоректна довжина до символу @'
  }

  if (domain.length === 0 || domain.length > 255) {
    return 'Некоректна довжина домену'
  }

  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return 'Email не може починатися або закінчуватися крапкою перед @'
  }

  if (localPart.includes('..')) {
    return 'Email не може містити дві крапки підряд'
  }

  if (domain.startsWith('.') || domain.endsWith('.')) {
    return 'Домен не може починатися або закінчуватися крапкою'
  }

  if (domain.includes('..')) {
    return 'Домен не може містити дві крапки підряд'
  }

  if (!domain.includes('.')) {
    return 'Домен повинен містити крапку'
  }

  const tld = domain.split('.').pop()
  if (tld && tld.length < 2) {
    return 'Домен верхнього рівня повинен містити мінімум 2 символи'
  }

  const emailRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/i

  if (!emailRegex.test(trimmedValue)) {
    return 'Некоректний формат email. Приклад: example@example.com'
  }


  return undefined
}