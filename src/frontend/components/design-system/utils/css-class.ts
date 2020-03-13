// eslint-disable-next-line import/prefer-default-export
export const cssClass = (className: string | Array<string>, regularClass?: string): string => {
  let names: Array<string> = []
  if ((className as any).join) {
    names = className as Array<string>
  } else {
    names = [className as string]
  }
  const parsed = names.map(name => `admin-bro_${name}`)
  if (regularClass) {
    parsed.push(regularClass)
  }

  return parsed.join(' ')
}
