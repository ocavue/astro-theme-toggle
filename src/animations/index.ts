import type { TransitionAnimation } from './types.ts';

export type BuiltinAnimation = 'circle'


export async function loadBuildinAnimation(name: BuiltinAnimation): Promise<TransitionAnimation> {
  switch (name) {
    case 'circle':
      return await import('./circle.ts').then((module) => module.default)

    default:
      throw new Error(`Animation "${name}" not found`)
  }
}


export function getAnimation(animation: BuiltinAnimation | TransitionAnimation): TransitionAnimation {
  if (typeof animation === 'function') {
    return animation
  }

  return async (options) => {
      const fn = await loadBuildinAnimation(animation)
      return await fn(options)
    }
  }
Ï
