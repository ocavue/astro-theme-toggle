import type { TransitionAnimation } from './types.ts';

export type AnimationName = 'circle' | "none"

/**
 * @internal
 */
export function isValidAnimationName(name: string): name is AnimationName {
  return ['circle', 'none'].includes(name)
}

const noneAnimation: TransitionAnimation = () => {
  // No animation
}

/**
 * @internal
 */
export async function loadBuildinAnimation(name: AnimationName): Promise<{default?: TransitionAnimation}> {
  switch (name) {
    case 'circle':
      return await import('./circle.ts')
    case 'none':
      return  {default: noneAnimation}
  }
}


export function getAnimation(animation: AnimationName | TransitionAnimation): TransitionAnimation {
  if (typeof animation === 'function') {
    return animation
  }

  return async (options) => {
      const module = await loadBuildinAnimation(animation)
      return await module.default?.(options)
    }
}
