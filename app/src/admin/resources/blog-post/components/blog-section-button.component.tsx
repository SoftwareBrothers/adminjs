import { themeGet, Caption, Icon, Box } from '@admin-bro/design-system'


import React from 'react'
import styled from 'styled-components'

export type BlogSectionButtonProps = {
  section: string;
  onClick: (section: string) => void;
}

const StyledBlogSectionButton = styled(Box)`
  border-top: 1px solid ${themeGet('colors', 'grey40')};
  padding: ${themeGet('space', 'xl')} ${themeGet('space', 'xxl')};
  margin: 0 -${themeGet('space', 'xxl')};
  cursor: pointer;
  &:hover {
    background: ${themeGet('colors', 'grey20')};
  }
`

const BlogSectionButton: React.FC<BlogSectionButtonProps> = (props) => {
  const { section, onClick } = props

  return (
    <StyledBlogSectionButton
      key={section}
      flex
      onClick={onClick}
    >
      <Box flexGrow={1}>
        <Caption>{section}</Caption>
      </Box>
      <Box flexShrink={0} flexGrow={0}>
        <Icon icon="ChevronRight" />
      </Box>
    </StyledBlogSectionButton>
  )
}

export {
  BlogSectionButton as default,
  BlogSectionButton,
}
