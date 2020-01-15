import * as R from 'ramda'

export const

isNotNil = R.complement (R.isNil),

isNotEmpty = R.complement (R.isEmpty),

isNilOrEmpty = R.either (R.isNil, R.isEmpty),

isNotNilOrEmpty = R.both (isNotNil, isNotEmpty)
