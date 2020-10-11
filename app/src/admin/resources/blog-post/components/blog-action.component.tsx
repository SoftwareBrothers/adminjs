import { Icon, Button, H2, Box, Input, RichText } from '@admin-bro/design-system'

import { ActionProps, Breadcrumbs, useRecord } from 'admin-bro'
import React, { useState } from 'react'
import styled from 'styled-components'

import BlogDrawer from './blog-drawer.component'

const StyledQuillWrapper = styled(Box)`
  & .ql-editor {
    min-height: 300px;
  }
`

const BlogAction: React.FC<ActionProps> = (props) => {
  const { resource, record: initialRecord } = props

  const { record, handleChange } = useRecord(initialRecord, resource.id)
  const [showSettings, setSettingsVisibility] = useState(true)

  const quill = {
    theme: 'snow' as const,
  }

  return (
    <Box>
      <Box>
        <Breadcrumbs resource={resource} record={record} actionName="list" />
        <Box flex>
          <Box flexGrow={1} marginTop="xl">
            <H2>
              Blog
            </H2>
          </Box>
          <Box mt="xl" flexShrink={0}>
            <Button onClick={(): void => setSettingsVisibility(!showSettings)}>
              <Icon icon="Settings" />
              Post Settings
            </Button>
            <Button variant="primary" ml="md">
              Publish
            </Button>
          </Box>
        </Box>
      </Box>
      <Box variant="white">
        <Box maxWidth="maxFormWidth" mx="auto">
          <Box width={1} mt="x4">
            <Input
              width={1}
              onChange={event => handleChange('title', event.target.value)}
              value={record.params.title}
              borderless
              variant="xxl"
            />
          </Box>
          <StyledQuillWrapper mt="xxl">
            <RichText
              onChange={value => handleChange('body', value)}
              value={record.params.body}
              borderless
              quill={quill}
            />
          </StyledQuillWrapper>
        </Box>
        {showSettings ? (
          <BlogDrawer
            {...props}
            toggle={(): void => setSettingsVisibility(!showSettings)}
          />
        ) : ''}
      </Box>
    </Box>
  )
}

export default BlogAction
