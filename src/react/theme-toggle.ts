import * as React from 'react'

import { loadBuildinAnimation, type AnimationName } from '../animations/index.ts'
import type { TransitionAnimation } from '../animations/types.ts'
import { registerCustomElement } from '../custom-element.ts'


type ThemeToggleProps = React.HTMLAttributes<HTMLElement> & {
  animation ?:AnimationName |  TransitionAnimation
}

const ThemeToggle: React.FC = (props: ThemeToggleProps) => {
  registerCustomElement()

  const animationName = typeof props.animation === 'string' ? props.animation : undefined

  React.useEffect(() => {
    if (animationName){
    void   loadBuildinAnimation(animationName)
    }

  }, [])

  return React.createElement('transition-theme-toggle', {
    tableIndex: 0,
    role: 'button',
    ...props,
  })
}

export { ThemeToggle, type ThemeToggleProps }
