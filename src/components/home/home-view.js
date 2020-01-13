import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import * as H from 'common'
import {Label, Input, Submit} from './home.sc'
import useHook from './home-hook'
import * as U from './utils'

const View = (props) => do {
  const {className} = props
  const hook = useHook ()
  const {resB, resG, resT} = hook;
  const onSubmit = (e) => {
    hook.setAddress (hook.inputRef.current.value)
    e.preventDefault ()
  }
  <main {...{className}}>
    <form {...{onSubmit}}>
      <Label htmlFor='addressField'>
        Enter your wallet address:
      </Label>
      <Input
        id='addressField'
        ref={hook.inputRef}
        defaultValue={hook.address}
      />
      <Submit type='submit' value='>>>'/>
    </form>
    {H.isNotNilOrEmpty (hook.address) && <>
      <h2>Wallet Balance</h2>
      {R.isNil (resB.data)
        ? resB.error
          ? <h1>There was an error</h1>
          : <h1>Loading...</h1>
        : R.tryCatch (R.pipe (U.parseInfura, U.parseHex, U.parseB), (e) => (
          <h1>{e.message}</h1>
        )) (resB.data)
      }
      <h2>Number of guardians</h2>
      {R.isNil (resG.data)
        ? resG.error
          ? <h1>There was an error</h1>
          : <h1>Loading...</h1>
        : R.tryCatch (R.pipe (U.parseInfura, U.parseHex), (e) => (
          <h1>{e.message}</h1>
        )) (resG.data)
      }
      <h2>ERC20 tokens</h2>
      {R.isNil (resT.data)
        ? resT.error
          ? <h1>There was an error</h1>
          : <h1>Loading...</h1>
        : R.tryCatch (U.parseEthplorer, (e) => (
          <h1>{e.message}</h1>
        )) (resT.data)
      }
    </>}
  </main>
}

export default styled (View) ``