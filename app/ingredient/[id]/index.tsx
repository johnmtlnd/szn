import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CaretLeft, BookOpen, MapPin } from 'phosphor-react-native';
import { semantic, textStyle, space, radius } from '@/design-system';
import { useColorScheme } from '@/lib/hooks';
import { fallIngredientDetails } from '@/lib/data/ingredients';

const BADGE_CONFIG = {
  peak: { bg: semantic.success.subtle, fg: semantic.success.primary, label: 'Peak' },
  available: { bg: semantic.info.subtle, fg: semantic.info.primary, label: 'Available' },
  ending: { bg: semantic.warning.subtle, fg: semantic.warning.primary, label: 'Ending soon' },
} as const;

export default function IngredientDetailScreen() {
  const { resolve } = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const ingredient = fallIngredientDetails.find((i) => i.id === id);

  if (!ingredient) {
    return (
      <View style={[styles.container, { backgroundColor: resolve(semantic.bg.primary), paddingTop: insets.top }]}>
        <Text style={[textStyle.bodyMd, { color: resolve(semantic.text.secondary) }]}>
          Ingredient not found.
        </Text>
      </View>
    );
  }

  const badge = BADGE_CONFIG[ingredient.status];

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
        {/* Header */}
        <View style={styles.header}>
          <Text style={[textStyle.displaySm, { color: resolve(semantic.text.primary) }]}>
            {ingredient.name}
          </Text>
          <View style={[styles.badge, { backgroundColor: resolve(badge.bg) }]}>
            <Text style={[textStyle.labelSm, { color: resolve(badge.fg) }]}>
              {badge.label}
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text style={[textStyle.bodyLg, styles.description, { color: resolve(semantic.text.secondary) }]}>
          {ingredient.description}
        </Text>

        {/* Info cards */}
        <View style={styles.infoCards}>
          <View style={[styles.infoCard, { backgroundColor: resolve(semantic.bg.secondary) }]}>
            <Text style={[textStyle.labelSm, styles.infoLabel, { color: resolve(semantic.text.tertiary) }]}>
              HOW TO PICK
            </Text>
            <Text style={[textStyle.bodyMd, { color: resolve(semantic.text.primary) }]}>
              {ingredient.howToPick}
            </Text>
          </View>
          <View style={[styles.infoCard, { backgroundColor: resolve(semantic.bg.secondary) }]}>
            <Text style={[textStyle.labelSm, styles.infoLabel, { color: resolve(semantic.text.tertiary) }]}>
              HOW TO STORE
            </Text>
            <Text style={[textStyle.bodyMd, { color: resolve(semantic.text.primary) }]}>
              {ingredient.howToStore}
            </Text>
          </View>
        </View>

        {/* CTAs */}
        <View style={styles.ctaGroup}>
          <TouchableOpacity
            style={[styles.ctaPrimary, { backgroundColor: resolve(semantic.brand.primary) }]}
            onPress={() => router.push({ pathname: '/ingredient/[id]/recipe', params: { id: ingredient.id } })}
            activeOpacity={0.8}
          >
            <BookOpen size={18} color={resolve(semantic.text.alwaysLight)} weight="regular" />
            <Text style={[textStyle.labelLg, { color: resolve(semantic.text.alwaysLight) }]}>
              See a recipe
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.ctaSecondary, { borderColor: resolve(semantic.border.primary) }]}
            onPress={() => router.push({ pathname: '/ingredient/[id]/source', params: { id: ingredient.id } })}
            activeOpacity={0.7}
          >
            <MapPin size={18} color={resolve(semantic.text.secondary)} weight="regular" />
            <Text style={[textStyle.labelLg, { color: resolve(semantic.text.secondary) }]}>
              Where to get it
            </Text>
          </TouchableOpacity>
        </View>
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
  header: {
    gap: space[3],
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: space[3],
    paddingVertical: space[1],
    borderRadius: radius.full,
  },
  description: {
    lineHeight: 26,
  },
  infoCards: {
    gap: space[3],
  },
  infoCard: {
    borderRadius: radius.xl,
    padding: space[4],
    gap: space[2],
  },
  infoLabel: {
    letterSpacing: 0.8,
  },
  ctaGroup: {
    gap: space[3],
    marginTop: space[2],
  },
  ctaPrimary: {
    height: 52,
    borderRadius: radius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[2],
  },
  ctaSecondary: {
    height: 52,
    borderRadius: radius.xl,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[2],
  },
});
