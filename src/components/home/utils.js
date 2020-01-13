import React from 'react'
import * as R from 'ramda'
import {Ul} from './home.sc'

const ADDRESS_WRONG = `Looks like the address isn't correct...`
const OTHER_ERROR = `Something went terribly wrong...`

export const

parseInfura = (data) => {
  if (data?.error) {
    data?.error?.code === -32602
      ? throw new Error (ADDRESS_WRONG)
      : throw new Error (OTHER_ERROR)
  }
  return R.prop (`result`, data)
},

parseHex = (hex) => (
  parseInt (hex, 16)
),

parseB = (balance) => (
  `${(balance / 10 ** 18).toFixed (4)} ETH`
),

parseTokenB = (balance) => (
  (balance / 10 ** 18).toFixed (2)
),

parseEthplorer = (data) => {
  if (data?.error) {
    data?.error?.code === 104
      ? throw new Error (ADDRESS_WRONG)
      : throw new Error (OTHER_ERROR)
  }
  return <Ul>
    {R.map (t => (
      <li key={t}>{t?.tokenInfo?.symbol} {parseTokenB (t?.balance)}</li>
    ), data.tokens)
    }
  </Ul>
}