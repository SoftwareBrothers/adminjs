import React, { FC } from "react";

import PropertyType from "../property-type";

import withNotice, {
  AddNoticeProps,
} from "../../store/with-notice";
import { ActionProps } from "./action.props";
import { PropertyPlace } from "../../../backend/decorators/property-json.interface";
import { DrawerContent, Box, DrawerFooter, Button } from "../design-system";
import ActionHeader from "../app/action-header";
import useResourceNew from "./utils/useResourceNew";
import RecordJSON from "../../../backend/decorators/record-json.interface";

const New: FC<ActionProps & AddNoticeProps> = props => {
  const {record: initialRecord, resource, addNotice, action} = props;
  const {record, handleChange, handleSubmit} = useResourceNew(initialRecord!, resource.id, addNotice);

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      flex
      flexGrow={1}
      flexDirection="column"
      height={1}
    >
      <DrawerContent>
        {action?.showInDrawer ? <ActionHeader {...props} /> : null}
        {resource.editProperties.map(property => (
          <PropertyType
            key={property.name}
            where={PropertyPlace.edit}
            onChange={handleChange}
            property={property}
            resource={resource}
            record={record as RecordJSON}
          />
        ))}
      </DrawerContent>
      <DrawerFooter>
        <Button variant="primary" size="lg">
          Save
        </Button>
      </DrawerFooter>
    </Box>
  );
};

export default withNotice(New);

