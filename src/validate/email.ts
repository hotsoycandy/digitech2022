import { checkString } from './string'

// Regex = REGular EXpression
const emailLocalRegex = /^[0-9a-zA-Z_]{4,20}$/

export function checkEmail (input: unknown): input is string {
  if (!checkString(input)) return false

  const [local, domain] = input.split('@')
  if (domain !== 'sdh.hs.kr') return false
  if (!emailLocalRegex.test(local)) return false

  return true
}
