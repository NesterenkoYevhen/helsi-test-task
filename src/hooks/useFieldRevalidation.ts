import { DependencyList, useEffect, useRef } from 'react'
import { useForm } from 'react-final-form'

export const useFieldRevalidation = <T extends string>(
  fieldName: T,
  dependencies: DependencyList
) => {
  const form = useForm()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const value = form.getState().values[fieldName]
    if (value !== undefined && value !== null && value !== '') {
      form.resetFieldState(fieldName)
      form.change(fieldName, value)
      form.blur(fieldName)
    }
  }, dependencies)
}