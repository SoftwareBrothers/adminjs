import { Box, cssClass } from '@adminjs/design-system';
import React, { FC, useCallback, useState } from 'react';
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
  const [selected, setSelected] = useState<SelectableBranding>();
  const selectableBrandings: SelectableBranding[] = [
    {
      value: {
        logo: 'https://softwarebrothers.co/assets/images/software-brothers-logo-full.svg',
      },
      label: 'SoftwareBrothers',
    },
    {
      value: {
        logo: 'https://cdn.bulldogjob.com/system/companies/logos/000/000/070/original/RST_SoftwareMasters_square.png',
      },
      label: 'RST',
    },
  ];

  const handleChange = useCallback((event: SelectableBranding) => {
    setSelected(event);
    dispatch(initializeBranding(event.value));
  }, []);

  if (!selectableBrandings.length) return null;

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
