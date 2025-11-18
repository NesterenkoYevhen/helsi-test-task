import { IOption } from '@/types/common'

export const DOCUMENT_TYPES_OPTIONS: IOption[] = [
  { value: '', label: '-- Вибрати --' },
  { value: 'need_protection', label: 'Посвідчення особи, яка потребує додаткового захисту' },
  { value: 'id_card', label: 'Паспорт (ID-картка)' },
  { value: 'passport_book', label: 'Паспорт (книжечка)' },
  { value: 'residence_permit', label: 'Посвідка на постійне проживання в Україні' },
  { value: 'refugee_certificate', label: 'Посвідка біженця' },
  { value: 'residence_card', label: 'Посвідка на проживання' },
  { value: 'temporary_certificate', label: 'Тимчасове посвідчення громадянина України' }
]

export const DESIRABLE_CONNECTION_OPTIONS: IOption[] = [
  { value: '', label: '-- Вибрати --' },
  { value: 'email', label: 'Електронною поштою' },
  { value: 'phone', label: 'Телефоном' }
]

export const GENDERS_OPTIONS: IOption[] = [
  { value: '', label: '-- Вибрати --' },
  { value: 'female', label: 'Жіноча' },
  { value: 'male', label: 'Чоловіча' }
]
