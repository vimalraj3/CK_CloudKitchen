import base64 from 'js-base64'

// Encode the email
export const encodedEmail = (email: string): string => base64.encode(email)

// Decode the encoded email
export const decodedEmail = (token: string): string => base64.decode(token)
