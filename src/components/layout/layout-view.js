import React from 'react'
import styled from 'styled-components'
import css from './layout.sc'

const View = (props) => do {
  const {children, className} = props;
  <div css={css} {...{className}}>
    {children}
  </div>
}

export default styled (View) ``