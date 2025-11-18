import { type FieldValidator } from 'final-form'
import dayjs from 'dayjs'

// https://uk.wikipedia.org/wiki/%D0%A0%D0%B5%D1%94%D1%81%D1%82%D1%80%D0%B0%D1%86%D1%96%D0%B9%D0%BD%D0%B8%D0%B9_%D0%BD%D0%BE%D0%BC%D0%B5%D1%80_%D0%BE%D0%B1%D0%BB%D1%96%D0%BA%D0%BE%D0%B2%D0%BE%D1%97_%D0%BA%D0%B0%D1%80%D1%82%D0%BA%D0%B8_%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D0%B8%D0%BA%D0%B0_%D0%BF%D0%BE%D0%B4%D0%B0%D1%82%D0%BA%D1%96%D0%B2#%D0%A1%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0_%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%D0%B0

interface RnokppOptions {
  birthDate?: string | Date | null
  gender?: string | null
}

export const rnokpp =
  ({ birthDate, gender }: RnokppOptions = {}): FieldValidator<string> =>
    (value) => {
      if (!value) return undefined

      if (!/^\d{10}$/.test(value)) {
        return 'РНОКПП має містити 10 цифр'
      }

      const digits = value.split('').map(Number)

      const daysFromBase = Number(value.slice(0, 5))
      if (daysFromBase < 1) {
        return 'Некоректна дата народження в РНОКПП'
      }

      const base = dayjs('1899-12-31')
      const encodedBirthDate = base.add(daysFromBase, 'day')
      const todayYear = dayjs().year()

      const encodedYear = encodedBirthDate.year()
      if (encodedYear < 1900 || encodedYear > todayYear) {
        return 'Некоректна дата народження в РНОКПП'
      }

      if (birthDate) {
        const inputDate = dayjs(birthDate)

        if (!inputDate.isValid()) {
          return 'Некоректна дата народження'
        }

        if (!inputDate.isSame(encodedBirthDate, 'day')) {
          return 'Дата народження не співпадає з РНОКПП'
        }
      }


      const genderDigit = digits[8]

      const detectedGender = genderDigit % 2 === 1 ? 'male' : 'female'

      if (gender && detectedGender !== gender) {
        return 'Стать не співпадає з РНОКПП'
      }

      const [A, B, C, D, E, F, G, H, I] = digits
      const controlDigit = digits[9]

      const X =
      A * -1 +
      B * 5 +
      C * 7 +
      D * 9 +
      E * 4 +
      F * 6 +
      G * 10 +
      H * 5 +
      I * 7

      const control = ((X % 11) + 11) % 11 % 10

      if (control !== controlDigit) {
        return 'Некоректна контрольна цифра РНОКПП'
      }

      return undefined
    }

