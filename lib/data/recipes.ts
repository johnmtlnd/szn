export type RecipeIngredient = {
  name: string;
  quantity: string;
  isSeasonal: boolean;
};

export type Recipe = {
  id: string;
  name: string;
  totalTimeMinutes: number;
  difficulty: 'easy' | 'medium';
  ingredients: RecipeIngredient[];
  steps: string[];
};

// Keyed by ingredientId
export const recipes: Record<string, Recipe> = {
  '1': {
    id: 'recipe-1',
    name: 'Brown Butter Roasted Butternut Squash',
    totalTimeMinutes: 35,
    difficulty: 'easy',
    ingredients: [
      { name: 'Butternut squash, peeled and cubed', quantity: '1 medium (~2 lb)', isSeasonal: true },
      { name: 'Unsalted butter', quantity: '3 tbsp', isSeasonal: false },
      { name: 'Fresh sage leaves', quantity: '8–10 leaves', isSeasonal: false },
      { name: 'Garlic cloves, smashed', quantity: '2', isSeasonal: false },
      { name: 'Salt', quantity: '½ tsp', isSeasonal: false },
      { name: 'Black pepper', quantity: '¼ tsp', isSeasonal: false },
    ],
    steps: [
      'Preheat oven to 425°F.',
      'Toss squash cubes with 1 tbsp melted butter, salt, and pepper. Spread on a baking sheet in a single layer.',
      'Roast 25–30 minutes, turning once halfway, until edges are caramelized and fork-tender.',
      'While squash roasts, melt remaining 2 tbsp butter in a small skillet over medium heat. Add garlic and cook 1 minute.',
      'Add sage leaves and cook until butter turns golden brown and smells nutty, about 2 more minutes. Remove garlic.',
      'Drizzle brown butter and crispy sage over the roasted squash. Serve immediately.',
    ],
  },
  '2': {
    id: 'recipe-2',
    name: 'Skillet Pork Chops with Apple and Thyme',
    totalTimeMinutes: 30,
    difficulty: 'easy',
    ingredients: [
      { name: 'Bone-in pork chops, about 1 inch thick', quantity: '2', isSeasonal: false },
      { name: 'Honeycrisp apples, cored and sliced ½ inch thick', quantity: '2', isSeasonal: true },
      { name: 'Unsalted butter', quantity: '1 tbsp', isSeasonal: false },
      { name: 'Olive oil', quantity: '1 tbsp', isSeasonal: false },
      { name: 'Fresh thyme sprigs', quantity: '3', isSeasonal: false },
      { name: 'Apple cider', quantity: '¼ cup', isSeasonal: false },
      { name: 'Shallot, thinly sliced', quantity: '1', isSeasonal: false },
      { name: 'Salt and black pepper', quantity: 'to taste', isSeasonal: false },
    ],
    steps: [
      'Pat pork chops dry and season both sides generously with salt and pepper.',
      'Heat oil in a large skillet over medium-high heat. Sear chops 4–5 minutes per side until golden brown. Remove to a plate and tent loosely with foil.',
      'Reduce heat to medium. Add butter, shallot, and thyme to the same pan. Cook 2 minutes until shallot softens.',
      'Add apple slices and cook 3 minutes, turning once, until slightly softened.',
      'Pour in cider and scrape up any browned bits from the pan. Simmer 1 minute.',
      'Return pork chops to the pan and cook 2 more minutes, spooning juices over the top. Rest 3 minutes before serving.',
    ],
  },
  '3': {
    id: 'recipe-3',
    name: 'White Bean and Kale Soup',
    totalTimeMinutes: 35,
    difficulty: 'easy',
    ingredients: [
      { name: 'Lacinato kale, stems removed, leaves roughly chopped', quantity: '1 bunch', isSeasonal: true },
      { name: 'Cannellini beans, drained and rinsed', quantity: '1 can (15 oz)', isSeasonal: false },
      { name: 'Garlic cloves, thinly sliced', quantity: '4', isSeasonal: false },
      { name: 'Olive oil', quantity: '2 tbsp', isSeasonal: false },
      { name: 'Chicken or vegetable broth', quantity: '4 cups', isSeasonal: false },
      { name: 'Red pepper flakes', quantity: '½ tsp', isSeasonal: false },
      { name: 'Parmesan rind (optional)', quantity: '1 piece', isSeasonal: false },
      { name: 'Salt', quantity: 'to taste', isSeasonal: false },
    ],
    steps: [
      'Heat olive oil in a large pot over medium heat. Add garlic and red pepper flakes and cook 2 minutes until fragrant.',
      'Add broth and parmesan rind if using. Bring to a simmer.',
      'Add kale and cook 8 minutes, stirring occasionally, until wilted and tender.',
      'Stir in beans and cook 5 more minutes until heated through.',
      'Remove parmesan rind. Taste and adjust salt.',
      'Serve in deep bowls with crusty bread.',
    ],
  },
  '4': {
    id: 'recipe-4',
    name: 'Roasted Sweet Potatoes with Miso Butter',
    totalTimeMinutes: 45,
    difficulty: 'easy',
    ingredients: [
      { name: 'Medium sweet potatoes', quantity: '2', isSeasonal: true },
      { name: 'White (shiro) miso paste', quantity: '2 tbsp', isSeasonal: false },
      { name: 'Unsalted butter, at room temperature', quantity: '3 tbsp', isSeasonal: false },
      { name: 'Soy sauce', quantity: '1 tsp', isSeasonal: false },
      { name: 'Sesame oil', quantity: '1 tsp', isSeasonal: false },
      { name: 'Scallions, thinly sliced', quantity: '2', isSeasonal: false },
    ],
    steps: [
      'Preheat oven to 400°F.',
      'Scrub sweet potatoes and prick all over with a fork. Place on a foil-lined baking sheet.',
      'Roast 40–45 minutes until completely tender when pierced with a knife.',
      'While potatoes roast, mix miso, softened butter, soy sauce, and sesame oil together until smooth.',
      'Cut a long slit in the top of each potato and press open with a fork to expose the flesh.',
      'Spoon a generous tablespoon of miso butter into each potato. Top with scallions and serve.',
    ],
  },
  '5': {
    id: 'recipe-5',
    name: 'Leek and Potato Soup',
    totalTimeMinutes: 40,
    difficulty: 'easy',
    ingredients: [
      { name: 'Large leeks, white and light green parts only', quantity: '3', isSeasonal: true },
      { name: 'Yukon Gold potatoes, peeled and roughly chopped', quantity: '1 lb', isSeasonal: false },
      { name: 'Unsalted butter', quantity: '2 tbsp', isSeasonal: false },
      { name: 'Chicken broth', quantity: '4 cups', isSeasonal: false },
      { name: 'Garlic cloves, smashed', quantity: '2', isSeasonal: false },
      { name: 'Heavy cream', quantity: '¼ cup', isSeasonal: false },
      { name: 'Fresh chives or thyme, for serving', quantity: 'a few sprigs', isSeasonal: false },
      { name: 'Salt and white pepper', quantity: 'to taste', isSeasonal: false },
    ],
    steps: [
      'Halve leeks lengthwise and rinse under cold water to remove grit between layers. Slice into ½-inch pieces.',
      'Melt butter in a large pot over medium heat. Add leeks and garlic with a pinch of salt. Cook, stirring often, 8–10 minutes until very soft and silky.',
      'Add potatoes and broth. Bring to a simmer and cook 20 minutes until potatoes are completely tender.',
      'Use an immersion blender to puree until smooth — or blend carefully in batches in a regular blender.',
      'Stir in cream. Season with salt and white pepper to taste.',
      'Serve hot with fresh herbs on top and crusty bread on the side.',
    ],
  },
  '6': {
    id: 'recipe-6',
    name: 'Concord Grape Compote with Greek Yogurt',
    totalTimeMinutes: 20,
    difficulty: 'easy',
    ingredients: [
      { name: 'Concord grapes, stems removed', quantity: '1 lb', isSeasonal: true },
      { name: 'Honey', quantity: '2 tbsp', isSeasonal: false },
      { name: 'Fresh lemon juice', quantity: '1 tbsp', isSeasonal: false },
      { name: 'Vanilla extract', quantity: '¼ tsp', isSeasonal: false },
      { name: 'Full-fat Greek yogurt', quantity: '2 cups', isSeasonal: false },
      { name: 'Flaky salt (optional)', quantity: 'a pinch', isSeasonal: false },
    ],
    steps: [
      'Combine grapes, honey, and lemon juice in a medium saucepan over medium heat.',
      'Cook, stirring occasionally, until grapes burst and release their juice, about 8–10 minutes.',
      'Mash gently with a fork. Continue cooking 2–3 minutes until slightly thickened.',
      'Remove from heat and stir in vanilla. Let cool slightly — it thickens as it cools.',
      'Divide yogurt among bowls. Spoon warm compote generously over the top.',
      'Finish with a pinch of flaky salt if you have it.',
    ],
  },
};
