import React from 'react';
import { CurrentAdmin } from '../../../current-admin.interface';
export declare type LoggedInProps = {
    session: CurrentAdmin;
    paths: {
        logoutPath: string;
    };
};
declare const OverridableLoggedIn: React.ComponentType<LoggedInProps & {
    OriginalComponent?: React.ComponentType<LoggedInProps> | undefined;
}>;
export { OverridableLoggedIn as default, OverridableLoggedIn as LoggedIn, };
