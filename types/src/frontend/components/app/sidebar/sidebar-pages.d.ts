import React from 'react';
import { ReduxState } from '../../../store/store';
declare type Props = {
    pages?: ReduxState['pages'];
};
declare const SidebarPages: React.FC<Props>;
export default SidebarPages;
