import isEmail from "validator/lib/isEmail";
export const checkValidator = (
  email: string | null,
  password: string | null,
  login: boolean,
  userName?: string | null
): boolean => {
  if (email !== "" && email && !isEmail(email)) {
    return false;
  }
  if (password === "" && password) {
    return false;
  }
  if (!login) {
    if (userName && userName.length == 0) {
      return false;
    }
  }
  return true;
};
