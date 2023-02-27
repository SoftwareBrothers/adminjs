import { formatCurrencyProperty } from '@adminjs/design-system'

const optionsKeys: string[] = [
  'value',
  'decimalSeparator',
  'groupSeparator',
  'disableGroupSeparators',
  'intlConfig',
  'decimalScale',
  'prefix',
  'suffix',
]

const pickFormatOptions = (props: Record<string, string>) => {
  const pickedProps = Object.keys(props).reduce((acc, curr) => {
    if (optionsKeys.includes(curr as any)) {
      if (props[curr] !== null && props[curr] !== undefined) {
        acc[curr] = props[curr].toString()
      }
    }
    return acc
  }, {})
  return pickedProps
}

const formatValue = (value: string, props: Record<string, string> = {}): string => {
  const formatOptions = pickFormatOptions({ value, ...props })
  return formatCurrencyProperty(formatOptions as any)
}

export default formatValue
