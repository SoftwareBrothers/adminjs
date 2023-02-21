import { Box, Tab, Tabs } from '@adminjs/design-system'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from '../../../hooks'
import { ReduxState } from '../../../store'
import { ApiClient } from '../../../utils/api-client'
import { RecordsTable } from '../records-table'

const api = new ApiClient()

const options = {
  relations: {
    articles: {
      junction: {
        joinKey: 'blogId',
        inverseJoinKey: 'articleId',
        throughResourceId: 'BlogArticle',
      },
      target: {
        resourceId: 'Article',
      },
    },
    comments: {
      junction: {
        joinKey: 'blogId',
        inverseJoinKey: 'articleId',
        throughResourceId: 'BlogArticle',
      },
      target: {
        resourceId: 'Comment',
      },
    },
    complicated: {
      junction: {
        joinKey: 'blogId',
        inverseJoinKey: 'articleId',
        throughResourceId: 'BlogArticle',
      },
      target: {
        resourceId: 'Complicated',
      },
    },
  },
}

const RecordRelations = (props) => {
  const { resource, record } = props

  const relations = Object.keys(options.relations)
  const [selectedTab, setSelectedTab] = useState(relations[0])
  const { translateLabel } = useTranslation()

  return (
    <Tabs currentTab={selectedTab} onChange={setSelectedTab}>
      {relations.map((relation) => {
        const { resourceId } = options.relations[relation].target
        return (
          <Tab key={relation} id={relation} label={translateLabel(relation, resourceId)}>
            <RelationTab id={relation} activeTab={selectedTab} resourceId={resourceId} />
          </Tab>
        )
      })}
    </Tabs>
  )
}

const RelationTab = ({ id, resourceId, activeTab }) => {
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const resources = useSelector((state: ReduxState) => state.resources)
  const target = useMemo(() => resources.find((r) => r.id === resourceId), [])

  useEffect(() => {
    function fetchRecords() {
      setIsLoading(true)
      api
        .resourceAction({ resourceId, actionName: 'list' })
        .then(({ data: { records: relatedRecords } }) => {
          setIsLoading(false)
          setRecords(relatedRecords)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    if (activeTab === id) {
      fetchRecords()
    }
  }, [activeTab])

  return (
    activeTab === id && (
      <Box py="xl">
        <RecordsTable resource={target} records={records} isLoading={isLoading} />
      </Box>
    )
  )
}

export { RecordRelations }
export default RecordRelations
