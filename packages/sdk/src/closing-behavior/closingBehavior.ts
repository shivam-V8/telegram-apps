import { postEvent } from '@/globals/globals.js';
import { getStorageValue, setStorageValue } from '@/storage/storage.js';
import { isPageReload } from '@/navigation/isPageReload.js';
import { computed } from '@/signals/computed/computed.js';

import * as _ from './closingBehavior.private.js';

/*
 * fixme
 * @see Usage: https://docs.telegram-mini-apps.com/platform/closing-behavior
 * @see API: https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/components/closing-behavior
 */

const STORAGE_KEY = 'closingBehavior';

/**
 * True if the confirmation dialog should be shown while the user is trying to close the Mini App.
 */
const isConfirmationNeeded = computed(_.isConfirmationNeeded);

/**
 * True if the component is currently mounted.
 */
const isMounted = computed(_.isMounted);

/**
 * Disables the confirmation dialog when closing the Mini App.
 */
function disableConfirmation(): void {
  _.isConfirmationNeeded.set(false);
}

/**
 * Enables the confirmation dialog when closing the Mini App.
 */
function enableConfirmation() {
  _.isConfirmationNeeded.set(true);
}

/**
 * Mounts the component.
 */
function mount(): void {
  if (!_.isMounted()) {
    _.isConfirmationNeeded.set(isPageReload() && getStorageValue(STORAGE_KEY) || false);
    _.isConfirmationNeeded.sub(onStateChanged);
    _.isMounted.set(true);
  }
}

function onStateChanged(value: boolean): void {
  postEvent()('web_app_setup_closing_behavior', { need_confirmation: value });
  setStorageValue(STORAGE_KEY, value);
}

/**
 * Unmounts the component.
 */
function unmount(): void {
  _.isConfirmationNeeded.unsub(onStateChanged);
  _.isMounted.set(false);
}

export {
  disableConfirmation,
  enableConfirmation,
  isMounted,
  isConfirmationNeeded,
  mount,
  unmount,
};
