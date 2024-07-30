import { on } from '@/bridge/events/listening/on.js';
import { off } from '@/bridge/events/listening/off.js';
import { isPageReload } from '@/navigation/isPageReload.js';
import { getStorageValue, setStorageValue } from '@/storage/storage.js';
import { decorateWithSupports, type WithSupports } from '@/components/decorateWithSupports.js';
import { postEvent } from '@/globals/globals.js';
import { computed } from '@/signals/computed/computed.js';
import type { MiniAppsEventListener } from '@/bridge/events/types.js';
import type { RemoveEventListenerFn } from '@/events/types.js';

import * as _ from './backButton.private.js';

/*
 * fixme
 * @see Usage: https://docs.telegram-mini-apps.com/platform/back-button
 * @see API: https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/components/back-button
 */

const MINI_APPS_METHOD = 'web_app_setup_back_button';
const CLICK_EVENT = 'back_button_pressed';
const STORAGE_KEY = 'backButton';

/**
 * Hides the back button.
 */
const hide: WithSupports<() => void> = decorateWithSupports(() => {
  _.isVisible.set(false);
}, MINI_APPS_METHOD);

/**
 * True if the component is currently visible.
 */
const isVisible = computed(_.isVisible);

/**
 * True if the component is currently mounted.
 */
const isMounted = computed(_.isMounted);

/**
 * Mounts the component.
 */
function mount(): void {
  if (!_.isMounted()) {
    _.isVisible.set(isPageReload() && getStorageValue(STORAGE_KEY) || false);
    _.isVisible.sub(onStateChanged);
    _.isMounted.set(true);
  }
}

function onStateChanged(isVisible: boolean) {
  postEvent()(MINI_APPS_METHOD, { is_visible: isVisible });
  setStorageValue(STORAGE_KEY, isVisible);
}

/**
 * Add a new back button click listener.
 * @param fn - event listener.
 * @returns A function to remove bound listener.
 */
function onClick(fn: MiniAppsEventListener<'back_button_pressed'>): RemoveEventListenerFn {
  return on(CLICK_EVENT, fn);
}

/**
 * Removes the back button click listener.
 * @param fn - an event listener.
 */
function offClick(fn: MiniAppsEventListener<'back_button_pressed'>): void {
  off(CLICK_EVENT, fn);
}

/**
 * Shows the back button.
 */
const show: WithSupports<() => void> = decorateWithSupports(() => {
  _.isVisible.set(true);
}, MINI_APPS_METHOD);

/**
 * Unmounts the component.
 */
function unmount() {
  _.isVisible.unsub(onStateChanged);
  _.isMounted.set(false);
}

export {
  hide,
  isVisible,
  isMounted,
  mount,
  onClick,
  offClick,
  show,
  unmount,
};