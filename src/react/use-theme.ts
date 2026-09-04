import * as React from 'react'

import { getTheme, subscribeThemeChange, SYSTEM, type Theme } from '../theme.ts'

function safeGetTheme(): Theme {
  return typeof window !== 'undefined' ? getTheme() : SYSTEM
}

export function useTheme(): Theme {
  return React.useSyncExternalStore(
    subscribeThemeChange,
    safeGetTheme,
    safeGetTheme,
  )
}
