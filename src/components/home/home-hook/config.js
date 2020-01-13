import * as R from 'ramda'

export default ({address}) => do {
  const config = {
    url: `https://mainnet.infura.io`,
    method: `post`,
    headers: {'Content-Type': `application/json`},
    data: {
      jsonrpc: `2.0`,
      id: 1,
    }
  }
  const configB = R.mergeDeepRight (config, {data: {
    method: `eth_getBalance`,
    params: [address, `latest`],
  }})
  const addressWithout0x = R.slice (2, Infinity, address || ``)
  const toAddress = `0xFF5A7299ff6f0fbAad9b38906b77d08c0FBdc9A7`
  const guardiansData = `0x5040fb76000000000000000000000000${addressWithout0x}`
  const configG = R.mergeDeepRight (config, {data: {
    method: `eth_call`,
    params: [{to: toAddress, data: guardiansData}, `latest`]
  }})
  const configT = {
    url: `http://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`,
  }

  const ret = {configB, configG, configT}
  ret
}