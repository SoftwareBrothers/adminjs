import React, { FC, useState } from 'react'
import styled from 'styled-components'

const Search: FC<any> = () => {
  const [query, setQuery] = useState<string>()

  const StyledInput = styled.input`
    width: 100%;
    max-width: 518px;
    height: 48px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 22, 54, 0.23);
    box-sizing: border-box;
    border-radius: 4px;
    padding: 0 16px;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: rgba(0, 22, 54, 0.87);
    
    &::placeholder {
      font-weight: normal;
      color: rgba(0, 22, 54, 0.54);
    }
`

  return (
    <StyledInput
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setQuery(e.target.value)}
      value={query}
      placeholder="Поиск"
    />
  )
}

export {
  Search as default, Search,
}
