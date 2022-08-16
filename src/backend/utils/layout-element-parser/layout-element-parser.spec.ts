import layoutElementParser, { LayoutElement } from './layout-element-parser'

describe('layoutElementParser', () => {
  const propertyName = 'name'
  const property2 = 'surname'
  const props = { mt: 'default', ml: 'xxxl' }

  it('parses regular string', () => {
    expect(layoutElementParser(propertyName)).toEqual({
      properties: [propertyName],
      props: {},
      layoutElements: [],
      component: 'Box',
    })
  })

  it('parses list of strings', () => {
    expect(layoutElementParser([propertyName, property2])).toEqual({
      properties: [propertyName, property2],
      props: { },
      layoutElements: [],
      component: 'Box',
    })
  })

  it('parses property and props', () => {
    expect(layoutElementParser([propertyName, props])).toEqual({
      properties: [propertyName],
      props,
      layoutElements: [],
      component: 'Box',
    })
  })

  it('recursively parses and inner element as string', () => {
    const innerElement: LayoutElement = ['string2', { width: 1 / 2 }]
    expect(layoutElementParser([props, [innerElement]])).toEqual({
      properties: [],
      props,
      layoutElements: [layoutElementParser(innerElement)],
      component: 'Box',
    })
  })

  it('recursively parses nested objects', () => {
    const nested: Array<LayoutElement> = [
      ['companyName', { ml: 'xxl' }],
      'email',
      ['address', 'profilePhotoLocation'],
    ]
    const complicatedElement: LayoutElement = [props, nested]
    expect(layoutElementParser(complicatedElement)).toEqual({
      properties: [],
      props,
      layoutElements: nested.map((el) => layoutElementParser(el)),
      component: 'Box',
    })
  })

  it('returns layoutElements when array is passed', () => {
    const arrayElements: LayoutElement = [
      ['string1', { width: 1 / 2 }],
      ['string2', { width: 1 / 2 }],
    ]
    expect(layoutElementParser(arrayElements)).toEqual({
      properties: [],
      props: {},
      component: 'Box',
      layoutElements: arrayElements.map((innerElement) => layoutElementParser(innerElement)),
    })
  })

  it('changes the component when @ is appended', () => {
    const headerProps = { children: 'Welcome my boy' }
    const componentElements: LayoutElement = ['@Header', headerProps]

    expect(layoutElementParser(componentElements)).toEqual({
      properties: [],
      props: headerProps,
      component: 'Header',
      layoutElements: [],
    })
  })
})
