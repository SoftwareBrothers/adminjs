import { Link, MessageBox, Tab, Tabs } from '@adminjs/design-system'
import React, { FC, useState } from 'react'
import { allowOverride } from '../../../hoc'
import { useTranslation } from '../../../hooks'
import type { BasePropertyProps } from '../base-property-props'

const RelationsTabs: FC<BasePropertyProps> = (props) => {
  const { resource } = props
  const { id: resourceId, properties } = resource
  const { relationsTargets } = properties.relations.props
  const relationsKeys = Object.keys(relationsTargets)
  const [selectedTab, setSelectedTab] = useState<string>(relationsKeys[0])
  const { translateLabel } = useTranslation()

  if (!relationsKeys.length) return null

  return (
    <Tabs currentTab={selectedTab} onChange={setSelectedTab}>
      {relationsKeys.map((relation) => (
        <Tab key={relation} id={relation} label={translateLabel(relation, resourceId)}>
          <MessageBox variant="info" message="Please use external library" py="xl">
            To handle relations please use
            <Link href="https://github.com/SoftwareBrothers/adminjs-relations" ml="sm">
              @admins/relations
            </Link>
          </MessageBox>
        </Tab>
      ))}
    </Tabs>
  )
}

export { RelationsTabs }

export default allowOverride(RelationsTabs, 'DefaultRelationsShowProperty')
