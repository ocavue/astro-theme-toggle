import * as React from 'react'

import type { AnimationName } from '../animations/index.ts'
import type { TransitionAnimation } from '../animations/types.ts'
import { registerCustomElement } from '../custom-element.ts'


type ThemeToggleProps = React.HTMLAttributes<HTMLElement> & {
  animationName?: AnimationName
  animationCallback?: TransitionAnimation
}

const ThemeToggle: React.FC = (props: ThemeToggleProps) => {
  registerCustomElement()

  const {
    animationName,
    animationCallback,
    ...htmlProps
  } = props



  return React.createElement('transition-theme-toggle', {
    tableIndex: 0,
    role: 'button',
    ...(animationName ? {
      'data-animation-name': animationName
    } : null),
    ...(animationCallback ? {
      animationCallback
    }: null),
    ...htmlProps,
  })
}

export { ThemeToggle, type ThemeToggleProps }
