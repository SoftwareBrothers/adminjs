import styled from 'styled-components'
import { space, SpaceProps, variant } from 'styled-system'

export type DrawerProps = SpaceProps & {
  isHidden?: boolean;
  variant?: 'filter';
}

const variants = variant({
  variants: {
    filter: {
      bg: 'blueFilter',
      width: '400px',
      color: 'white',
      '& > *': {
        width: '400px',
      },
    },
  },
})

export const Drawer = styled.section<DrawerProps>`
  width: 500px;
  & > * {
    width: 500px;
  }
  z-index: 100;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  box-shadow: 0 3px 6px ${({ theme }): string => theme.colors.greyLight};
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 500ms;
  background: ${({ theme }): string => theme.colors.white};
  box-sizing: border-box;

  ${space};
  ${variants};

  ${({ isHidden }): string => (isHidden ? 'width: 0px;' : '')};
`

export const DrawerFooter = styled.section`
  padding: ${({ theme }): string => theme.space.xxl} ${({ theme }): string => theme.space.lg};
  text-align: center;
  border-top: 1px solid ${({ theme }): string => theme.colors.bluePale};
  flex-shrink: 0;
  ${space};
`

export const DrawerContent = styled.section`
  flex-grow: 1;
  overflow: auto;
  padding: ${({ theme }): string => theme.space.x3} ${({ theme }): string => theme.space.xxl} ${({ theme }): string => theme.space.xl};
  box-sizing: border-box;
  ${space};
`
