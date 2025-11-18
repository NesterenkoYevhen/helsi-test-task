export const clearObject = <
  T extends object,
  K extends keyof T = never
>(
    obj: T,
    keysToRemove: K[] = []
  ): Omit<Partial<T>, K> => {
  const result: Partial<T> = {}

  for (const key of Object.keys(obj) as Array<keyof T>) {
    if (keysToRemove.includes(key as K)) continue

    const value = obj[key]

    if (value !== '') {
      result[key] = value
    }
  }

  return result as Omit<Partial<T>, K>
}
