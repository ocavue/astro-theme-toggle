import * as React from 'react'

import { registerCustomElement } from '../custom-element.ts'


type ThemeToggleProps = React.HTMLAttributes<HTMLElement>

const ThemeToggle: React.FC = (props: ThemeToggleProps) => {
  registerCustomElement()

  return React.createElement('transition-theme-toggle', {
    tableIndex: 0,
    role: 'button',
    ...props,
  })
}

export { ThemeToggle, type ThemeToggleProps }
