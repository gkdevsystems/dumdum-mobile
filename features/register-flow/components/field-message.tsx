import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';

type FieldMessageProps = {
  message?: string;
  type?: 'error' | 'warning' | 'info';
};

export function FieldMessage({ message, type = 'info' }: FieldMessageProps) {
  if (!message) return null;

  const styles =
    type === 'error'
      ? {
          icon: 'exclamation-circle' as const,
          iconColor: '#dc2626',
          textClass: 'text-red-600',
        }
      : type === 'warning'
        ? {
            icon: 'info-circle' as const,
            iconColor: '#d97706',
            textClass: 'text-amber-600',
          }
        : {
            icon: 'info-circle' as const,
            iconColor: 'rgb(var(--app-muted))',
            textClass: 'text-app-muted',
          };

  return (
    <View className="mt-1.5 flex-row items-start gap-2">
      <View className="pt-0.5">
        <FontAwesome name={styles.icon} size={12} color={styles.iconColor} />
      </View>
      <Text className={`flex-1 text-xs leading-5 ${styles.textClass}`}>{message}</Text>
    </View>
  );
}

