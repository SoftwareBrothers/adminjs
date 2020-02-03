import React from 'react'
import styled from 'styled-components'
import { Box } from '../atoms/box'
import { Icon } from '../atoms/icon'
import { Button } from '../atoms/button'


const DropZoneImg = styled.img<{src: string}>`
  width: 80px;
  height: 80px;
  margin-right: ${({ theme }): string => theme.space.lg};
  background-image: url(${({ src }): string => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`

export type DropZoneItemProps = {
file: File;
onRemove?: () => void;
}

export const DropZoneItem: React.FC<DropZoneItemProps> = (props) => {
  const { file, onRemove } = props
  let src
  if (['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
    src = URL.createObjectURL(file)
  }

  return (
    <Box bg="greyPale" px="lg" py="default" mt="default" flex alignItems="center">
      <Icon icon="Attachment" mr="default" />
      {src ? (<DropZoneImg src={src} />) : ''}
      <Box flexGrow={1}>{file.name}</Box>
      <Button
        variant="text"
        m="-8px"
        size="icon"
        onClick={(): void => onRemove && onRemove()}
      >
        <Icon icon="Close" />
      </Button>
    </Box>
  )
}
