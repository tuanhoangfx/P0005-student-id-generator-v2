export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
export const randomPick = (arr) => arr[randomInt(0, arr.length - 1)]

export const formatDate = (value) => {
  if (!value) return 'N/A'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-GB')
}

export const sanitizeLocalPart = (name) =>
  name
    .normalize('NFD')
    .replace(/[^\w\s.-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '.')

export const randomStudentId = () => String(randomInt(100000000, 999999999))

export const randomDate = (startYear, endYear) => {
  const year = randomInt(startYear, endYear)
  const month = String(randomInt(1, 12)).padStart(2, '0')
  const day = String(randomInt(1, 28)).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const copyText = async (text, label) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // eslint-disable-next-line no-alert
    alert(`Khong copy duoc ${label}.`)
  }
}
