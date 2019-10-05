import React, { ReactNode } from 'react'

import PropertyInShow from '../../ui/property-in-show'
import convertParamsToArrayItems from './convert-params-to-array-items'
import StyledSection from '../../ui/styled-section'
import PropertyJSON from '../../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'

type Props = {
  property: PropertyJSON;
  record: RecordJSON;
  ItemComponent: typeof React.Component;
}

export default class Show extends React.PureComponent<Props> {
  render(): ReactNode {
    const { property, record, ItemComponent } = this.props

    const items = convertParamsToArrayItems(property, record)

    return (
      <PropertyInShow property={property}>
        <StyledSection>
          {items.map((item, i) => (
            <ItemComponent
              {...this.props}
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              property={{
                ...property,
                name: `${property.name}.${i}`,
                label: `[${i + 1}]`,
                isArray: false,
              }}
            />
          ))}
        </StyledSection>
      </PropertyInShow>
    )
  }
}
