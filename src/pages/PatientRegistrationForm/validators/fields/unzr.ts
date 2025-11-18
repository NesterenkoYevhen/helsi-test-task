import { type FieldValidator } from 'final-form'
import dayjs from 'dayjs'

interface UnzrOptions {
  birthDate?: string | null;
}

export const unzr =
  ({ birthDate }: UnzrOptions = {}): FieldValidator<string> =>
    (value) => {
      if (!value) return undefined

      const normalized = value.replace(/-/g, '')

      if (!/^\d{13}$/.test(normalized)) {
        return 'УНЗР повинен містити 13 цифр (формат РРРРММДД-XXXXX)'
      }

      const datePart = normalized.slice(0, 8)
      const numberPart = normalized.slice(8)

      const parsedDate = dayjs(datePart, 'YYYYMMDD', true)

      if (!parsedDate.isValid()) {
        return 'Некоректна дата народження в УНЗР'
      }

      if (parsedDate.isAfter(dayjs())) {
        return 'Дата народження в УНЗР не може бути у майбутньому'
      }

      if (birthDate) {
        const bd = dayjs(birthDate)

        if (bd.isValid() && !bd.isSame(parsedDate, 'day')) {
          return 'Дата народження не співпадає з УНЗР'
        }
      }

      if (!/^\d{5}$/.test(numberPart)) {
        return 'Останні 5 символів УНЗР - це цифри порядкового номеру'
      }

      if (Number(numberPart) === 0) {
        return 'Порядковий номер УНЗР не може бути 00000'
      }

      return undefined
    }
