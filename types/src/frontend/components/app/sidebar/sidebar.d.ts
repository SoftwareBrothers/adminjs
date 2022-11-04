import React from 'react';
declare type Props = {
    isVisible: boolean;
};
declare const Sidebar: React.ComponentType<Props & {
    OriginalComponent?: React.ComponentType<Props> | undefined;
}>;
export { Sidebar };
export default Sidebar;
