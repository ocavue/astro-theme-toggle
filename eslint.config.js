import { basic, markdown } from '@ocavue/eslint-config'

export default [
  ...basic(),
  ...markdown(),
  {
    ignores: ['**/env.d.ts'],
  },
]
