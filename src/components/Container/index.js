import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

const Container = ({children, className}) => {
    return <Wrapper className={className}>{children}</Wrapper>
}

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;

  ${breakpoint('md', 'xxl')`
    padding: 0 50px;
`}
  ${breakpoint('xs', 'md')`
    padding: 0 30px;
`}
`

export default Container