import styled, { css } from 'styled-components'

type Props = {
    withBorder?: boolean;
    withTopBottomPadding?: boolean;
}

const border = css`
border-bottom: 1px solid rgb(0 0 0 / 10%);
`

export const StyledContainer = styled.div<Props>`
${props => (props.withBorder && border)}
padding:${props => (props.withTopBottomPadding ? '16px' : '0')} 32px;
`
