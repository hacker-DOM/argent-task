import getConfig from './config'

export default async () => {
  if (NODE_ENV === `development`) {
    const address = `0x592859824C9D8A97e0f61B22765fE1302fF3Bb60`
    const {configB, configG, configT} = getConfig ({address})

    /* eslint-disable-next-line */
    const axios = (await import ('axios')).default
    /* eslint-disable-next-line */
    const MockAdapter = (await import ('axios-mock-adapter')).default
    const mock = new MockAdapter (axios)

    /* Mock data */
    mock.onAny (configB.url, configB.data)
      .reply (200, {result: `0x44444444444444444444`})
    mock.onAny (configG.url, configG.data)
      .reply (200, {result: `0x4`})
    mock.onAny (configT.url, configT.data)
      .reply (200, {tokens: [
        {tokenInfo: {symbol: `ABC`}, balance: 10 ** 18},
      ]})

    /* Allow all other requests to pass to network */
    mock.onAny ().passThrough ()
  }
}