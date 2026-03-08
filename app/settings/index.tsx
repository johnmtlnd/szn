import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CaretLeft, MapPin, CaretRight, ShieldCheck } from 'phosphor-react-native';
import { semantic, textStyle, space, radius } from '@/design-system';
import { useColorScheme } from '@/lib/hooks';
import { useLocationStore } from '@/lib/store/location';

export default function SettingsScreen() {
  const { resolve } = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const regionName = useLocationStore((s) => s.regionName);

  return (
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
          Settings
        </Text>
        <View style={styles.navSpacer} />
      </View>

      <View style={[styles.content, { paddingBottom: insets.bottom + space[6] }]}>
        {/* Location section */}
        <View style={styles.section}>
          <Text style={[textStyle.labelSm, styles.sectionLabel, { color: resolve(semantic.text.tertiary) }]}>
            LOCATION
          </Text>
          <TouchableOpacity
            style={[styles.row, { backgroundColor: resolve(semantic.bg.secondary) }]}
            onPress={() => router.push('/settings/location')}
            activeOpacity={0.7}
          >
            <MapPin size={18} color={resolve(semantic.brand.primary)} weight="regular" />
            <Text style={[textStyle.bodyMd, styles.rowLabel, { color: resolve(semantic.text.primary) }]}>
              {regionName}
            </Text>
            <CaretRight size={16} color={resolve(semantic.text.quaternary)} weight="regular" />
          </TouchableOpacity>
        </View>

        {/* About section */}
        <View style={styles.section}>
          <Text style={[textStyle.labelSm, styles.sectionLabel, { color: resolve(semantic.text.tertiary) }]}>
            ABOUT
          </Text>
          <View style={[styles.aboutCard, { backgroundColor: resolve(semantic.bg.secondary) }]}>
            <View style={styles.aboutRow}>
              <Text style={[textStyle.bodyMd, { color: resolve(semantic.text.secondary) }]}>
                Version
              </Text>
              <Text style={[textStyle.bodyMd, { color: resolve(semantic.text.tertiary) }]}>
                0.1.0
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: resolve(semantic.border.primary) }]} />
            <View style={styles.privacyRow}>
              <ShieldCheck size={16} color={resolve(semantic.text.tertiary)} weight="regular" />
              <Text style={[textStyle.bodySm, { color: resolve(semantic.text.tertiary) }]}>
                We don't store or share your location.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
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
    gap: space[6],
  },
  section: {
    gap: space[2],
  },
  sectionLabel: {
    letterSpacing: 0.8,
    paddingHorizontal: space[2],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.xl,
    padding: space[4],
    gap: space[3],
  },
  rowLabel: {
    flex: 1,
  },
  aboutCard: {
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: space[4],
  },
  divider: {
    height: 1,
    marginHorizontal: space[4],
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
    padding: space[4],
  },
});
