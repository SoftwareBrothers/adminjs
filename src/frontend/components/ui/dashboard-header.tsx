import React, { ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.section.attrs({
  className: 'content',
})`
  && {
    padding: 90px ${({ theme }): string => theme.sizes.paddingLayout};
    background: ${({ theme }): string => theme.colors.superDarkBck};
    color: #fff;
    margin-bottom: 0;
    & > * {
      color: #fff;
    }

    p {
      color: #fff;
    }

    h1 {
      color: #fff;
      font-size: 53px;
      margin-bottom: 4px;
    }
  }
`
/**
 * Component which can be used as the outstanding header of the dashboard page.
 *
 * @component
 * @example <caption>Empty Header with simple text</caption>
 * return (
 *  <DashboardHeader>
 *    <h1>Some text inside a header</h1>
 *    <p>Subtitle</p>
 *  </DashboardHeader>
 * )
 *
 * @example <caption>Header with overlay blocks</caption>
 * return (
 *   <div>
 *     <DashboardHeader>
 *       <h1>Overlaying text</h1>
 *     </DashboardHeader>
 *     <WrapperBox>
 *       <Columns style={{marginTop: '-80px'}}>
 *         <Column><ValueBlock  icon="fa fa-bomb" value="5">
 *           Utils
 *         </ValueBlock></Column>
 *         <Column><ValueBlock  icon="fa fa-star" value="12">
 *           Are
 *         </ValueBlock></Column>
 *         <Column><ValueBlock  icon="fa fa-cog" value="5" color="red">
 *           Awesome
 *         </ValueBlock></Column>
 *       </Columns>
 *     </WrapperBox>
 *   </div>
 * )
 */
const DashboardHeader: React.FC<Props> = (props) => {
  const { children } = props
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

/**
 * @memberof DashboardHeader
 */
type Props = {
  /**
   * Most probably you will use `H1` and `P` tags here
  */
  children: ReactNode;
}

export default DashboardHeader
