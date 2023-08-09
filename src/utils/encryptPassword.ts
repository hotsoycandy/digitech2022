import crypto from 'crypto'

export function encryptPassword (originalPassword: string, salt: string): string {
  return crypto
    .createHash('sha256')
    .update('][' + originalPassword + salt)
    .digest('hex')
}
