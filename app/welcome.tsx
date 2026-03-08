import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Leaf } from 'phosphor-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { semantic, textStyle, space, radius } from '@/design-system';
import { useColorScheme } from '@/lib/hooks';

export default function WelcomeScreen() {
  const { resolve } = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleGetStarted = async () => {
    const done = await AsyncStorage.getItem('onboardingComplete');
    if (done === 'true') {
      router.replace('/');
    } else {
      router.push('/onboarding/value');
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: resolve(semantic.bg.primary),
          paddingTop: insets.top,
          paddingBottom: insets.bottom + space[6],
        },
      ]}
    >
      <View style={styles.hero}>
        <View style={[styles.iconWrap, { backgroundColor: resolve(semantic.brand.subtle) }]}>
          <Leaf size={32} color={resolve(semantic.brand.primary)} weight="regular" />
        </View>
        <Text style={[textStyle.displaySm, styles.wordmark, { color: resolve(semantic.text.primary) }]}>
          Szn
        </Text>
        <Text style={[textStyle.bodyLg, styles.tagline, { color: resolve(semantic.text.secondary) }]}>
          What's in season near you, right now.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.cta, { backgroundColor: resolve(semantic.brand.primary) }]}
        onPress={handleGetStarted}
        activeOpacity={0.8}
      >
        <Text style={[textStyle.labelLg, { color: resolve(semantic.text.alwaysLight) }]}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: space[6],
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[4],
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space[2],
  },
  wordmark: {
    textAlign: 'center',
  },
  tagline: {
    textAlign: 'center',
  },
  cta: {
    height: 52,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
