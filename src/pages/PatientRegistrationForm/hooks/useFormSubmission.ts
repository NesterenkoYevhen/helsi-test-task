import { useState, useCallback } from 'react'
import { PatientRegistrationFormValues } from '../types/form'

interface UseFormSubmissionReturn {
  submittedData: PatientRegistrationFormValues | null
  validationErrors: Record<string, string>
  isErrorModalOpen: boolean
  handleSubmit: (values: PatientRegistrationFormValues) => void
  handleValidationErrors: (errors?: Record<string, string>) => Record<string, string> | undefined
  closeErrorModal: () => void
  resetSubmission: () => void
}

export const useFormSubmission = (): UseFormSubmissionReturn => {
  const [submittedData, setSubmittedData] = useState<PatientRegistrationFormValues | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)

  const handleSubmit = useCallback((values: PatientRegistrationFormValues) => {
    setSubmittedData(values)
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }, 100)
  }, [])

  const handleValidationErrors = useCallback((errors?: Record<string, string>) => {
    if (errors && Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      setIsErrorModalOpen(true)
      setSubmittedData(null)
      return errors
    }
    return undefined
  }, [])

  const closeErrorModal = useCallback(() => {
    setIsErrorModalOpen(false)
  }, [])

  const resetSubmission = useCallback(() => {
    setSubmittedData(null)
    setValidationErrors({})
    setIsErrorModalOpen(false)
  }, [])

  return {
    submittedData,
    validationErrors,
    isErrorModalOpen,
    handleSubmit,
    handleValidationErrors,
    closeErrorModal,
    resetSubmission
  }
}