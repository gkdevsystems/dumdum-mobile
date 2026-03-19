import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { FieldMessage } from '@/features/register-flow/components/field-message';

type MapLocationPickerProps = {
  latitude: number | null;
  longitude: number | null;
  onChange: (latitude: number, longitude: number) => void;
  error?: string;
  hint?: string;
};

function toLatitude(y: number, height: number) {
  const latitude = 90 - (y / height) * 180;
  return Number(Math.max(-90, Math.min(90, latitude)).toFixed(5));
}

function toLongitude(x: number, width: number) {
  const longitude = (x / width) * 360 - 180;
  return Number(Math.max(-180, Math.min(180, longitude)).toFixed(5));
}

function toPinPosition(
  latitude: number,
  longitude: number,
  width: number,
  height: number
) {
  const left = ((longitude + 180) / 360) * width;
  const top = ((90 - latitude) / 180) * height;
  return { left, top };
}

export function MapLocationPicker({
  latitude,
  longitude,
  onChange,
  error,
  hint,
}: MapLocationPickerProps) {
  const [layoutSize, setLayoutSize] = useState({ width: 1, height: 1 });

  const pinStyle = useMemo(() => {
    if (latitude === null || longitude === null) return null;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
    return toPinPosition(latitude, longitude, layoutSize.width, layoutSize.height);
  }, [latitude, longitude, layoutSize.height, layoutSize.width]);

  return (
    <View className="mb-5">
      <Label className="mb-2 text-[13px] uppercase tracking-[1px] text-app-muted">
        Approximate map location
      </Label>

      <Pressable
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setLayoutSize({ width, height });
        }}
        className={`relative h-56 overflow-hidden rounded-3xl border ${error ? 'border-red-500' : 'border-app-border'}`}
        onPress={(event) => {
          const x = Number(event.nativeEvent.locationX);
          const y = Number(event.nativeEvent.locationY);
          if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return;
          }
          if (layoutSize.width <= 0 || layoutSize.height <= 0) {
            return;
          }
          const nextLatitude = toLatitude(y, layoutSize.height);
          const nextLongitude = toLongitude(x, layoutSize.width);
          if (!Number.isFinite(nextLatitude) || !Number.isFinite(nextLongitude)) {
            return;
          }
          onChange(nextLatitude, nextLongitude);
        }}>
        <View className="absolute inset-0 bg-[#0e1a2f]" />
        <View className="absolute inset-0 bg-app-primary/20" />
        <View className="absolute inset-x-0 top-1/2 h-px bg-white/20" />
        <View className="absolute inset-y-0 left-1/2 w-px bg-white/20" />
        <View className="absolute left-[15%] top-[30%] h-16 w-20 rounded-full bg-white/15" />
        <View className="absolute right-[18%] top-[48%] h-20 w-24 rounded-full bg-white/10" />
        <View className="absolute bottom-[18%] left-[28%] h-14 w-16 rounded-full bg-white/12" />

        {pinStyle ? (
          <View className="absolute -ml-3 -mt-6" style={pinStyle}>
            <View className="size-6 items-center justify-center rounded-full bg-app-primary shadow shadow-black/30">
              <FontAwesome name="map-marker" size={12} color="#ffffff" />
            </View>
          </View>
        ) : (
          <View className="absolute inset-0 items-center justify-center">
            <View className="rounded-full bg-black/35 px-3 py-1.5">
              <Text className="text-xs font-semibold text-white">Tap to place pin</Text>
            </View>
          </View>
        )}
      </Pressable>

      {latitude !== null && longitude !== null ? (
        <Text className="mt-2 text-xs text-app-muted">
          Latitude: {latitude.toFixed(5)} | Longitude: {longitude.toFixed(5)}
        </Text>
      ) : null}

      <FieldMessage type="info" message={!error ? hint : undefined} />
      <FieldMessage type="error" message={error} />
    </View>
  );
}
