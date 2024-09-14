import { toggleTheme } from './theme'

type StartViewTransition = (
  updateCallback?: () => void | Promise<void>,
) => ViewTransition | undefined

type ViewTransition = {
  finished?: Promise<void>
  ready?: Promise<void>
  updateCallbackDone?: Promise<void>
}

async function startCircleAnimation(
  callback: () => void,
  x: number,
  y: number,
) {
  const startViewTransition = (
    document as unknown as { startViewTransition?: StartViewTransition }
  ).startViewTransition

  if (typeof startViewTransition !== 'function') {
    callback()
    return
  }

  await startViewTransition(() => {
    callback()
  })?.ready

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
      duration: 500,
      easing: 'ease-in',
      pseudoElement: '::view-transition-new(root)',
    },
  )
}

export function handleToggleClick(event: MouseEvent) {
  void startCircleAnimation(toggleTheme, event.clientX, event.clientY)
}
