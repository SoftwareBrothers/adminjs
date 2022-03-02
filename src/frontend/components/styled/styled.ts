import {
  DrawerContent,
  DrawerFooter, Pagination,
  Placeholder, themeGet
} from '@adminjs/design-system';
import styled from 'styled-components';

const StyledDrawerContent = styled(DrawerContent)`
  &&& {
    background-color: ${themeGet('colors', 'container')};
  }
`;

const StyledDrawerFooter = styled(DrawerFooter)`
  &&& {
    background-color: ${themeGet('colors', 'container')};
  }
`;

const StyledPagination = styled(Pagination)`
  border: ${themeGet('colors', 'border')}
`

const StyledPlaceholder = styled(Placeholder)`
  &&& {
    background-color: ${themeGet('colors', 'bg')}, linear-gradient(to right, ${themeGet('colors', 'primary100')} 8%, ${themeGet('colors', 'primary20')} 33%);
  }
`

export {
  StyledDrawerContent as DrawerContent,
  StyledDrawerFooter as DrawerFooter,
  StyledPagination as Pagination,
  StyledPlaceholder as Placeholder
};
