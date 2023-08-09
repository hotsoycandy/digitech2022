import { checkString } from './string'

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-+=_:?><]).{6,20}$/

export function checkPassword (input: unknown): input is string {
  if (!checkString(input)) return false
  if (!passwordRegex.test(input)) return false
  return true
}
