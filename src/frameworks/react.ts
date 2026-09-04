import * as React from 'react'

import { registerCustomElement } from '../custom-element.ts'
import { getTheme, subscribeThemeChange, SYSTEM, type Theme } from '../theme.ts'

function safeGetTheme(): Theme {
  return typeof window !== 'undefined' ? getTheme() : SYSTEM
}

function useTheme(): Theme {
  return React.useSyncExternalStore(
    subscribeThemeChange,
    safeGetTheme,
    safeGetTheme,
  )
}

type ThemeToggleProps = React.HTMLAttributes<HTMLElement>

const ThemeToggle: React.FC = (props: ThemeToggleProps) => {
  registerCustomElement()

  return React.createElement('transition-theme-toggle', {
    tableIndex: 0,
    role: 'button',
    ...props,
  })
}

export { ThemeToggle, useTheme, type ThemeToggleProps }
