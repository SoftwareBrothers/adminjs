import { Box, cssClass } from '@adminjs/design-system';
import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import styled from 'styled-components';
import { ReduxState } from '../..';
import { BrandingOptions } from '../../..';
import { changeBranding } from '../../store/actions';

const SelectContainer = styled(Box)``;

SelectContainer.defaultProps = {
  className: cssClass('BrandingSelector'),
};

interface SelectableBranding {
  value: BrandingOptions;
  label: string;
}

const BrandingSelector: FC = () => {
  const dispatch = useDispatch();
  const brandings = useSelector<ReduxState, BrandingOptions[]>(
    ({ availableBrandings }) => availableBrandings
  );
  const [selected, setSelected] = useState<SelectableBranding>();
  const selectableBrandings: SelectableBranding[] = brandings?.map((b, i) => ({
    value: { ...b, companyName: `${i}` },
    label: `${i}`,
  }));

  const handleChange = useCallback((event: SelectableBranding) => {
    setSelected(event);
    dispatch(changeBranding(event.value));
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
