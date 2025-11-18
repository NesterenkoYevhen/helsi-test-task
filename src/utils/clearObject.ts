export const clearObject = <T extends object>(obj: T): Partial<T> => {
  const result = {} as Partial<T>

  for (const key of Object.keys(obj) as Array<keyof T>) {
    const value = obj[key]
    if (value !== '') {
      result[key] = value
    }
  }

  return result
}
