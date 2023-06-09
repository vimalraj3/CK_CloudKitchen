import { useAppDispatch } from '../../hooks'
import { ServerError } from '../../types/error.types'
import { setError, setErrors } from '../slices/error.slice'

export const handleError = (error: ServerError) => {
  const dispatch = useAppDispatch()
  dispatch(setErrors(error))
}
