import type { TransitionAnimation } from './types.ts';

export type AnimationName = 'circle' | "none"

/**
 * @internal
 */
export function isValidAnimationName(name: string): name is AnimationName {
  return ['circle', 'none'].includes(name)
}

/**
 * @internal
 */
export async function loadBuildinAnimation(name: AnimationName): Promise<TransitionAnimation> {
  switch (name) {
    case 'circle':
      return await import('./circle.ts').then((module) => module.default)
    case 'none':
      return   () => {
        // No animation
      }
  }
}

/**
 * @internal
 */
 export async function tryLoadAnimation(name: string): Promise<TransitionAnimation | undefined> {
  if (isValidAnimationName(name)) {
    return await loadBuildinAnimation(name)
  }
}


export function getAnimation(animation: AnimationName | TransitionAnimation): TransitionAnimation {
  if (typeof animation === 'function') {
    return animation
  }

  return async (options) => {
      const fn = await loadBuildinAnimation(animation)
      return await fn?.(options)
    }
}
