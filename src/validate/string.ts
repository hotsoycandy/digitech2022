export function checkString (input: unknown): input is string {
  if (typeof input === 'string') {
    return true
  }
  return false
}
