import {useRef, useEffect} from 'react'
// import * as R from 'ramda'
import {useQueryParam, StringParam} from 'use-query-params'
import useAxios from 'axios-hooks'
import * as H from 'common'
import getConfig from './config'
import mockApiInDev from './mock-api'

export default () => {
  /* See https://github.com/pbeshai/use-query-params/issues/30 */
  const forceUpdate = H.useForceUpdate ()
  H.useMount (() => H.history.listen (forceUpdate))
  const inputRef = useRef (null)
  const [address, setAddress] = useQueryParam (`address`, StringParam)
  const {configB, configG, configT} = getConfig ({address})
  const [resB, queryB] = useAxios (configB, {manual: true})
  const [resG, queryG] = useAxios (configG, {manual: true})
  const [resT, queryT] = useAxios (configT, {manual: true})
  useEffect (() => {
    mockApiInDev ()
      .then (() => {
        H.isNotNilOrEmpty (address) && queryB () && queryG () && queryT ()
      })
  }, [address])

  return {
    address,
    inputRef,
    resB, resG, resT,
    setAddress,
  }
}