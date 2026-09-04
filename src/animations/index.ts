import type { TransitionAnimation } from './types.ts';

type AnimationName = 'circle'


async function loadAnimation(name: AnimationName): Promise<TransitionAnimation> {
  switch (name) {
    case 'circle':
      return import('./circle.ts').then((module) => module.default)

    default:
      throw new Error(`Animation "${name}" not found`)
  }
}


  function getAnimation(animation: AnimationName): TransitionAnimation {
    return async (options) => {
      const fn = await loadAnimation(animation)
      return await fn(options)
    }
  }


  export {loadAnimation, getAnimation}
