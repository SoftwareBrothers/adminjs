import {
  Box,
  combineStyles,
  cssClass,
  selectStyles,
} from '@adminjs/design-system';
import omit from 'lodash/omit';
import React, { FC, useCallback, useState } from 'react';
import Select from 'react-select';
import styled, { DefaultTheme, withTheme } from 'styled-components';
import { AdminJSOptions } from '../../../adminjs-options.interface';
import { useLocalStorage } from '../../hooks/use-local-storage';
import { useBranding } from '../../utils/branding-provider';

const SelectContainer = styled(Box)``;

SelectContainer.defaultProps = {
  className: cssClass('BrandingSelector'),
};

interface SelectableBranding {
  value: Required<AdminJSOptions['branding']>;
  label: string;
}

export interface BrandingSelector {
  theme: DefaultTheme;
  logo?: string | false;
}

const BrandingSelector: FC<BrandingSelector> = (props) => {
  const { theme } = props;
  const styles = selectStyles(theme);
  const [selected, setSelected] = useState<SelectableBranding>();
  const [, availableBrandings] = useBranding();
  const [, storeTheme] = useLocalStorage<BrandingSelector | null>(
    'adminjs-branding',
    null
  );
  const handleChange = useCallback(async (event: SelectableBranding) => {
    const branding =
      typeof event.value === 'function' ? await event.value() : event.value;
    const combinedTheme = combineStyles(omit(branding.theme, 'details')) as DefaultTheme;
    storeTheme({ theme: combinedTheme, logo: branding.logo });
    setSelected(event);
    window.location.reload();
  }, []);

  if (!availableBrandings?.length) return null;

  const selectableBrandings = availableBrandings.reduce((acc, curr) => {
    if (curr && typeof curr !== 'function') {
      const selectable: SelectableBranding = {
        value: curr,
        label: curr.theme?.details?.name || 'Undefined theme',
      };
      acc.push(selectable);
    }
    return acc;
  }, [] as SelectableBranding[]);

  if (!selectableBrandings.length) return null;

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
  );
};

export default withTheme(BrandingSelector);
