import { getTheme } from '../lib/theme.ts'

import { startCircleAnimation } from './animations/circle.ts'
import { getAnimation, isValidAnimationName, loadBuildinAnimation, tryLoadAnimation } from './animations/index.ts'
import type { TransitionAnimationOptions } from './animations/types.ts'
import { subscribeThemeChange, toggleTheme } from './theme.ts'


class ThemeToggleElement extends HTMLElement {
  private unsubscribe: VoidFunction | undefined

  connectedCallback() {
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0')
    }
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button')
    }
    this.addEventListener('click', (event) => {
      const animation = getAnimation(this.getAnimationName())
    })
    this.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        const rect = this.getBoundingClientRect()
        const clientX = rect.left + rect.width / 2
        const clientY = rect.top + rect.height / 2
        handleClick(clientX, clientY)
      }
    })
    this.render()

    this.unsubscribe?.()
    this.unsubscribe = subscribeThemeChange(() => {
      this.render()
    })

    const animationName = this.getAnimationName()
    if (animationName) {
      // Preload the built-in animation to avoid delay on first click
      void tryLoadAnimation(animationName)
    }
  }

  disconnectedCallback() {
    this.unsubscribe?.()
    this.unsubscribe = undefined
  }

  private render() {
    this.dataset.theme = getTheme()
  }

  private getAnimationName(): string | undefined {
    return this.dataset.animationName
  }

  play(options: TransitionAnimationOptions): void {
    const maybeAnimationName = this.getAnimationName()
    const animationName = maybeAnimationName && isValidAnimationName(maybeAnimationName)  ? maybeAnimationName : undefined
    if (animationName) {
      animation
    }



    const animation = getAnimation(this.getAnimationName())
    return animation(options)
  }
}

export { type ThemeToggleElement }

let registered = false

export function registerCustomElement() {
  if (registered) return
  registered = true

  const name = 'transition-theme-toggle'
  if (typeof window !== 'undefined' && !window.customElements.get(name)) {
    customElements.define(name, ThemeToggleElement)
  }
}
