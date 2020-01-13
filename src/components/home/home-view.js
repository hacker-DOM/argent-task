import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import * as H from 'common'
import css, {Form, Label, Input, Submit, H3, Value} from './home.sc'
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
  <main {...{className}} css={css}>
    <Label htmlFor='addressField'>
        Enter your wallet address:
    </Label>
    <Form {...{onSubmit}}>
      <Input
        id='addressField'
        ref={hook.inputRef}
        defaultValue={hook.address}
      />
      <Submit type='submit' value='>>>'/>
    </Form>
    {H.isNotNilOrEmpty (hook.address) && <>
      <H3>Wallet Balance</H3>
      <Value>
        {R.isNil (resB.data)
          ? resB.error
            ? `There was an error`
            : `Loading...`
          : R.tryCatch (R.pipe (U.parseInfura, U.parseHex, U.parseB), (e) => (
            e.message
          )) (resB.data)
        }
      </Value>
      <H3>Number of guardians</H3>
      <Value>
        {R.isNil (resG.data)
          ? resG.error
            ? `There was an error`
            : `Loading...`
          : R.tryCatch (R.pipe (U.parseInfura, U.parseHex), (e) => (
            e.message
          )) (resG.data)
        }
      </Value>
      <H3>ERC20 tokens</H3>
      <Value>
        {R.isNil (resT.data)
          ? resT.error
            ? `There was an error`
            : `Loading...`
          : R.tryCatch (U.parseEthplorer, (e) => (
            e.message
          )) (resT.data)
        }
      </Value>
    </>}
  </main>
}

export default styled (View) ``