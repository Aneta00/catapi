import React from 'react'
import styled from 'styled-components'
import { BreakpointsPx } from 'lib/breakpoints/breakpoints'


type ColNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12


export interface ColProps {
  xs: ColNumber
  sm: ColNumber
  md: ColNumber
  lg: ColNumber
}


interface GridProps {
  mb?: string
  children: React.ReactNode
  className?: string
}


const gridGutters = {
  xs: '1.6rem',
  md: '2.4rem',
}


export const getColumnWidth = (span: ColNumber) => {
  const width = (span / 12) * 100


  return `${width}%`
}


export const Grid = ({ mb, children, className }: GridProps) => {
  if (mb)
    return (
      <StyledMargin mb={mb}>
        <StyledGrid className={className}>{children}</StyledGrid>
      </StyledMargin>
    )


  return <StyledGrid className={className}>{children}</StyledGrid>
}


const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  margin: 0 0 -${gridGutters.xs} -${gridGutters.xs};
  @media (min-width: ${BreakpointsPx.Medium}) {
    margin: 0 0 -${gridGutters.md} -${gridGutters.md};
  }
`


const StyledMargin = styled.div<GridProps>`
  margin-bottom: ${({ mb }) => mb || '0'};
`


export const Column = styled.div<ColProps>`
  display: ${({ xs }) => (xs ? 'block' : 'none')};
  align-items: stretch;
  width: ${({ xs }) => (xs ? getColumnWidth(xs) : '100%')};
  @media (min-width: ${BreakpointsPx.Small}) {
    display: ${({ sm }) => (sm ? 'block' : 'none')};
    width: ${({ sm }) => sm && getColumnWidth(sm)};
  }
  @media (min-width: ${BreakpointsPx.Medium}) {
    display: ${({ md }) => (md ? 'block' : 'none')};
    width: ${({ md }) => md && getColumnWidth(md)};
  }
  @media (min-width: ${BreakpointsPx.Large}) {
    display: ${({ lg }) => (lg ? 'block' : 'none')};
    width: ${({ lg }) => lg && getColumnWidth(lg)};
  }


  padding: 0 0 ${gridGutters.xs} ${gridGutters.xs};
  @media (min-width: ${BreakpointsPx.Medium}) {
    padding: 0 0 ${gridGutters.md} ${gridGutters.md};
  }
  `
