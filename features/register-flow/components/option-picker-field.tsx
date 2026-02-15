import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { FieldMessage } from '@/features/register-flow/components/field-message';
import type { Option } from '@/features/register-flow/types';

type OptionPickerFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  icon?: string;
  error?: string;
  hint?: string;
};

export function OptionPickerField({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  icon = 'list-ul',
  error,
  hint,
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
      <Label className="mb-2">{label}</Label>
      <Pressable
        className={`flex-row items-center justify-between rounded-2xl border bg-app-card px-4 py-4 ${error ? 'border-red-500' : 'border-app-border'}`}
        onPress={() => setOpen(true)}>
        <View className="flex-row items-center">
          <FontAwesome name={icon as any} size={13} color="rgb(var(--app-muted))" />
          <Text className={`ml-2 ${selectedLabel ? 'text-app-foreground' : 'text-app-muted'}`}>
            {selectedLabel || placeholder}
          </Text>
        </View>
        <FontAwesome name="chevron-down" size={13} color="rgb(var(--app-muted))" />
      </Pressable>
      <FieldMessage type="info" message={!error ? hint : undefined} />
      <FieldMessage type="error" message={error} />

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="max-h-[85%] rounded-t-3xl bg-app-background px-5 pb-10 pt-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-app-foreground">{label}</Text>
              <Button variant="ghost" onPress={() => setOpen(false)} className="h-8 px-2">
                <Text className="text-app-primary">Close</Text>
              </Button>
            </View>

            <Input
              value={query}
              onChangeText={setQuery}
              placeholder="Search..."
              className="mb-3 h-12 rounded-2xl border-app-border bg-app-card text-app-foreground"
            />

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const isSelected = value === item.value;
                return (
                  <Pressable
                    onPress={() => {
                      onChange(item.value);
                      setOpen(false);
                      setQuery('');
                    }}>
                    <Card
                      className={`mb-2 rounded-2xl border px-4 py-3.5 ${isSelected ? 'border-app-primary bg-app-primary/10' : 'border-app-border bg-app-card'}`}>
                      <Text className={isSelected ? 'font-semibold text-app-primary' : 'text-app-foreground'}>{item.label}</Text>
                    </Card>
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
