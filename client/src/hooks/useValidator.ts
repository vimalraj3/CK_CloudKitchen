import { useCallback, useState } from "react";
export function useValidator<T extends object>(
  object: T,
  ...keys: (keyof T)[]
): [boolean, () => void] {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [error, setError] = useState<{}>(true);

  const validator = useCallback(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    keys.forEach((key) => {
      console.log(key, object[key], "iterate");

      if (key === "email" && !emailRegex.test(object[key] as string)) {
        setIsValid(false);
      } else if (key === "password" && (object[key] as string).length < 8) {
        setIsValid(false);
      }
    });
  }, [object]);

  return [isValid, validator];
}
