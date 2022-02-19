import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.color.primary};
  }
  :root {
    --animate-duration: 800ms;
    --animate-delay: 0.2s;
  }
`