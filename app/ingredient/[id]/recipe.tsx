import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CaretLeft, Clock, CheckCircle } from 'phosphor-react-native';
import { semantic, textStyle, space, radius } from '@/design-system';
import { useColorScheme } from '@/lib/hooks';
import { recipes } from '@/lib/data/recipes';

export default function RecipeScreen() {
  const { resolve } = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const recipe = recipes[id ?? ''];

  if (!recipe) {
    return (
      <View style={[styles.container, { backgroundColor: resolve(semantic.bg.primary), paddingTop: insets.top }]}>
        <Text style={[textStyle.bodyMd, { color: resolve(semantic.text.secondary) }]}>
          Recipe not found.
        </Text>
      </View>
    );
  }

  const formattedTime =
    recipe.totalTimeMinutes >= 60
      ? `${Math.floor(recipe.totalTimeMinutes / 60)}h ${recipe.totalTimeMinutes % 60}m`
      : `${recipe.totalTimeMinutes} min`;

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
          <Text style={[textStyle.headingLg, { color: resolve(semantic.text.primary) }]}>
            {recipe.name}
          </Text>
          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <Clock size={14} color={resolve(semantic.text.tertiary)} weight="regular" />
              <Text style={[textStyle.labelSm, { color: resolve(semantic.text.tertiary) }]}>
                {formattedTime}
              </Text>
            </View>
            <View style={[styles.difficultyChip, { backgroundColor: resolve(semantic.fills.primary) }]}>
              <Text style={[textStyle.labelSm, { color: resolve(semantic.text.secondary) }]}>
                {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
              </Text>
            </View>
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={[textStyle.headingSm, { color: resolve(semantic.text.primary) }]}>
            Ingredients
          </Text>
          <View style={styles.ingredientList}>
            {recipe.ingredients.map((ing, i) => (
              <View key={i} style={styles.ingredientRow}>
                <View
                  style={[
                    styles.ingredientDot,
                    {
                      backgroundColor: ing.isSeasonal
                        ? resolve(semantic.brand.primary)
                        : resolve(semantic.border.primary),
                    },
                  ]}
                />
                <Text style={[textStyle.bodyMd, styles.ingredientName, { color: resolve(semantic.text.primary) }]}>
                  {ing.name}
                </Text>
                <Text style={[textStyle.bodyMd, { color: resolve(semantic.text.tertiary) }]}>
                  {ing.quantity}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Steps */}
        <View style={styles.section}>
          <Text style={[textStyle.headingSm, { color: resolve(semantic.text.primary) }]}>
            Steps
          </Text>
          <View style={styles.stepList}>
            {recipe.steps.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={[styles.stepNumber, { backgroundColor: resolve(semantic.brand.subtle) }]}>
                  <Text style={[textStyle.labelSm, { color: resolve(semantic.brand.primary) }]}>
                    {i + 1}
                  </Text>
                </View>
                <Text style={[textStyle.bodyMd, styles.stepText, { color: resolve(semantic.text.primary) }]}>
                  {step}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Done indicator */}
        <View style={styles.doneRow}>
          <CheckCircle size={16} color={resolve(semantic.success.primary)} weight="regular" />
          <Text style={[textStyle.bodySm, { color: resolve(semantic.text.tertiary) }]}>
            That's it. Enjoy.
          </Text>
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
    gap: space[8],
  },
  header: {
    gap: space[3],
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[1],
  },
  difficultyChip: {
    paddingHorizontal: space[2],
    paddingVertical: space[1],
    borderRadius: radius.full,
  },
  section: {
    gap: space[4],
  },
  ingredientList: {
    gap: space[3],
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
  },
  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    flexShrink: 0,
  },
  ingredientName: {
    flex: 1,
  },
  stepList: {
    gap: space[4],
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space[3],
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  stepText: {
    flex: 1,
    lineHeight: 22,
  },
  doneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
    justifyContent: 'center',
    paddingTop: space[2],
  },
});
