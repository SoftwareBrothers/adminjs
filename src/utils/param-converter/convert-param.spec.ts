import { convertParam } from './convert-param'

describe('module:paramConverter.convertParam', () => {
  it('should convert numeric strings to Number', () => {
    expect(convertParam('123', 'number')).toBe(123)
  })

  it('should convert bool strings to Boolean', () => {
    /*
      This will actually evaluate any string with length > 0 to true
      Ideally, additional validation should be added to convertParam
    */
    expect(convertParam('true', 'boolean')).toBe(true)
  })

  it('should convert datetime strings to Date', () => {
    expect(convertParam('2021-11-08', 'datetime').getTime()).toBe(new Date('2021-11-08').getTime())
  })

  it('should leave other values unchanged', () => {
    expect(convertParam(null, 'some other type')).toBe(null)
  })
})
