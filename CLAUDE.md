# Szn — Claude Code Context

This file is read by Claude Code at session startup. It covers everything needed to work on Szn without re-explaining context each time.

---

## What is Szn?

A seasonal and local food companion app. Core MVP loop:

> Location → What's in season right now → One recipe → Where to get it

Target persona: Maya, 28, Chicago. Curious about seasonal eating, no real system, occasional farmers market shopper. The app answers the "Tuesday 6pm, what do I cook?" problem — not a planner, not a social network. One useful answer, right now.

MVP is deliberately narrow. See decisions log in Notion before adding scope.

---

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | React Native via Expo SDK 52 | Cross-platform iOS + Android |
| Routing | Expo Router v4 | File-based, typed routes enabled |
| Styling | NativeWind v4 | Tailwind utility classes in RN |
| Design System | Design System 3 by Sigma (Figma) | Figma source of truth for components |
| Icons | phosphor-react-native | 6 weights, use regular by default |
| Typography | Geist (variable) | Placeholder — will swap for final brand type |
| State | Zustand v5 | Global state only where needed |
| Language | TypeScript strict | No any, no exceptions |

---

## Project Structure

```
szn/
├── app/                        # Expo Router screens
│   ├── _layout.tsx             # Root layout — font loading, status bar
│   └── index.tsx               # Home screen (MVP entry point)
├── components/
│   ├── primitives/             # Atoms: Text, Button, Icon, Input
│   ├── composed/               # Molecules: IngredientCard, RecipeCard
│   └── layout/                 # Screen wrappers, SafeArea, containers
├── design-system/
│   ├── tokens.ts               # Color primitives + semantic tokens (Figma source of truth)
│   ├── typography.ts           # Type scale, weights, composed text styles
│   ├── spacing.ts              # Space scale (4pt grid) + radius tokens
│   └── index.ts                # Re-exports everything
├── lib/
│   ├── hooks/                  # useColorScheme, useLocation, etc.
│   ├── api/                    # Season data, recipe fetching, sourcing
│   └── utils/                  # Pure helpers
└── assets/
    ├── fonts/                  # Geist-Variable.ttf
    ├── images/                 # icon.png, splash.png, adaptive-icon.png
    └── icons/                  # Static icon assets if needed
```

---

## Design Tokens

Two-layer system. Always consume semantic tokens in components, never primitives directly.

```ts
import { semantic } from '@/design-system';
import { useColorScheme } from '@/lib/hooks';

const { resolve } = useColorScheme();
const bg = resolve(semantic.bg.primary); // '#FDFCF8' light / '#111110' dark
```

### Color — Primitives (design-system/tokens.ts)

Brand scales: color.forest, color.soil, color.cream
State scales: color.red, color.amber, color.blue
Utility: color.white, color.black

Each primitive is { light: string, dark: string }.

### Color — Semantic tokens

```
semantic.bg.primary / secondary / elevated
semantic.fills.primary / secondary / tertiary / elevated / liquidGlass
semantic.text.primary / secondary / tertiary / quaternary / inverse / alwaysLight / alwaysDark
semantic.border.primary / bold / disabled
semantic.brand.primary / subtle
semantic.error.subtle / primary / dark
semantic.warning.subtle / primary / dark
semantic.success.subtle / primary / dark
semantic.info.subtle / primary / dark
```

### Key token decisions
- Text tokens stay on gray scale (D-011) — not remapped to forest/soil
- border.primary dark mode = cream-100 dark, not gray (D-012)
- Success aliases forest scale
- Dark mode emphasis states use -300 primitives (lighter, readable on dark bg)

### Typography (design-system/typography.ts)

```ts
import { textStyle } from '@/design-system';
// displayLg, displaySm, headingLg, headingMd, headingSm
// bodyLg, bodyMd, bodySm, labelLg, labelSm
```

### Spacing (design-system/spacing.ts)

4pt grid: space[1] = 4, space[2] = 8, space[4] = 16, etc.
Radius: radius.sm = 4, radius.md = 8, radius.lg = 12, radius.xl = 16, radius.full = 9999

---

## Icons

Phosphor icons only. Import from phosphor-react-native.

```tsx
import { Leaf, MapPin, ArrowRight } from 'phosphor-react-native';

<Leaf size={24} color={resolve(semantic.brand.primary)} weight="regular" />
```

Default weight: regular. Use bold for emphasis, fill sparingly for active/selected states.

---

## Component Patterns

### Screen wrapper
```tsx
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { semantic } from '@/design-system';
import { useColorScheme } from '@/lib/hooks';

export default function SomeScreen() {
  const { resolve } = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.container,
      { backgroundColor: resolve(semantic.bg.primary), paddingTop: insets.top }
    ]}>
      {/* content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
```

### Text
```tsx
import { Text } from 'react-native';
import { textStyle, semantic } from '@/design-system';
import { useColorScheme } from '@/lib/hooks';

const { resolve } = useColorScheme();

<Text style={[textStyle.headingMd, { color: resolve(semantic.text.primary) }]}>
  What's in season
</Text>
```

---

## Figma

| File | Key | Use |
|---|---|---|
| DS Library | wcZr4tn1DJKGwrVhE3XfIB | Component reference, token source |
| Product Design | 7iyFFyxEsHDVyvC3a6lnO2 | Screen designs |

Figma MCP is read-only. Use get_design_context with fileKey + nodeId to inspect components.
Node IDs in Figma URLs use hyphens (1180-3541) but MCP tools require colons (1180:3541).

When building a component from Figma: read the design context, then implement using our token system. Do not copy Sigma's raw hex values directly.

---

## MVP Scope (locked — D-009)

Three screens only:

1. Location prompt — one-time gate, asks for location permission
2. Home / What's in season — list of in-season ingredients for user's region
3. Ingredient detail — ingredient info, one recipe, where to get it

Everything else is out of scope until Phase 3. If a task adds features beyond these three screens, stop and ask before proceeding.

---

## Decisions Log

All product and technical decisions are logged in Notion:
https://www.notion.so/318ac65c4c17814bac71fee013aac094

Current count: D-001 through D-012. Check Notion before assuming anything not covered here.

---

## Rules

1. Never use raw hex values in components — always resolve through semantic tokens
2. Never use `any` in TypeScript
3. Never add dependencies without flagging first
4. Always use StyleSheet.create, not inline style objects
5. Font family name is 'Geist'
6. Icon default weight is 'regular'
7. All spacing on the 4pt grid — use space tokens, not arbitrary numbers
8. If something feels like new scope, it probably is — ask first
