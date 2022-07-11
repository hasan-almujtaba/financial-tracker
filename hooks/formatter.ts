import dayjs from 'dayjs'

export const useFormatter = () => {
  /**
   * Format string to currency
   * @param number - String to format
   * @returns Formatted string
   */
  const currencyFormatter = (number: string) => {
    const numberFormat = new Intl.NumberFormat('id', {
      style: 'currency',
      currency: 'IDR',
    })
    return numberFormat.format(parseInt(number))
  }

  /**
   *
   * @param date - String to format
   * @param format - Format option
   * @returns
   */
  const dateFormatter = (date: string, format: string) => {
    return dayjs(date).format(format)
  }

  return {
    currencyFormatter,
    dateFormatter,
  }
}
