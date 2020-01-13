import React from 'react'

export const

useMount = mount => React.useEffect (
  mount, []
),

useForceUpdate = () => do {
  const [, forceUpdate] = React.useReducer (x => x + 1, 0)
  forceUpdate
}
