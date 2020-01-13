import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import * as H from 'common'
import {Label, Button, Input, Ul} from './home.sc'
import useHook from './home-hook'

const parseResult = R.prop (`result`)

const parseHex = (hex) => (
  parseInt (hex, 16)
)

const parseB = (balance) => (
  (balance / 10 ** 18).toFixed (4)
)

const parseT = (data) => (
  R.map (t => <li>Name: {t?.tokenInfo?.symbol}, Balance: {parseB (t?.balance)}</li>, data.tokens)
)

const View = (props) => do {
  const {className} = props
  const hook = useHook ()
  const {resB, resG, resT} = hook;
  <main {...{className}}>
    <Label htmlFor='addressField'>
        Enter your wallet address:
    </Label>
    <Input
      id='addressField'
      ref={hook.inputRef}
      defaultValue={hook.address}
    />
    <Button onClick={() => hook.setAddress (hook.inputRef.current.value)}>
        >>>
    </Button>
    {H.isNotNilOrEmpty (hook.address) && (
      <>
        <h2>Wallet Balance</h2>
        {R.isNil (resB.data) || resB.loading
          ? <h1>Loading... </h1>
          : (
            <h1>{resB.data |> parseResult |> parseHex |> parseB}</h1>
          )
        }
        <h2>Number of guardians</h2>
        {R.isNil (resG.data) || resG.loading
          ? <h1>Loading...</h1>
          : (
            <h1>{resG.data |> parseResult |> parseHex}</h1>
          )
        }
        <h2>ERC20 tokens</h2>
        {R.isNil (resT.data) || resT.loading
          ? <h1>Loading...</h1>
          : (
            <Ul>
              {resT.data |> parseT}
            </Ul>
          )
        }
      </>
    )}
  </main>
}

export default styled (View) ``