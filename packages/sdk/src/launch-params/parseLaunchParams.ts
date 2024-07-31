import { initDataParser } from '@/scopes/init-data/initDataParser.js';
import { themeParamsParser } from '@/scopes/theme-params/themeParamsParser.js';
import { boolean } from '@/parsing/parsers/boolean.js';
import { searchParams } from '@/parsing/parsers/searchParams.js';
import { string } from '@/parsing/parsers/string.js';

import type { LaunchParams } from './types.js';

/**
 * Parses value as launch parameters.
 * @param value - value to parse.
 */
export function parseLaunchParams(value: unknown): LaunchParams {
  return searchParams({
    botInline: {
      type: boolean().optional(),
      from: 'tgWebAppBotInline',
    },
    initData: {
      type: initDataParser().optional(),
      from: 'tgWebAppData',
    },
    initDataRaw: {
      type: string().optional(),
      from: 'tgWebAppData',
    },
    platform: {
      type: string(),
      from: 'tgWebAppPlatform',
    },
    showSettings: {
      type: boolean().optional(),
      from: 'tgWebAppShowSettings',
    },
    startParam: {
      type: string().optional(),
      from: 'tgWebAppStartParam',
    },
    themeParams: {
      type: themeParamsParser(),
      from: 'tgWebAppThemeParams',
    },
    version: {
      type: string(),
      from: 'tgWebAppVersion',
    },
  }).parse(value);
}
