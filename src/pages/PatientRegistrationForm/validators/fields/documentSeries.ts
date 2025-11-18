import { type FieldValidator } from 'final-form'

export const documentSeries =
  (documentType: string): FieldValidator<string> =>
    (value) => {
      if (!value) return 'Поле не може бути пустим'

      const trimmed = value.trim()

      if (documentType === 'id_card') {
        const regex = /^\d{9}$/
        return regex.test(trimmed)
          ? undefined
          : 'Номер ID-картки має містити 9 цифр'
      }

      if (documentType === 'passport_book') {
        const regex = new RegExp('^[А-ЯІЇЄҐа-яіїєґ]{2}\\d{6}$')
        return regex.test(trimmed)
          ? undefined
          : 'Серія паспорта має складатися з 2 літер та 6 цифр'
      }

      const fallback = new RegExp('^[А-ЯІЇЄҐа-яіїєґ]{3}\\d{5,9}$')
      return fallback.test(trimmed)
        ? undefined
        : 'Номер має містити 3 українські літери та від 5 до 9 цифр'
    }
