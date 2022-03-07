import React, { ReactNode } from 'react';
declare type State = {
    error: any;
};
export declare class ErrorBoundary extends React.Component<any, State> {
    constructor(props: any);
    componentDidCatch(error: any): void;
    render(): ReactNode;
}
export default ErrorBoundary;
