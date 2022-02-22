import { Box, cssClass } from '@adminjs/design-system';
import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import styled from 'styled-components';
import { Branding } from '../../..';
import { initializeBranding } from '../../store/actions';

const SelectContainer = styled(Box)``;

SelectContainer.defaultProps = {
  className: cssClass('BrandingSelector'),
};

interface SelectableBranding {
  value: Branding;
  label: string;
}

const BrandingSelector: FC = () => {
  const dispatch = useDispatch();
  const selected = '';
  const selectableBrandings: SelectableBranding[] = [
    {
      value: {
        logo: 'https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.svg',
      },
      label: 'Logo',
    },
  ];

  const handleChange = useCallback(({ value }: SelectableBranding) => {
    dispatch(initializeBranding(value));
  }, []);

  return (
    <SelectContainer padding="xl">
      <Select
        value={selected}
        onChange={handleChange}
        options={selectableBrandings}
        menuPlacement="top"
      />
    </SelectContainer>
  );
};

export default BrandingSelector;
