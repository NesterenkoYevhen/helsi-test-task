import { PatientRegistrationFormValues } from '../types/form'

export const FORM_FIELDS = {
  lastName: {
    name: 'lastName' as const,
    label: 'Прізвище',
    required: true
  },
  firstName: {
    name: 'firstName' as const,
    label: 'Ім\'я',
    required: true
  },
  middleName: {
    name: 'middleName' as const,
    label: 'По батькові',
    required: true,
    switchText: 'Немає по батькові згідно документів'
  },
  rnokpp: {
    name: 'rnokpp' as const,
    label: 'РНОКПП (ІПН)',
    required: true,
    switchText: 'Немає ІПН за віком чи має відмітку у паспорті'
  },
  birthDate: {
    name: 'birthDate' as const,
    label: 'Дата народження',
    required: true
  },
  gender: {
    name: 'gender' as const,
    label: 'Стать',
    required: true
  },
  birthCountry: {
    name: 'birthCountry' as const,
    label: 'Країна народження',
    required: true
  },
  birthPlace: {
    name: 'birthPlace' as const,
    label: 'Місце народження',
    required: true
  },
  relationshipMethod: {
    name: 'relationshipMethod' as const,
    label: 'Бажаний спосіб зв\'язку із пацієнтом',
    required: true
  },
  secretWord: {
    name: 'secretWord' as const,
    label: 'Секретне слово (не менше 6 символів)',
    required: true
  },
  phone: {
    name: 'phone' as const,
    label: 'Контактний номер телефону',
    placeholder: '+38 (___) ___-__-__',
    required: false
  },
  email: {
    name: 'email' as const,
    label: 'Адреса електронної пошти',
    placeholder: 'example@example.com',
    required: false
  },
  documentType: {
    name: 'documentType' as const,
    label: 'Тип документу',
    required: true
  },
  documentSeries: {
    name: 'documentSeries' as const,
    label: 'Серія (за наявності), номер',
    required: true
  },
  documentIssueDate: {
    name: 'documentIssueDate' as const,
    label: 'Коли видано',
    required: true
  },
  documentExpiryDate: {
    name: 'documentExpiryDate' as const,
    label: 'Діє до',
    required: false
  },
  documentIssuedBy: {
    name: 'documentIssuedBy' as const,
    label: 'Ким видано',
    required: true
  },
  unzr: {
    name: 'unzr' as const,
    label: 'Запис № (УНЗР)',
    placeholder: 'РРРРММДД-XXXXX',
    helperText: 'Вкажіть унікальний номер запису в Демографічному реєстрі (Запис №)',
    required: false
  }
} as const

export const getFieldLabel = (fieldName: keyof PatientRegistrationFormValues): string => {
  const field = Object.values(FORM_FIELDS).find(f => f.name === fieldName)
  return field?.label || fieldName
}

export const FIELD_LABELS: Record<string, string> = Object.values(FORM_FIELDS).reduce(
  (acc, field) => {
    acc[field.name] = field.label
    return acc
  },
  {} as Record<string, string>
)