import { checkString } from './string'

// Regex = REGular EXpression
const phoneNumberPartRegex = /^\d{4}$/

export function checkPhoneNumber (input: unknown): input is string {
  if (!checkString(input)) return false

  const [localNumber, frontNumber, backNumber] = input.split('-')
  if (localNumber !== '010') return false
  if (!phoneNumberPartRegex.test(frontNumber)) return false
  if (!phoneNumberPartRegex.test(backNumber)) return false

  return true
}
