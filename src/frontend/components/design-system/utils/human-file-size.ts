/* Solution inspired by https://stackoverflow.com/a/20732091/2594227 answer */
const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const
// eslint-disable-next-line import/prefer-default-export
export type DisplaySizeUnit = typeof UNITS[number];

export const humanFileSize = (size: number | string, unit?: DisplaySizeUnit): string => {
  let foundUnitIndex: number | null = null
  if (unit) {
    foundUnitIndex = UNITS.findIndex(u => u === unit)
  }
  const unitIndex = foundUnitIndex || Math.min(
    Math.floor(Math.log(+size) / Math.log(1024)),
    UNITS.length,
  )

  const calculatedSize = (+size / (1024 ** unitIndex))
  const guessedUnit = ['B', 'kB', 'MB', 'GB', 'TB'][unitIndex]

  return `${Math.round(calculatedSize)} ${guessedUnit}`
}
