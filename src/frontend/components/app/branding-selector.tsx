import {
  Box,
  combineStyles,
  cssClass,
  selectStyles,
} from '@adminjs/design-system'
import omit from 'lodash/omit'
import React, { FC, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import styled, { DefaultTheme, withTheme } from 'styled-components'
import { ReduxState } from '../..'
import { BrandingOptions } from '../../..'
import { useLocalStorage } from '../../hooks/use-local-storage'

const SelectContainer = styled(Box)``

SelectContainer.defaultProps = {
  className: cssClass('BrandingSelector'),
}

interface SelectableBranding {
  value: BrandingOptions;
  label: string;
}

interface BrandingSelector {
  theme: DefaultTheme;
}

const BrandingSelector: FC<BrandingSelector> = (props) => {
  const { theme } = props
  const brandings = useSelector<ReduxState, BrandingOptions[]>(
    ({ availableBrandings }) => availableBrandings,
  )
  const [selected, setSelected] = useState<SelectableBranding>()
  const selectableBrandings: SelectableBranding[] = brandings?.map(
    branding => ({
      value: branding,
      label: branding.theme?.details?.name || 'Undefined theme',
    })
  )
  const styles = selectStyles(theme)

  const [, storeTheme] = useLocalStorage<DefaultTheme>(
    'adminjs-theme',
    (window as any).THEME,
  )

  const handleChange = useCallback((event: SelectableBranding) => {
    setSelected(event)
    const combinedTheme = combineStyles(omit(event.value.theme, 'details'))
    storeTheme(combinedTheme as DefaultTheme)
    window.location.reload()
  }, [])

  if (!selectableBrandings.length) return null

  return (
    <SelectContainer padding="xl">
      <Select
        placeholder="Select theme..."
        value={selected}
        onChange={handleChange}
        options={selectableBrandings}
        menuPlacement="top"
        styles={styles}
      />
    </SelectContainer>
  )
}

export default withTheme(BrandingSelector)
