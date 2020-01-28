/* eslint-disable import/prefer-default-export */
import React from 'react'
import { DropDown, DropDownItem, DropDownTrigger, DropDownMenu } from './drop-down'
import { Icon } from '../atoms/icon'
import { Button } from '../atoms/button'

export const DropDownStory = () => (
  <DropDown>
    <DropDownTrigger p={2} m={-2}>
      <Icon icon="OverflowMenuHorizontal" />
    </DropDownTrigger>
    <DropDownMenu>
      <DropDownItem>
        <Icon icon="Video" />
        Some menu item
      </DropDownItem>
      <DropDownItem>Other item</DropDownItem>
    </DropDownMenu>
  </DropDown>
)
