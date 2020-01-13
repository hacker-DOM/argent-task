import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 125%;
  }

  body {
    box-sizing: border-box;
    font-family: sans-serif;
    font-weight: 500;
  }
}
`