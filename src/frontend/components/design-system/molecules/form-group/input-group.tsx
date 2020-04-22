import styled from 'styled-components'
import { Label } from '../../atoms/label'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import { Link } from '../../atoms/link'

/**
 * @component
 * @private
 */
const InputGroup = styled.div`
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
    border: solid ${({ theme }): string => theme.colors.inputBorder};
    border-width: 1px 1px 1px 0;
    margin: 0;
    color: ${({ theme }): string => theme.colors.grey40};
  }

  ${Button}:last-child:hover {
    background: ${({ theme }): string => theme.colors.hoverBg};
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
      border-color: ${({ theme }): string => theme.colors.grey60};
    }
  } 
  ${Input}:focus {
    & + ${Label}, & + ${Button}, & + ${Link} {
      border-color: ${({ theme }): string => theme.colors.primary100};
    }
  }
`

export default InputGroup
