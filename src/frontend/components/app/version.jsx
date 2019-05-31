import React from 'react'
import styled from 'styled-components'

import { versionsType } from '../../types'
import Label from '../ui/label'

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

const Version = (props) => {
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

Version.propTypes = {
  versions: versionsType.isRequired,
}

export default Version
