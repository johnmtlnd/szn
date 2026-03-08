import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { semantic, textStyle, space, radius } from '@/design-system';
import { useColorScheme } from '@/lib/hooks';
import type { Ingredient } from '@/lib/data/ingredients';

type Props = {
  ingredient: Ingredient;
  onPress: () => void;
};

const BADGE_CONFIG = {
  peak: {
    bg: semantic.success.subtle,
    fg: semantic.success.primary,
    label: 'Peak',
  },
  available: {
    bg: semantic.info.subtle,
    fg: semantic.info.primary,
    label: 'Available',
  },
  ending: {
    bg: semantic.warning.subtle,
    fg: semantic.warning.primary,
    label: 'Ending soon',
  },
} as const;

export function IngredientCard({ ingredient, onPress }: Props) {
  const { resolve } = useColorScheme();
  const badge = BADGE_CONFIG[ingredient.status];

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: resolve(semantic.bg.secondary) }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.nameRow}>
        <Text
          style={[textStyle.headingSm, styles.name, { color: resolve(semantic.text.primary) }]}
          numberOfLines={1}
        >
          {ingredient.name}
        </Text>
        <View style={[styles.badge, { backgroundColor: resolve(badge.bg) }]}>
          <Text style={[textStyle.labelSm, { color: resolve(badge.fg) }]}>
            {badge.label}
          </Text>
        </View>
      </View>
      <Text style={[textStyle.bodyMd, { color: resolve(semantic.text.secondary) }]}>
        {ingredient.descriptor}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    padding: space[4],
    gap: space[2],
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
  },
  name: {
    flex: 1,
  },
  badge: {
    paddingHorizontal: space[2],
    paddingVertical: space[1],
    borderRadius: radius.full,
  },
});
