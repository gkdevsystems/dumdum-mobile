import { useAppTheme } from './theme/ThemeContext';

export function useColorScheme() {
  const { theme } = useAppTheme();
  return theme;
}
