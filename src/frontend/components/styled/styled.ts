import {
  DrawerContent,
  DrawerFooter,
  InfoBox,
  Pagination,
  Placeholder,
  TableCell,
  TableHead,
  TableRow,
  themeGet,
} from '@adminjs/design-system';
import styled from 'styled-components';

const StyledTableCell = styled(TableCell)`
  border-color: ${themeGet('colors', 'border')};
`;

const StyledTableRow = styled(TableRow)`
  & :hover {
    background-color: ${themeGet('colors', 'tableHover')};
  }
`;

const StyledTableHead = styled(TableHead)`
  background-color: ${themeGet('colors', 'tableHeader') || 'none'};
`;

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

const StyledInfoBox = styled(InfoBox)`
  &&& {
    background-color: ${themeGet('colors', 'container')};
  }
`

const StyledPlaceholder = styled(Placeholder)`
  &&& {
    background-color: ${themeGet('colors', 'bg')}, linear-gradient(to right, ${themeGet('colors', 'primary100')} 8%, ${themeGet('colors', 'primary20')} 33%);
  }
`

export {
  StyledDrawerContent as DrawerContent,
  StyledDrawerFooter as DrawerFooter,
  StyledInfoBox as InfoBox,
  StyledPagination as Pagination,
  StyledPlaceholder as Placeholder,
  StyledTableCell as TableCell,
  StyledTableHead as TableHead,
  StyledTableRow as TableRow,
};
