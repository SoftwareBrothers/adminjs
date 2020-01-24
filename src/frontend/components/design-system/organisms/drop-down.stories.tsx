import React from 'react'
import { DropDown, DropDownItem, DropDownTrigger, DropDownMenu } from './drop-down'
import { Icon } from '../atoms/icon'

export default {
  title: 'DropDown',
}

export const dropDown = () => (
  <DropDown>
    <DropDownTrigger>
      <Icon icon="OverflowMenuHorizontal" />
    </DropDownTrigger>
    <DropDownMenu>
      <DropDownItem>Some menu item</DropDownItem>
      <DropDownItem>Other item</DropDownItem>
    </DropDownMenu>
  </DropDown>
)
