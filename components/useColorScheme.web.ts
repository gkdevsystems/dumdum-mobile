import { useAppTheme } from './theme/useAppTheme';

export function useColorScheme() {
  const { theme } = useAppTheme();
  return theme;
}
