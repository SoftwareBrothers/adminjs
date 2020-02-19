import React from 'react'
import styled from 'styled-components'
import { Box } from '../../atoms/box'
import { Icon } from '../../atoms/icon'
import { Button } from '../../atoms/button'


const DropZoneImg = styled.div<{src: string}>`
  width: 80px;
  height: 80px;
  margin-right: ${({ theme }): string => theme.space.lg};
  background-image: url(${({ src }): string => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  display: inline-block;
`

/**
 * @memberof DropZoneItem
 * @alias DropZoneItemProps
 */
export type DropZoneItemProps = {
  /**
   * Actual file buffer
   */
  file?: File;
  /**
   * Handler function triggered after clicking remove
   */
  onRemove?: () => void;
  /**
   * Preview image. If `file` is given and it is a image then `src` will be
   * overridden by this image.
   */
  src?: string;
  /**
   * filename. If 'file' is given it overrides what was given as a `filename`
   */
  filename?: string;
}

/**
 * Single uploaded file. Usually it is used within {@link DropZone}, but it can also be
 * reused anywhere
 *
 * @example
 * return (
 *  <DropZoneItem
 *    src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.npr.org%2F2019%2F05%2F17%2F724262019%2Fgrumpy-cat-dies-her-spirit-will-live-on-family-says&psig=AOvVaw2ZKtTEZr8N43fx9x-lTITa&ust=1581083274368000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKidqqyIvecCFQAAAAAdAAAAABAD"
 *    filename="shut-up-it-works.png"
 *  />
 * )
 * @component
 * @subcategory Molecules
 */
export const DropZoneItem: React.FC<DropZoneItemProps> = (props) => {
  const { file, onRemove, filename } = props
  let { src } = props
  if (file && ['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
    src = URL.createObjectURL(file)
  }

  return (
    <Box bg="grey20" px="lg" py="default" mt="default" flex alignItems="center">
      <Icon icon="Attachment" mr="default" />
      {src ? (<DropZoneImg src={src} />) : ''}
      <Box flexGrow={1}>{file?.name || filename}</Box>
      {onRemove && (
        <Button
          variant="text"
          m="-8px"
          size="icon"
          type="button"
          onClick={(): void => onRemove && onRemove()}
        >
          <Icon icon="Close" />
        </Button>
      )}
    </Box>
  )
}

export default DropZoneItem
