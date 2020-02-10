import React, { useState } from 'react'
import styled from 'styled-components'

const StyledDropDown = styled.div`
  position: relative;
  display: inline-block;
`

/**
 * Simple set of components allowing you to create a dropdowns.
 * Usage
 * ```javascript
 * import { DropDown, DropDownTrigger, DropDownMenu, DropDownItem } from 'admin-bro'
 * ```
 *
 * It contains couple of sub components:
 *
 * - DropDown - an actual wrapper for entire DropDown
 * - DropDownTrigger - it has to be right inside the DropDown.
 *   It is what user sees when the DropDown is not hovered
 * - DropDownMenu - wraps elements which are hidden by default.
 *   Shown after hovering Trigger
 * - DropDownMenuItem - it is a wrapper for a menu item list.
 *   It can next contain either Link or Button.
 *
 * Props:
 * - DropDownMenu extends {@link PositionProps}, so you can add prop like `top="xl"`
 * - DropDownItem extends {@link SpaceProps}
 * - DropDownTrigger also extends {@link SpaceProps}
 *
 * @example
 * return (
 *   <Box px="300px" pt="lg" pb="200px">
 *     <DropDown>
 *       <DropDownTrigger p="default">
 *         <Text as="span">This is trigger -> </Text>
 *         <Icon icon="OverflowMenuHorizontal" />
 *       </DropDownTrigger>
 *       <DropDownMenu top="xxl">
 *         <DropDownItem>
 *           <Link href="/some">
 *             <Icon icon="Video" />
 *             Some menu item
 *           </Link>
 *         </DropDownItem>
 *         <DropDownItem>
 *           <Link href="/some">Other item</Link>
 *         </DropDownItem>
 *       </DropDownMenu>
 *     </DropDown>
 *   </Box>
 * )
 * @component
 * @subcategory Molecules
 */
export const DropDown: React.FC = (props) => {
  const { children } = props
  const [isVisible, setIsVisible] = useState(false)
  const elements = React.Children.map(children, (child: any) => {
    const type = child && child.type && child.type.displayName
    if (type === 'DropDownTrigger') {
      return React.cloneElement(child, {
        onMouseEnter: () => setIsVisible(true),
      })
    }
    if (type === 'DropDownMenu') {
      return React.cloneElement(child, { isVisible })
    }
    return child
  })
  return (
    <StyledDropDown
      onMouseEnter={(): void => setIsVisible(true)}
      onMouseLeave={(): void => setIsVisible(false)}
    >
      {elements}
    </StyledDropDown>
  )
}

export default DropDown
