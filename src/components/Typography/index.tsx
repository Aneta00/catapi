import styled, { css } from 'styled-components'


interface SharedProps {
  mt?: string
  mb?: string
  color?: string
  semibold?: boolean
}


const sharedStyles = css<SharedProps>`
  ${({ mt, theme, color }) => css`
    color: ${color || '#222021'};
    line-height: '1.2';
    margin-block-start: ${mt || '0'};
  `}
`


const fontWeightStyles = css<SharedProps>`
  ${({ semibold }) => css`
    font-weight: ${semibold ? 600 : 300};
  `}
`


export const H1 = styled.h1<SharedProps>`
  ${({ theme, mb }) => {
    return css`
      ${sharedStyles}
      ${fontWeightStyles}
      font-size: '4.8rem';
      margin-block-end: ${mb || '2.4rem'};
    `
  }}
`


export const H2 = styled.h2<SharedProps>`
  ${({ theme, mb }) => {
    return css`
      ${sharedStyles}
      ${fontWeightStyles}
      font-size: '3.4rem';
      margin-block-end: ${mb || '2rem'};
    `
  }}
`


export const Body1 = styled.p<SharedProps>`
  ${({ mb, theme }) => {
    return css`
      ${sharedStyles}
      font-size: '1.8rem';
      line-height: ;
      margin-block-end: ${mb || '1.4rem'};
      &:last-of-type {
        margin-block-end: ${mb || '0'};
      }
    `
  }}
`




