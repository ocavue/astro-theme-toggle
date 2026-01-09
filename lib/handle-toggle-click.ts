import { toggleTheme } from './theme'

const STYLE_ID = 'astro-theme-toggle-temporary-styles'
const STYLE_CONTENT =
  '::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }'

function removeTemporaryStyles() {
  const style = document.getElementById(STYLE_ID)
  style?.remove()
}

function injectTemporaryStyles() {
  removeTemporaryStyles()
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = STYLE_CONTENT
  document.head.appendChild(style)
}

async function startCircleAnimation(
  callback: () => void,
  x: number,
  y: number,
  speed = 500,
) {
  const doc = document as unknown as {
    startViewTransition?: (updateCallback?: () => unknown) => {
      ready?: Promise<void>
      finished?: Promise<void>
    }
  }

  if (typeof doc.startViewTransition !== 'function') {
    callback()
    return
  }

  injectTemporaryStyles()

  const transition = doc.startViewTransition(() => {
    callback()
  })

  await transition?.ready
  void transition?.finished?.then(removeTemporaryStyles)

  const gradientOffset = 0.7
  const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><defs><radialGradient id="toggle-theme-gradient"><stop offset="${gradientOffset}"/><stop offset="1" stop-opacity="0"/></radialGradient></defs><circle cx="4" cy="4" r="4" fill="url(#toggle-theme-gradient)"/></svg>`
  const maskUrl = `data:image/svg+xml;base64,${window.btoa(maskSvg)}`

  const w = window.innerWidth
  const h = window.innerHeight

  const maxRadius = Math.ceil(
    Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) / gradientOffset,
  )

  document.documentElement.animate(
    {
      maskImage: [`url('${maskUrl}')`, `url('${maskUrl}')`],
      maskRepeat: ['no-repeat', 'no-repeat'],
      maskPosition: [`${x}px ${y}px`, `${x - maxRadius}px ${y - maxRadius}px`],
      maskSize: ['0', `${2 * maxRadius}px`],
    },
    {
      duration: speed,
      easing: 'ease-in',
      pseudoElement: '::view-transition-new(root)',
    },
  )
}

export function handleToggleClick(event: { clientX: number; clientY: number, speed?: number }) {
  void startCircleAnimation(toggleTheme, event.clientX, event.clientY, event.speed)
}
