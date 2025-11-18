import { type FieldValidator } from 'final-form'

export const singleLanguageUaOrEn: FieldValidator<string> = (value) => {
  if (!value) return undefined

  const ukrLetters = /[А-ЩЬЮЯЄІЇҐа-щьюяєіїґ]/u
  const engLetters = /[A-Za-z]/u

  const hasUkr = ukrLetters.test(value)
  const hasEng = engLetters.test(value)

  if (hasUkr && hasEng) {
    return 'Текст має бути введений однією мовою - українською або англійською'
  }

  return undefined
}
