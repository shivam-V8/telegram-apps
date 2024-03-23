/* eslint-disable */
import { mergeProps, type Component } from 'solid-js';

import type { JSXIntrinsicElementAttrs } from '~/types/jsx.js';

export interface Lock28Props extends JSXIntrinsicElementAttrs<'svg'> {
  /**
   * Icon size. This is value will be passed to the SVG's width and height attributes.
   * @default 28
   */
  size?: JSXIntrinsicElementAttrs<'svg'>['width'];
}

export const Lock28: Component<Lock28Props> = (props) => {
  const merged = mergeProps({ size: 28 }, props);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" width={merged.size} height={merged.size} {...props}><path fill="currentColor" fill-rule="evenodd" d="M13.7 3.797a4.285 4.285 0 0 0-4.286 4.286v1.902h8.571V8.083A4.285 4.285 0 0 0 13.7 3.797m6.085 6.196v-1.91a6.085 6.085 0 0 0-12.17 0v1.952a3.9 3.9 0 0 0-3.265 3.57c-.01.14-.01.298-.01.52v5.843c0 .808 0 1.468.043 2.006.046.555.143 1.057.382 1.526a3.9 3.9 0 0 0 1.704 1.705c.469.239.971.336 1.527.38.537.045 1.198.045 2.006.045h7.942c.808 0 1.468 0 2.006-.044.555-.045 1.058-.142 1.526-.381a3.9 3.9 0 0 0 1.705-1.705c.239-.469.335-.97.38-1.526.045-.538.045-1.198.045-2.006v-5.369c0-.66 0-1.133-.09-1.546a3.9 3.9 0 0 0-2.979-2.979 4 4 0 0 0-.752-.081m.369 1.84c-.198-.043-.459-.048-1.269-.048H8.515c-.271 0-.36 0-.426.005a2.1 2.1 0 0 0-1.944 1.944 7 7 0 0 0-.005.426v5.77c0 .855 0 1.442.037 1.897.037.444.103.683.191.856a2.1 2.1 0 0 0 .918.918c.173.088.412.155.856.19.456.038 1.043.039 1.898.039h7.866c.855 0 1.442 0 1.897-.038.444-.036.683-.103.856-.191a2.1 2.1 0 0 0 .918-.918c.088-.173.155-.412.19-.856.038-.455.039-1.042.039-1.897v-5.224c0-.81-.005-1.072-.049-1.269a2.1 2.1 0 0 0-1.604-1.604" clip-rule="evenodd"/><path fill="currentColor" d="M15.72 17.808c0 .953-.782 1.724-1.747 1.724a1.736 1.736 0 0 1-1.747-1.724c0-.952.782-1.724 1.747-1.724s1.747.772 1.747 1.724"/></svg>
  );
}