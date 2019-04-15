import styled from 'styled-components'

const Column = styled.section.attrs(({ width = 4, offset = 0 }) => ({
  className: `column is-${width}-desktop is-offset-${offset}`,
}))`

`

export default Column
