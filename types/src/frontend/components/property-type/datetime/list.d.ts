import React from 'react';
import { ResourceJSON, RecordJSON, PropertyJSON } from '../../../interfaces';
interface Props {
    property: PropertyJSON;
    record: RecordJSON;
    resource: ResourceJSON;
}
export default class List extends React.PureComponent<Props> {
    render(): React.ReactChild;
}
export {};
