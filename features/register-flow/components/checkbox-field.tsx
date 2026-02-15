import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, Text, View } from 'react-native';

type CheckboxFieldProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function CheckboxField({ label, checked, onChange }: CheckboxFieldProps) {
  return (
    <Pressable
      className="mb-4 flex-row items-center rounded-2xl border border-app-border bg-app-card px-4 py-3"
      onPress={() => onChange(!checked)}>
      <View className={`mr-3 h-5 w-5 items-center justify-center rounded border ${checked ? 'border-rose-500 bg-rose-500' : 'border-app-muted'}`}>
        {checked ? <FontAwesome name="check" size={12} color="#fff" /> : null}
      </View>
      <Text className="flex-1 text-sm text-app-foreground">{label}</Text>
    </Pressable>
  );
}

