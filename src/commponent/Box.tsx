import styled from '@emotion/styled'
import { LayoutProps, ColorProps, BorderProps, DisplayProps, layout, color, border, display, FlexboxProps, flex, TypographyProps, typography, flexbox, space, SpaceProps } from 'styled-system';

export type BoxProps = LayoutProps & ColorProps & BorderProps & DisplayProps & FlexboxProps & TypographyProps & SpaceProps;

const Box = styled.div<BoxProps>`
    ${layout}
    ${color}
    ${border}
    ${display}
    ${flexbox}
    ${typography}
    ${space}
`

export default Box;