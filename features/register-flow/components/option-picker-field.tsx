import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, Text, TextInput, View } from 'react-native';

import type { Option } from '@/features/register-flow/types';

type OptionPickerFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
};

export function OptionPickerField({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
}: OptionPickerFieldProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selectedLabel = useMemo(() => options.find((item) => item.value === value)?.label ?? '', [options, value]);
  const filteredOptions = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return options;
    return options.filter((item) => item.label.toLowerCase().includes(keyword));
  }, [options, query]);

  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-app-foreground">{label}</Text>
      <Pressable
        className="flex-row items-center justify-between rounded-2xl border border-app-border bg-app-card px-4 py-3"
        onPress={() => setOpen(true)}>
        <Text className={selectedLabel ? 'text-app-foreground' : 'text-app-muted'}>
          {selectedLabel || placeholder}
        </Text>
        <FontAwesome name="chevron-down" size={13} color="rgb(var(--app-muted))" />
      </Pressable>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="max-h-[85%] rounded-t-3xl bg-app-background px-5 pb-10 pt-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-app-foreground">{label}</Text>
              <Pressable onPress={() => setOpen(false)}>
                <Text className="text-sm font-semibold text-rose-500">Close</Text>
              </Pressable>
            </View>

            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search..."
              placeholderTextColor="rgb(var(--app-muted))"
              className="mb-3 rounded-2xl border border-app-border bg-app-card px-4 py-3 text-app-foreground"
            />

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const isSelected = value === item.value;
                return (
                  <Pressable
                    className={`mb-2 rounded-2xl border px-4 py-3 ${isSelected ? 'border-rose-500 bg-rose-500/10' : 'border-app-border bg-app-card'}`}
                    onPress={() => {
                      onChange(item.value);
                      setOpen(false);
                      setQuery('');
                    }}>
                    <Text className={isSelected ? 'font-semibold text-rose-500' : 'text-app-foreground'}>{item.label}</Text>
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

