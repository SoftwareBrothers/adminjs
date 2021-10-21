import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import React from 'react'
import { ButtonProps } from '@adminjs/design-system'

export const StyledBackBtn = styled(({ rounded, ...rest }) => <RouterLink {...rest} />)<ButtonProps>`
    border: 1px solid rgba(0, 22, 54, 0.23);
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px;
    width: 48px;
    height: 48px;
    display: inline-flex;
    color: #1A679D;
    margin-right: 16px;
`
