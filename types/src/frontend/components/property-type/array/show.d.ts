import React, { ReactNode } from 'react';
import { RecordJSON, PropertyJSON } from '../../../interfaces';
declare type Props = {
    property: PropertyJSON;
    record: RecordJSON;
    ItemComponent: typeof React.Component;
};
export default class Show extends React.PureComponent<Props> {
    render(): ReactNode;
}
export {};
