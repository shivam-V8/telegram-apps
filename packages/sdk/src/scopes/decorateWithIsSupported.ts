import { supports } from '@/bridge/supports.js';
import { version } from '@/scopes/globals/globals.js';
import type { MethodName } from '@/bridge/methods/types/index.js';

export type WithIsSupported<F extends (...args: any) => any> = F & {
  /**
   * @returns True, if this function is supported.
   */
  isSupported(): boolean;
};

/**
 * Adds the "isSupported" method to the passed function returning true, if the current Mini Apps
 * version supports passed Mini Apps method.
 * @param fn - function to extend.
 * @param miniAppsMethod - Mini Apps method.
 * @param additionalCheck - additional function to be called along with method support.
 */

/*@__NO_SIDE_EFFECTS__*/
export function decorateWithIsSupported<F extends (...args: any) => any>(
  fn: F,
  method: MethodName,
  additionalCheck?: () => boolean,
): WithIsSupported<F> {
  return Object.assign(fn, {
    isSupported() {
      return supports(method, version()) && (!additionalCheck || additionalCheck());
    },
  });
}
