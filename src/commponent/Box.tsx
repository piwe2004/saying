import styled from '@emotion/styled'
import { LayoutProps, ColorProps, BorderProps, DisplayProps, layout, color, border, display, FlexboxProps, TypographyProps, typography, flexbox, space, SpaceProps, position, PositionProps } from 'styled-system';

export type BoxProps = LayoutProps & ColorProps & BorderProps & DisplayProps & FlexboxProps & TypographyProps & SpaceProps & PositionProps;

const Box = styled.div<BoxProps>`
    ${layout}
    ${color}
    ${border}
    ${display}
    ${flexbox}
    ${typography}
    ${space}
    ${position}
`

export default Box;