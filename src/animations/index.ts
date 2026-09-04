import type { TransitionAnimation } from './types.ts';

export type AnimationName = 'circle'


export async function loadBuildinAnimation(name: string): Promise<TransitionAnimation | undefined> {
  switch (name) {
    case 'circle':
      return await import('./circle.ts').then((module) => module.default)
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
Ï
