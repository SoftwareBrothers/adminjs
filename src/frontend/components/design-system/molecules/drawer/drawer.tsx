/* eslint-disable no-shadow */
import styled from 'styled-components'
import { space, SpaceProps, LayoutProps, variant, layout } from 'styled-system'
import DrawerFooter from './drawer-footer'
import { cssClass } from '../../utils/css-class'
import { DEFAULT_DRAWER_WIDTH } from '../../../../../constants'

/**
 * Props for Drawer component. Apart from those described below it also extends all
 * {@link SpaceProps}.
 *
 * @alias DrawerProps
 * @memberof Drawer
 */
export type DrawerProps = SpaceProps & LayoutProps & {
  /** Indicates if drawer should be hidden */
  isHidden?: boolean;
  /**
   * Drawer variant
   */
  variant?: 'filter';
}

const variants = variant({
  variants: {
    filter: {
      bg: 'filterBg',
      width: '400px',
      color: 'white',
      className: cssClass(['Drawer', 'Drawer_Filter']),
    },
  },
})

/**
 * Drawer component renders a huge side area where {@link BaseActionComponent} renders
 * all actions where {@link Action.showInDrawer} is set to true.
 *
 * You probably don't want to use it directly in your actions, but if you decide to set
 * `showInDrawer` to true you will probably want to use `DrawerContent` or `DrawerFooter`
 * components.
 *
 * All these components: Drawer, DrawerContent and Drawer Footer extends {@link SpaceProps}.
 *
 * Usage
 * ```javascript
 * import { Drawer, DrawerProps, DrawerContent, DrawerFooter } from 'admin-bro
 * ```
 *
 * @component
 * @subcategory Molecules
 * @example
 * return (
 * <Box height="500px">
 *   <Drawer>
 *     <DrawerContent>
 *       <Header.H3>
 *         <Button size="icon" rounded mr="lg">
 *           <Icon icon="ChevronRight" />
 *         </Button>
 *         Edit
 *       </Header.H3>
 *       <Box my="x3" p={0}>
 *         <Button size="sm">
 *           <Icon icon="Information" />
 *           Info
 *         </Button>
 *         <Button size="sm" ml="lg">
 *           <Icon icon="Delete" />
 *           Delete
 *         </Button>
 *       </Box>
 *
 *     </DrawerContent>
 *     <DrawerFooter>
 *       <Button variant="primary">
 *         Save
 *       </Button>
 *     </DrawerFooter>
 *   </Drawer>
 * </Box>
 * )
 */
export const Drawer = styled.section<DrawerProps>`
  z-index: 100;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  right: ${({ isHidden, width }): string => (isHidden ? `-${width?.toString()}` : '0px;')};
  &.hidden {
    right: ${({ width }): string => (`-${width?.toString()}`)};
  }
  box-shadow: 0 3px 6px ${({ theme }): string => theme.colors.grey40};
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 500ms;
  background: ${({ theme }): string => theme.colors.white};
  box-sizing: border-box;
  & > ${DrawerFooter} {
    border-top: 1px solid ${({ theme }): string => theme.colors.primary20};
    ${({ variant, theme }): string => (variant === 'filter' ? `border-color: ${theme.colors.filterInputBorder}` : '')};    
  }
  max-width: 100%;
  
  ${space};
  ${layout};
  ${variants};
`

Drawer.defaultProps = {
  width: DEFAULT_DRAWER_WIDTH,
  className: cssClass('Drawer'),
}

export default Drawer
