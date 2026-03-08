import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, Sun, ForkKnife } from 'phosphor-react-native';
import { semantic, textStyle, space, radius } from '@/design-system';
import { useColorScheme } from '@/lib/hooks';

const STEPS = [
  {
    icon: MapPin,
    label: 'Share your location',
    description: 'We find what\'s growing near you.',
  },
  {
    icon: Sun,
    label: 'See what\'s in season',
    description: 'A short, curated list — not a wall of content.',
  },
  {
    icon: ForkKnife,
    label: 'Cook something good',
    description: 'One recipe, clearly presented. Make it tonight.',
  },
] as const;

export default function ValueScreen() {
  const { resolve } = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleContinue = () => router.push('/onboarding/location');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: resolve(semantic.bg.primary),
          paddingTop: insets.top + space[2],
          paddingBottom: insets.bottom + space[6],
        },
      ]}
    >
      {/* Skip */}
      <View style={styles.topRow}>
        <TouchableOpacity onPress={handleContinue} hitSlop={16}>
          <Text style={[textStyle.labelLg, { color: resolve(semantic.text.tertiary) }]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={[textStyle.headingLg, styles.heading, { color: resolve(semantic.text.primary) }]}>
          Your kitchen,{'\n'}in season.
        </Text>

        <View style={styles.steps}>
          {STEPS.map(({ icon: Icon, label, description }, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={[styles.stepIcon, { backgroundColor: resolve(semantic.brand.subtle) }]}>
                <Icon size={20} color={resolve(semantic.brand.primary)} weight="regular" />
              </View>
              <View style={styles.stepText}>
                <Text style={[textStyle.headingSm, { color: resolve(semantic.text.primary) }]}>
                  {label}
                </Text>
                <Text style={[textStyle.bodyMd, { color: resolve(semantic.text.secondary) }]}>
                  {description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={[styles.cta, { backgroundColor: resolve(semantic.brand.primary) }]}
        onPress={handleContinue}
        activeOpacity={0.8}
      >
        <Text style={[textStyle.labelLg, { color: resolve(semantic.text.alwaysLight) }]}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: space[6],
  },
  topRow: {
    alignItems: 'flex-end',
    paddingVertical: space[3],
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    gap: space[10],
  },
  heading: {
    lineHeight: 38,
  },
  steps: {
    gap: space[6],
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space[4],
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepText: {
    flex: 1,
    gap: space[1],
  },
  cta: {
    height: 52,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
