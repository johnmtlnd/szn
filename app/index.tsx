import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, Leaf } from 'phosphor-react-native';
import { semantic, textStyle, space, radius } from '@/design-system';
import { useColorScheme } from '@/lib/hooks';
import { IngredientCard } from '@/components/composed/IngredientCard';
import { fallIngredients } from '@/lib/data/ingredients';
import { useLocationStore } from '@/lib/store/location';

export default function HomeScreen() {
  const { resolve } = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const regionName = useLocationStore((s) => s.regionName);
  const [isLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const ingredients = fallIngredients;

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: resolve(semantic.bg.primary),
          paddingTop: insets.top,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[textStyle.headingMd, { color: resolve(semantic.text.primary) }]}>
          Szn
        </Text>
        <TouchableOpacity
          style={[
            styles.locationPill,
            {
              backgroundColor: resolve(semantic.fills.primary),
              borderColor: resolve(semantic.border.primary),
            },
          ]}
          onPress={() => router.push('/settings')}
          activeOpacity={0.7}
        >
          <MapPin size={12} color={resolve(semantic.text.secondary)} weight="regular" />
          <Text style={[textStyle.labelSm, { color: resolve(semantic.text.secondary) }]}>
            {regionName} · Fall
          </Text>
        </TouchableOpacity>
      </View>

      {/* Body */}
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={resolve(semantic.brand.primary)} />
        </View>
      ) : ingredients.length === 0 ? (
        <View style={styles.centered}>
          <Leaf size={32} color={resolve(semantic.text.quaternary)} weight="regular" />
          <Text style={[textStyle.bodyMd, { color: resolve(semantic.text.tertiary) }]}>
            Nothing in season right now
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[
            styles.list,
            { paddingBottom: insets.bottom + space[6] },
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={resolve(semantic.brand.primary)}
            />
          }
        >
          <Text
            style={[textStyle.labelSm, styles.sectionLabel, { color: resolve(semantic.text.tertiary) }]}
          >
            {ingredients.length} ingredients in season
          </Text>
          {ingredients.map((ingredient) => (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              onPress={() =>
                router.push({
                  pathname: '/ingredient/[id]',
                  params: { id: ingredient.id },
                })
              }
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space[4],
    paddingVertical: space[3],
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[1],
    paddingHorizontal: space[3],
    paddingVertical: space[1],
    borderRadius: radius.full,
    borderWidth: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[3],
  },
  list: {
    padding: space[4],
    gap: space[3],
  },
  sectionLabel: {
    marginBottom: space[1],
  },
});
