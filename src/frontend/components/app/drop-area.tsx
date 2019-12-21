import React, { useState, ComponentClass } from 'react'
import styled from 'styled-components'

import Label from '../ui/label'
import withNotice, { AddNoticeProps } from '../../store/with-notice'

const UploadInput = styled.input`
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  bottom: 0;
  cursor: pointer;
  width: 100%;
`

const ValidationInformation = styled.p`
  &&& {
    font-size: ${({ theme }): string => theme.fonts.min};
    label {
      display: inline;
    }
  }
`

const Wrapper = styled.div`
  position: relative;
  border: dashed ${({ theme }: { theme }): string => theme.colors.border} 1px;
  text-align: center;
  padding: ${({ theme }: { theme }): string => theme.sizes.paddingLayout};
  &:hover{
    border-color: ${({ theme }: { theme }): string => theme.colors.borderHover};
  }

  i {
    color: ${({ theme }: { theme }): string => theme.colors.superLightBack};
    margin-bottom: 20px;
  }
  
  .innerWrapper {
    position: relative;
  }
`

const DropMessage = styled.div`
  position: absolute;
  border: 5px solid ${({ theme }: { theme }): string => theme.colors.primaryHover};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  & > h1 {
    color: ${({ theme }: { theme }): string => theme.colors.filterDefaultText};
    font-size: ${({ theme }: { theme }): string => theme.fonts.header};
    margin-top: ${({ theme }: { theme }): string => theme.sizes.paddingLayout};
    transition: transform 0.5s;
  }

  &.active {
    background: ${({ theme }: { theme }): string => theme.colors.primary};
    opacity: 1;
    transition: opacity 1s;
    & > h1 {
      transform: rotate(2deg) scale(1.2);
      transition: transform 0.5s;
    }
  }
`

const validateContentType = (
  mimeTypes: undefined | Array<string>,
  mimeType: string,
): boolean => {
  if (!mimeTypes || !mimeTypes.length) { return true }
  return mimeTypes.includes(mimeType)
}

const validateSize = (
  maxSize: string | number | undefined,
  size: string | number | null,
): boolean => {
  if (!maxSize) { return true }
  if (!size) { return true }
  return +maxSize >= +size
}

const inKb = (size: string | number): string => {
  if (!size) { return '' }
  return `${Math.round(+size / 1024)} KB`
}

/**
 * @returns {void}
 * @memberof DropArea
 * @alias OnUpload
 */
type OnUpload = (files: FileList | null) => void

/**
 * @memberof DropArea
 * @alias FileObject
 */
type FileObject = {
  /**
   * File size in bytes
   */
  size: number;
  /**
   * Original file name
   */
  name: string;
  /**
   * Mime Type
   */
  type?: string;
  /**
   * Actual file buffer.
   */
  file?: Buffer;
};

/**
 * @memberof DropArea
 */
type Props = {
  /**
   * When given UI will show that file of this name and this size has been set.
   */
  fileObject?: FileObject;
  /**
   * Callback performed when the file is dropped/selected
   */
  onUpload: OnUpload;
  /**
   * Name of the property - used as an input id.
   */
  propertyName: string;
  /**
   * Validate options
   */
  validate?: {
    /**
     * Maximum size of the uploaded file in bytes. If not defined - all files are allowed.
     */
    maxSize?: number;
    /**
     * Avaliable mime types. When not defined - all mime types are allowed.
     */
    mimeTypes?: Array<string>;
  };
}

/**
 * Drop Area which can be used for uploading files.
 *
 * how to use it in your custom component.tsx:
 * ```
 * import React, { useState } from 'react'
 * import { DropArea, PropertyInEdit, BasePropertyProps } from 'admin-bro'
 * import { unflatten } from 'flat'
 *
 * const UploadPhoto: React.FC<BasePropertyProps> = (props) => {
 *   const { property, record, onChange } = props
 *
 *   const fileObject = unflatten(record.params)[property.name]
 *
 *   const onUpload = (files: FileList) => {
 *     const newRecord = {...record}
 *     const [file] = files
 *
 *     onChange({
 *       ...newRecord,
 *       params: {
 *         ...newRecord.params,
 *         [`${property.name}.file`]: file,
 *         [`${property.name}.name`]: file.name,
 *         [`${property.name}.size`]: file.size,
 *         [`${property.name}.type`]: file.type,
 *       }
 *     })
 *     event.preventDefault()
 *   }
 *
 *   return (
 *     <PropertyInEdit property={property}>
 *       <DropArea
 *         fileObject={fileObject}
 *         onUpload={onUpload}
 *         propertyName={property.name}
 *       />
 *     </PropertyInEdit>
 *   )
 * }
 * ```
 *
 * @component
 *
 * @example
 * const fileObject = null
 * const maxSize = 1024
 * const mimeTypes = ['application/pdf']
 * const onUpload = (files) => { alert(files[0].name) }
 * const property = {name: 'fileUpload', label: 'File Upload'}
 * return (
 * <PropertyInEdit property={property}>
 *   <DropArea
 *     fileObject={fileObject}
 *     onUpload={onUpload}
 *     propertyName={property.name}
 *     validate= { { maxSize, mimeTypes } }
 *   />
 * </PropertyInEdit>
 * )
 */
const DropArea: React.FC<Props & AddNoticeProps> = (props) => {
  const { fileObject, onUpload, propertyName, validate = {}, addNotice } = props

  const [isDragging, setIsDragging] = useState(false)

  const onDragEnter = (): void => setIsDragging(true)
  const onDragLeave = (): void => setIsDragging(false)
  const onDragOver = (): void => setIsDragging(true)

  const onDrop = (event: React.DragEvent | React.SyntheticEvent): void => {
    event.preventDefault()
    setIsDragging(false)
    const { files } = ((event as React.DragEvent).dataTransfer || event.target)
    for (let i = 0; i < files.length; i += 1) {
      const file = files.item(i)
      if (!file) { return }
      if (!validateSize(validate.maxSize, file && file.size)) {
        addNotice({
          message: `File: ${file.name} size is too big`,
          type: 'error',
        })
        return
      }
      if (!validateContentType(validate.mimeTypes, file.type)) {
        addNotice({
          message: `File: ${file.name} has unsupported type: ${file.type}`,
          type: 'error',
        })
        return
      }
    }
    onUpload(files)
  }

  return (
    <Wrapper
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <DropMessage className={isDragging ? 'active' : 'unactive'} onDragEnter={onDragEnter}>
        <h1>Drop Here</h1>
      </DropMessage>
      <UploadInput type="file" id={propertyName} onChange={(event): void => onDrop(event)} />
      {fileObject ? (
        <div>
          <Label>File name</Label>
          <p>{fileObject.name}</p>
          <p>{`(${Math.round(+fileObject.size / 1024)}) KB`}</p>
        </div>
      ) : (
        <div>
          <p><i className="fa fa-4x fa-upload" /></p>
          <p>
            Pick or Drop File here to upload it.
          </p>
          <ValidationInformation>
            {validate.maxSize ? (
              <p>
                <Label>Max size:</Label>
                {inKb(validate.maxSize)}
              </p>
            ) : ''}
            {validate.mimeTypes && validate.mimeTypes.length ? (
              <p>
                <Label>Available types:</Label>
                {validate.mimeTypes.join(', ')}
              </p>
            ) : ''}
          </ValidationInformation>
        </div>
      )}
    </Wrapper>
  )
}

// TODO remove this hack
export default withNotice(DropArea) as unknown as ComponentClass<Props>
