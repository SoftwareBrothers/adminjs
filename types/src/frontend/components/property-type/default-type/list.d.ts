import React from 'react';
import { RecordJSON, ResourceJSON, PropertyJSON } from '../../../interfaces';
interface Props {
    property: PropertyJSON;
    record: RecordJSON;
    resource: ResourceJSON;
}
export default class List extends React.PureComponent<Props> {
    render(): React.ReactChild;
}
export {};
