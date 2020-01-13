import * as R from 'ramda'

export const

isNotNil = R.complement (R.isNil),

isNotEmpty = R.complement (R.isEmpty),

isNilOrEmpty = R.either (isNotNil, isNotEmpty),

isNotNilOrEmpty = R.both (isNotNil, isNotEmpty)
