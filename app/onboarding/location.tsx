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
import { MapPin } from 'phosphor-react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { semantic, textStyle, space, radius } from '@/design-system';
import { useColorScheme } from '@/lib/hooks';
import { useLocationStore } from '@/lib/store/location';

type Mode = 'prompt' | 'manual' | 'loading';

export default function LocationScreen() {
  const { resolve } = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { setLocation, setManualLocation } = useLocationStore();
  const [mode, setMode] = useState<Mode>('prompt');
  const [manualInput, setManualInput] = useState('');
  const [error, setError] = useState('');

  const completeOnboarding = async () => {
    await AsyncStorage.setItem('onboardingComplete', 'true');
    router.replace('/');
  };

  const handleAllowLocation = async () => {
    setMode('loading');
    setError('');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setMode('manual');
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
      await completeOnboarding();
    } catch {
      setMode('manual');
      setError('Couldn\'t get your location. Enter it manually.');
    }
  };

  const handleManualConfirm = async () => {
    const trimmed = manualInput.trim();
    if (!trimmed) {
      setError('Please enter a city or zip code.');
      return;
    }
    await setManualLocation(trimmed);
    await completeOnboarding();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: resolve(semantic.bg.primary),
            paddingTop: insets.top + space[8],
            paddingBottom: insets.bottom + space[6],
          },
        ]}
      >
        <View style={styles.body}>
          <View style={[styles.iconWrap, { backgroundColor: resolve(semantic.brand.subtle) }]}>
            <MapPin size={28} color={resolve(semantic.brand.primary)} weight="regular" />
          </View>

          <Text style={[textStyle.headingLg, { color: resolve(semantic.text.primary) }]}>
            Where are you?
          </Text>
          <Text style={[textStyle.bodyLg, styles.copy, { color: resolve(semantic.text.secondary) }]}>
            We use your location to show what's growing near you. We don't store or share it.
          </Text>

          {error !== '' && (
            <Text style={[textStyle.bodySm, { color: resolve(semantic.error.primary) }]}>
              {error}
            </Text>
          )}
        </View>

        <View style={styles.actions}>
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
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: resolve(semantic.brand.primary) }]}
                onPress={handleAllowLocation}
                activeOpacity={0.8}
              >
                <Text style={[textStyle.labelLg, { color: resolve(semantic.text.alwaysLight) }]}>
                  Allow Location
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnSecondary, { borderColor: resolve(semantic.border.primary) }]}
                onPress={() => setMode('manual')}
                activeOpacity={0.7}
              >
                <Text style={[textStyle.labelLg, { color: resolve(semantic.text.secondary) }]}>
                  Enter manually
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: space[6],
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    gap: space[4],
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space[2],
  },
  copy: {
    lineHeight: 26,
  },
  actions: {
    gap: space[3],
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
  btnSecondary: {
    height: 52,
    borderRadius: radius.xl,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
