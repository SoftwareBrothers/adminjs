// https://github.com/styled-components/styled-components/issues/3437#issuecomment-1103085056
import styled from 'styled-components'

export * from 'styled-components'

const defaultStyled = typeof styled === 'function' ? styled : styled.default

export { defaultStyled as default }
