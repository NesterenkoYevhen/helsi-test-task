import { type FieldValidator } from 'final-form'

export const composeValidators =
  (...validators: Array<FieldValidator<string>>): FieldValidator<string> =>
    (value, allValues, meta) => {
      for (const validator of validators) {
        const error = validator(value, allValues, meta)
        if (error) return error
      }
      return undefined
    }
