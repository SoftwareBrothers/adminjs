import styled, { css } from 'styled-components'
import { SpaceProps, space } from 'styled-system'

import { Label } from '../atoms/label'
import { Text } from '../atoms/text'
import { Button } from '../atoms/button'
import { Input } from '../atoms/input'
import { Link } from '../atoms/link'

const formGroupDisabledCSS = css`
  color: ${({ theme }): string => theme.colors.greyLight};
`

const formGroupWithErrorCSS = css`
  color: ${({ theme }): string => theme.colors.red};
  ${Input} {
    color: ${({ theme }): string => theme.colors.red};
    border-color: ${({ theme }): string => theme.colors.red};
  }
  &&& ${Label} {
    color: ${({ theme }): string => theme.colors.red};
    &:before {
      color: ${({ theme }): string => theme.colors.red};
    }
  }
  &&& ${Label}, &&& ${Button}, &&& ${Link} {
    border-color: ${({ theme }): string => theme.colors.red};
  }
`

export const FormMessage = styled(Text)`
  box-sizing: border-box;
  vertical-align: middle;
  height: ${({ theme }): string => theme.space.xl};
  margin: ${({ theme }): string => theme.space.sm} 0 0;
  font-weight: normal;
`

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  ${Input} {
    flex-grow: 1;
  }
  ${Input}:not(:last-child) {
    border-right: none;
  }
  ${Label}, ${Button}:last-child, ${Link}:last-child {
    padding: ${({ theme }): string => theme.space.sm};
    border: solid ${({ theme }): string => theme.colors.greyLight};
    border-width: 1px 1px 1px 0;
    margin: 0;
    color: ${({ theme }): string => theme.colors.greyLight};
  }

  ${Label}, ${Button}, ${Link} {
    flex-shrink: 0;
  }

  ${Label}, ${Link} {
    line-height: ${({ theme }): string => theme.lineHeights.lg};
  }

  ${Button}:first-child, ${Link}:first-child {
    border-right: 0;
  }

  ${Input}:hover {
    & + ${Label}, & + ${Button}, & + ${Link} {
      border-color: ${({ theme }): string => theme.colors.grey};
    }
  } 
  ${Input}:focus {
    & + ${Label}, & + ${Button}, & + ${Link} {
      border-color: ${({ theme }): string => theme.colors.bluePrimary};
    }
  } 
`

export type FormGroupProps = SpaceProps & {
  error?: boolean;
  disabled?: boolean;
}

export const FormGroup = styled.div<FormGroupProps>`
  width: 100%;
  ${({ error }) => (error ? formGroupWithErrorCSS : '')};
  ${({ disabled }) => (disabled ? formGroupDisabledCSS : '')};
  ${space};

  & > ${Input} {
    width: 100%;
  }
`

FormGroup.defaultProps = {
  mb: 'lg',
}
