import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CaretLeft, Storefront, MapPin, ArrowSquareOut } from 'phosphor-react-native';
import { semantic, textStyle, space, radius } from '@/design-system';
import { useColorScheme } from '@/lib/hooks';
import { sourcing } from '@/lib/data/sourcing';
import { fallIngredientDetails } from '@/lib/data/ingredients';

export default function SourceScreen() {
  const { resolve } = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const info = sourcing[id ?? ''];
  const ingredient = fallIngredientDetails.find((i) => i.id === id);

  if (!info || !ingredient) {
    return (
      <View style={[styles.container, { backgroundColor: resolve(semantic.bg.primary), paddingTop: insets.top }]}>
        <Text style={[textStyle.bodyMd, { color: resolve(semantic.text.secondary) }]}>
          Sourcing info not found.
        </Text>
      </View>
    );
  }

  const openDirections = (address: string) => {
    const encoded = encodeURIComponent(address);
    Linking.openURL(`https://maps.apple.com/?q=${encoded}`);
  };

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
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + space[8] }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[textStyle.headingLg, { color: resolve(semantic.text.primary) }]}>
          Where to get it
        </Text>

        {/* Grocery note */}
        <View style={[styles.groceryCard, { backgroundColor: resolve(semantic.bg.secondary) }]}>
          <View style={styles.groceryHeader}>
            <Storefront size={18} color={resolve(semantic.text.secondary)} weight="regular" />
            <Text style={[textStyle.headingSm, { color: resolve(semantic.text.primary) }]}>
              Grocery stores
            </Text>
            <View
              style={[
                styles.availabilityDot,
                {
                  backgroundColor: info.groceryAvailable
                    ? resolve(semantic.success.primary)
                    : resolve(semantic.text.quaternary),
                },
              ]}
            />
          </View>
          <Text style={[textStyle.bodyMd, { color: resolve(semantic.text.secondary) }]}>
            {info.groceryNote}
          </Text>
        </View>

        {/* Markets */}
        {info.markets.length > 0 && (
          <View style={styles.section}>
            <Text style={[textStyle.headingSm, { color: resolve(semantic.text.primary) }]}>
              Farmers markets
            </Text>
            <View style={styles.marketList}>
              {info.markets.map((market, i) => (
                <View
                  key={i}
                  style={[styles.marketCard, { backgroundColor: resolve(semantic.bg.secondary) }]}
                >
                  <View style={styles.marketHeader}>
                    <MapPin size={14} color={resolve(semantic.brand.primary)} weight="regular" />
                    <Text style={[textStyle.headingSm, styles.marketName, { color: resolve(semantic.text.primary) }]}>
                      {market.name}
                    </Text>
                    <Text style={[textStyle.labelSm, { color: resolve(semantic.text.tertiary) }]}>
                      {market.distanceMiles} mi
                    </Text>
                  </View>
                  <Text style={[textStyle.bodySm, { color: resolve(semantic.text.secondary) }]}>
                    {market.daysOpen}
                  </Text>
                  <Text style={[textStyle.bodySm, { color: resolve(semantic.text.tertiary) }]}>
                    {market.address}
                  </Text>
                  <TouchableOpacity
                    style={styles.directionsRow}
                    onPress={() => openDirections(market.address)}
                    hitSlop={8}
                  >
                    <ArrowSquareOut size={14} color={resolve(semantic.brand.primary)} weight="regular" />
                    <Text style={[textStyle.labelSm, { color: resolve(semantic.brand.primary) }]}>
                      Get directions
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    paddingHorizontal: space[4],
    paddingVertical: space[3],
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[1],
  },
  content: {
    paddingHorizontal: space[6],
    paddingTop: space[2],
    gap: space[6],
  },
  groceryCard: {
    borderRadius: radius.xl,
    padding: space[4],
    gap: space[3],
  },
  groceryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    marginLeft: 'auto',
  },
  section: {
    gap: space[3],
  },
  marketList: {
    gap: space[3],
  },
  marketCard: {
    borderRadius: radius.xl,
    padding: space[4],
    gap: space[2],
  },
  marketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
  },
  marketName: {
    flex: 1,
  },
  directionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[1],
    marginTop: space[1],
  },
});
