import React from 'react'
import Layout from 'components/layout'
import Home from 'components/home'
import reset from './reset.sc'

export default () => do {
  <Layout css={reset}>
    <Home/>
  </Layout>
}