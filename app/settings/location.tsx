import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CaretLeft, MapPin, Keyboard } from 'phosphor-react-native';
import * as Location from 'expo-location';
import { semantic, textStyle, space, radius } from '@/design-system';
import { useColorScheme } from '@/lib/hooks';
import { useLocationStore } from '@/lib/store/location';

type Mode = 'options' | 'manual' | 'loading';

export default function LocationEditScreen() {
  const { resolve } = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const regionName = useLocationStore((s) => s.regionName);
  const { setLocation, setManualLocation } = useLocationStore();
  const [mode, setMode] = useState<Mode>('options');
  const [manualInput, setManualInput] = useState('');
  const [error, setError] = useState('');

  const handleGPS = async () => {
    setMode('loading');
    setError('');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied.');
        setMode('options');
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const [geocoded] = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      const cityName =
        geocoded?.city ?? geocoded?.subregion ?? geocoded?.region ?? 'Your area';
      await setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        regionName: cityName,
        source: 'gps',
      });
      router.back();
    } catch {
      setError('Couldn\'t get your location. Try entering it manually.');
      setMode('options');
    }
  };

  const handleManualConfirm = async () => {
    const trimmed = manualInput.trim();
    if (!trimmed) {
      setError('Please enter a city or zip code.');
      return;
    }
    await setManualLocation(trimmed);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: resolve(semantic.bg.primary), paddingTop: insets.top },
        ]}
      >
        {/* Nav bar */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={16} style={styles.backBtn}>
            <CaretLeft size={20} color={resolve(semantic.text.primary)} weight="regular" />
            <Text style={[textStyle.bodyMd, { color: resolve(semantic.text.primary) }]}>
              Back
            </Text>
          </TouchableOpacity>
          <Text style={[textStyle.headingSm, { color: resolve(semantic.text.primary) }]}>
            Location
          </Text>
          <View style={styles.navSpacer} />
        </View>

        <View style={[styles.content, { paddingBottom: insets.bottom + space[6] }]}>
          {/* Current */}
          <View style={[styles.currentRow, { backgroundColor: resolve(semantic.bg.secondary) }]}>
            <MapPin size={16} color={resolve(semantic.text.tertiary)} weight="regular" />
            <Text style={[textStyle.bodySm, { color: resolve(semantic.text.tertiary) }]}>
              Current: {regionName}
            </Text>
          </View>

          {error !== '' && (
            <Text style={[textStyle.bodySm, { color: resolve(semantic.error.primary) }]}>
              {error}
            </Text>
          )}

          {mode === 'loading' ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color={resolve(semantic.brand.primary)} />
              <Text style={[textStyle.bodyMd, { color: resolve(semantic.text.secondary) }]}>
                Getting your location…
              </Text>
            </View>
          ) : mode === 'manual' ? (
            <View style={styles.manualGroup}>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: resolve(semantic.bg.secondary),
                    borderColor: resolve(semantic.border.primary),
                    color: resolve(semantic.text.primary),
                    fontFamily: 'Geist',
                  },
                ]}
                placeholder="City or zip code"
                placeholderTextColor={resolve(semantic.text.quaternary)}
                value={manualInput}
                onChangeText={setManualInput}
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleManualConfirm}
              />
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: resolve(semantic.brand.primary) }]}
                onPress={handleManualConfirm}
                activeOpacity={0.8}
              >
                <Text style={[textStyle.labelLg, { color: resolve(semantic.text.alwaysLight) }]}>
                  Confirm
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMode('options')} hitSlop={8}>
                <Text style={[textStyle.labelSm, styles.cancelText, { color: resolve(semantic.text.tertiary) }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.optionList}>
              <TouchableOpacity
                style={[styles.optionRow, { backgroundColor: resolve(semantic.bg.secondary) }]}
                onPress={handleGPS}
                activeOpacity={0.7}
              >
                <MapPin size={20} color={resolve(semantic.brand.primary)} weight="regular" />
                <Text style={[textStyle.bodyMd, styles.optionLabel, { color: resolve(semantic.text.primary) }]}>
                  Use my current location
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionRow, { backgroundColor: resolve(semantic.bg.secondary) }]}
                onPress={() => setMode('manual')}
                activeOpacity={0.7}
              >
                <Keyboard size={20} color={resolve(semantic.text.secondary)} weight="regular" />
                <Text style={[textStyle.bodyMd, styles.optionLabel, { color: resolve(semantic.text.primary) }]}>
                  Enter a location
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space[4],
    paddingVertical: space[3],
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[1],
    minWidth: 60,
  },
  navSpacer: {
    minWidth: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: space[4],
    paddingTop: space[4],
    gap: space[4],
  },
  currentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
    paddingHorizontal: space[4],
    paddingVertical: space[3],
    borderRadius: radius.xl,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[3],
    height: 52,
  },
  manualGroup: {
    gap: space[3],
  },
  input: {
    height: 52,
    borderRadius: radius.xl,
    borderWidth: 1,
    paddingHorizontal: space[4],
    fontSize: 15,
  },
  btn: {
    height: 52,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    textAlign: 'center',
  },
  optionList: {
    gap: space[3],
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    borderRadius: radius.xl,
    padding: space[4],
  },
  optionLabel: {
    flex: 1,
  },
});
