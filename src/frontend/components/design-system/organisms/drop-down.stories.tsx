/* eslint-disable import/prefer-default-export */
import React from 'react'
import { DropDown, DropDownItem, DropDownTrigger, DropDownMenu } from './drop-down/index'
import { Icon } from '../atoms/icon'
import { Link } from '../atoms/link'

export const DropDownStory = () => (
  <DropDown>
    <DropDownTrigger p="default">
      <Icon icon="OverflowMenuHorizontal" />
    </DropDownTrigger>
    <DropDownMenu>
      <DropDownItem>
        <Link href="/some">
          <Icon icon="Video" />
          Some menu item
        </Link>
      </DropDownItem>
      <DropDownItem>
        <Link href="/some">Other item</Link>
      </DropDownItem>
    </DropDownMenu>
  </DropDown>
)
