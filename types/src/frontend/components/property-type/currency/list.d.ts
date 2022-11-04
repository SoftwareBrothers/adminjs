import { PureComponent, ReactChild } from 'react';
import { RecordJSON, PropertyJSON } from '../../../interfaces';
interface Props {
    property: PropertyJSON;
    record: RecordJSON;
}
export default class List extends PureComponent<Props> {
    render(): ReactChild;
}
export {};
