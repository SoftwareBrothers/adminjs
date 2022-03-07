import React from 'react';
declare type Props = {
    isVisible: boolean;
};
declare const Sidebar: React.ComponentType<Props & {
    OriginalComponent?: React.FunctionComponent<Props> | React.ComponentClass<Props, any> | undefined;
}>;
export { Sidebar };
export default Sidebar;
