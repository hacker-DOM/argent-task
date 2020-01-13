import React from 'react'
import Layout from 'components/layout'
import Home from 'components/home'
import Reset from './reset.sc'
import css from './app.sc'
import {history} from 'common'
import {QueryParamProvider} from 'use-query-params'

export default () => do {
  <>
    <Reset/>
    <QueryParamProvider {...{history}}>
      <Layout css={css}>
        <Home/>
      </Layout>
    </QueryParamProvider>
  </>
}