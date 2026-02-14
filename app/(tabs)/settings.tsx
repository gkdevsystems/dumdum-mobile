import { StyleSheet, Switch } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useAppTheme } from '@/components/theme/ThemeContext';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useAppTheme();
  const isDark = theme === 'dark';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
      <Text style={styles.current}>Current theme: {isDark ? 'Dark' : 'Light'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  label: {
    fontSize: 18,
  },
  current: {
    fontSize: 14,
    marginTop: 12,
    opacity: 0.8,
  },
});
