import dayjs from 'dayjs'
import { type FieldValidator } from 'final-form'

interface ExpiryValidatorArgs {
  issueDate?: string | null;
}

export const documentExpiryDate =
  ({ issueDate }: ExpiryValidatorArgs): FieldValidator<string> =>
    (value) => {
      if (!value) return undefined

      const expiry = dayjs(value, 'YYYY-MM-DD')
      const today = dayjs().startOf('day')

      if (!expiry.isValid()) {
        return 'Некоректна дата закінчення дії документу'
      }

      if (issueDate) {
        const issued = dayjs(issueDate, 'YYYY-MM-DD')

        if (!issued.isValid()) {
          return 'Некоректна дата видачі документу'
        }

        if (expiry.isBefore(issued)) {
          return 'Дата "Діє до" не може бути раніше дати видачі'
        }
      }

      if (expiry.isBefore(today)) {
        return 'Документ недійсний - термін дії минув'
      }

      if (issueDate) {
        const issued = dayjs(issueDate)
        if (expiry.diff(issued, 'day') < 1) {
          return 'Термін дії має бути щонайменше 1 день'
        }
      }

      return undefined
    }
