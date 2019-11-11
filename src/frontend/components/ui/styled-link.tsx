import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ReactNode } from 'react'
import { styles } from './styled-button'

type OnClickHandler = () => any;

/**
 * @memberof StyledLink
 */
type Props = {
  /**
   * If button should be presented as a primary action
   */
  primary: boolean;
  /**
   * Body of the button
   */
  children: ReactNode;
  /**
   * clic callback
   */
  onClick?: OnClickHandler;
  /**
   * As which element it should be rentered. For example: as: 'a' or as: 'button'
   */
  as?: string;
  /**
   * Href
   */
  to: string;
}

/**
 * Component wrapping Link from React Router with styled. It looks exactly like {@link StyledButton}
 *
 * @see https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md
 * @component
*/
const StyledLink = styled(Link).attrs<Props>(({ primary }) => ({
  className: `button${primary ? ' is-primary' : ''}`,
}))`
  ${styles}
`

export default StyledLink
