import { checkString } from './string'

const idRegex = /^[0-9a-zA-Z]{4,20}$/

export function checkId (input: unknown): input is string {
  if (!checkString(input)) return false
  if (!idRegex.test(input)) return false
  return true
}
