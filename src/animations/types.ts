export type TransitionAnimation = (options: TransitionAnimationOptions) => void | Promise<void>


export interface TransitionAnimationOptions {
  /**
   * A callback function invoked to update the DOM during the SPA view transition process.
   *
   * See https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition#updatecallback
   */
  update: () => void | Promise<void>,

  /**
   * The x-coordinate of the point where the user clicked to trigger the theme toggle.
   */
  clientX?: number,

  /**
   * The y-coordinate of the point where the user clicked to trigger the theme toggle.
   */
  clientY?: number,
}
