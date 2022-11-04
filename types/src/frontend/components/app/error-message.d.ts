import React, { ReactNode } from 'react';
/**
 * @memberof ErrorMessageBox
 * @alias ErrorMessageBoxProps
 */
export declare type ErrorMessageBoxProps = {
    title: string;
    children: ReactNode;
    testId?: string;
};
/**
 * @class
 * Prints error message
 *
 * @component
 * @private
 * @example
 * return (
 * <ErrorMessageBox title={'Some error'}>
 *   <p>Text below the title</p>
 * </ErrorMessageBox>
 * )
 */
declare const ErrorMessageBox: React.FC<ErrorMessageBoxProps>;
declare const NoResourceError: React.FC<{
    resourceId: string;
}>;
declare const NoActionError: React.FC<{
    resourceId: string;
    actionName: string;
}>;
declare const NoRecordError: React.FC<{
    resourceId: string;
    recordId: string;
}>;
export { NoResourceError, NoActionError, NoRecordError, ErrorMessageBox, ErrorMessageBox as default, };
