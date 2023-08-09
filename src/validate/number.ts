export function checkNumber (input: unknown): input is number {
  if (typeof input === 'number') {
    return true
  }
  return false
}
