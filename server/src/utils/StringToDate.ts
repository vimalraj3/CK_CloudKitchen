export const stringToDate = (time: string): Date => {
  const [hour, min] = time.split(':')
  const date = new Date()
  date.setHours(Number(hour))
  date.setMinutes(Number(min))
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}
