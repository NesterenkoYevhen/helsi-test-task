import { type FieldValidator } from 'final-form'

export const latinUkrDigitsSpecial: FieldValidator<string> = (value) => {
  if (!value) return undefined

  const regex =
    /^(?:[A-Za-zА-ЩЬЮЯЄІЇҐа-щьюяєіїґ0-9]|[^\p{L}\p{N}])+$/u

  return regex.test(value)
    ? undefined
    : 'Дозволені англійські/українські літери, цифри та спецсимволи'
}
