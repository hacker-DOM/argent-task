import {css} from 'styled-components'
import Home from 'components/home'

export default css`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: var(--bg, grey);

  ${Home} {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 25rem;
    max-width: 100vw;
    height: 30rem;
    max-height: 100vh;
    background-color: var(--fg, white);
  }
`

/* A component shoud NOT set its own width, height, margin, color. */