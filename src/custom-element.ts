import { getTheme } from '../lib/theme.ts'

import { getAnimation, isValidAnimationName, loadBuildinAnimation } from './animations/index.ts'
import type { TransitionAnimation, TransitionAnimationOptions } from './animations/types.ts'
import { subscribeThemeChange, toggleTheme } from './theme.ts'


class ThemeToggleElement extends HTMLElement {
  private unsubscribe: VoidFunction | undefined
  private _customAnimation: TransitionAnimation  | null | undefined

  get customAnimation(): TransitionAnimation | null {
    return this._customAnimation  || null
  }

  set customAnimation(value: TransitionAnimation | null)  {
    this._customAnimation = (value || null)
  }

  connectedCallback() {
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0')
    }
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button')
    }
    this.addEventListener('click', (event) => {
        this.run(event.clientX, event.clientY)
    })
    this.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        const rect = this.getBoundingClientRect()
        const clientX = rect.left + rect.width / 2
        const clientY = rect.top + rect.height / 2
        this.run(clientX, clientY)
      }
    })
    this.render()

    this.unsubscribe?.()
    this.unsubscribe = subscribeThemeChange(() => {
      this.render()
    })

    const animationName = this.getAnimationName()
    if (animationName && isValidAnimationName(animationName)) {
      // Preload the built-in animation to avoid delay on first click
      void loadBuildinAnimation(animationName)
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

  private run(clientX: number, clientY: number): void {
    const options: TransitionAnimationOptions = {
      clientX, clientY, update: toggleTheme
    }

    const customAnimation = this.customAnimation
    if (customAnimation) {
      void customAnimation(options)
      return
    }

    const animationName = this.getAnimationName()
    if (animationName && isValidAnimationName(animationName)) {
      void getAnimation(animationName)(options)
    }
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
