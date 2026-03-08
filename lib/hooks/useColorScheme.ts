import { useColorScheme as useRNColorScheme } from 'react-native';
import type { ColorToken } from '@/design-system';

export function useColorScheme() {
  const scheme = useRNColorScheme();
  const mode = scheme ?? 'light';

  function resolve(token: ColorToken): string {
    return token[mode];
  }

  return { mode, resolve };
}
