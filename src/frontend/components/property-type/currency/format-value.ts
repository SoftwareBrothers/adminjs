import { formatCurrencyProperty } from '@adminjs/design-system'

type FormatCurrencyOptions = Parameters<typeof formatCurrencyProperty>[0]
const optionsKeys: (keyof FormatCurrencyOptions)[] = [
  'value',
  'decimalSeparator',
  'groupSeparator',
  'disableGroupSeparators',
  'intlConfig',
  'decimalScale',
  'prefix',
  'suffix',
]

const pickFormatOptions = (props: Record<string, string>): FormatCurrencyOptions => {
  const pickedProps = Object.keys(props).reduce((acc, curr) => {
    if (optionsKeys.includes(curr as any)) acc[curr] = props[curr]
    return acc
  }, {} as FormatCurrencyOptions)
  return pickedProps
}

const formatValue = (value: string, props: Record<string, string> = {}): string => {
  const formatOptions = pickFormatOptions({ value, ...props })
  return formatCurrencyProperty(formatOptions)
}

export default formatValue
