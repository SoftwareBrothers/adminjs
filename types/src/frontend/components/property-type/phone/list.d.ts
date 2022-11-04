import { FC } from 'react';
import { RecordJSON, ResourceJSON, PropertyJSON } from '../../../interfaces';
interface Props {
    property: PropertyJSON;
    record: RecordJSON;
    resource: ResourceJSON;
}
declare const List: FC<Props>;
export default List;
