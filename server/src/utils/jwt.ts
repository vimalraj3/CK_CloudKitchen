import jwt from 'jsonwebtoken'

/**
 * @description Verify a jwt token and return the email
 * @param token
 * @returns email
 */
export const verifyJwtToken = (token: string): string => {
  var decoded = <any>jwt.verify(token, process.env.JWT_SECRET)
  console.log(decoded.email, 'Decoded email')
  return decoded.email
}

/**
 * @description Generate a jwt token and return it
 * @param email
 * @returns token
 */
export const generateJwtToken = (email: string): string => {
  const verifyToken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  })
  return verifyToken
}
