import type { RGB } from '@/colors/types.js';

export interface State {
  /**
   * The main button background color.
   */
  backgroundColor: RGB;
  /**
   * True if the main button is currently clickable.
   */
  isActive: boolean;
  /**
   * True if the main button loader is visible.
   */
  isLoaderVisible: boolean;
  /**
   * True if the main button is visible.
   */
  isVisible: boolean;
  /**
   * The main button text.
   */
  text: string;
  /**
   * The main button text color.
   */
  textColor: RGB;
}