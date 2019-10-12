import React from 'react'
import styled from 'styled-components'

import Label from '../ui/label'
import { VersionProps } from '../../../admin-bro-options.interface'

const VersionWrapper = styled.div`
  padding: 10px 0;
`

const VersionBlock = styled.p`
  &&& {
    & > label {
      display: inline;
    }
  }
`

export type Props = {
  versions: VersionProps;
}


const Version: React.FC<Props> = (props) => {
  const { versions } = props
  const { admin, app } = versions
  return (
    <VersionWrapper>
      {admin && (
        <VersionBlock>
          <Label>admin:</Label>
          {admin}
        </VersionBlock>
      )}
      {app && (
        <VersionBlock>
          <Label>app:</Label>
          {app}
        </VersionBlock>
      )}
    </VersionWrapper>
  )
}

export default Version
