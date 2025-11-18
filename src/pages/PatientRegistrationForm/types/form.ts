export interface PatientRegistrationFormValues {
  lastName: string;
  firstName: string;
  middleName?: string;
  ignoreMiddleName: boolean;
  rnokpp?: string;
  ignoreRnokpp?: boolean;
  birthDate: string;
  gender: string;
  birthCountry: string;
  birthPlace: string;
  relationshipMethod: string;
  secretWord: string;
  phone?: string;
  email?: string;
  documentType: string;
  documentSeries: string;
  documentIssueDate: string;
  documentExpiryDate?: string;
  documentIssuedBy: string;
  unzr?: string;
}

export type FormErrors<T> = Partial<Record<keyof T, string | undefined>> | undefined