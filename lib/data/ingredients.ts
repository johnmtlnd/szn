export type Ingredient = {
  id: string;
  name: string;
  descriptor: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  status: 'peak' | 'available' | 'ending';
};

export type IngredientDetail = Ingredient & {
  description: string;
  howToPick: string;
  howToStore: string;
  recipeId: string;
  sourcingNote: string;
};

export const fallIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Butternut Squash',
    descriptor: 'Sweet and dense, flavor deepens after the first frost',
    season: 'fall',
    status: 'peak',
  },
  {
    id: '2',
    name: 'Honeycrisp Apple',
    descriptor: 'Arriving weekly from orchards two hours south of the city',
    season: 'fall',
    status: 'peak',
  },
  {
    id: '3',
    name: 'Lacinato Kale',
    descriptor: 'Dark, sturdy leaves that sweeten with each cold night',
    season: 'fall',
    status: 'available',
  },
  {
    id: '4',
    name: 'Sweet Potato',
    descriptor: 'Cured and sugaring up — holds well through winter',
    season: 'fall',
    status: 'available',
  },
  {
    id: '5',
    name: 'Leek',
    descriptor: 'Milder than onion, silky when slow-cooked in anything brothy',
    season: 'fall',
    status: 'ending',
  },
  {
    id: '6',
    name: 'Concord Grape',
    descriptor: 'Intensely jammy with a short window — last few weeks at market',
    season: 'fall',
    status: 'ending',
  },
];

export const fallIngredientDetails: IngredientDetail[] = [
  {
    id: '1',
    name: 'Butternut Squash',
    descriptor: 'Sweet and dense, flavor deepens after the first frost',
    season: 'fall',
    status: 'peak',
    description:
      'Butternut squash has sweet, nutty flesh that intensifies after the first frost. One of the most versatile fall vegetables — equally good roasted, pureed, or slow-cooked into a braise.',
    howToPick:
      'Look for a matte tan skin with no soft spots or green patches. Should feel heavy for its size.',
    howToStore:
      'Keep whole squash in a cool, dry spot — holds 2–3 months. Once cut, refrigerate and use within 5 days.',
    recipeId: '1',
    sourcingNote: 'Available at most Chicago grocery stores and farmers markets through November.',
  },
  {
    id: '2',
    name: 'Honeycrisp Apple',
    descriptor: 'Arriving weekly from orchards two hours south of the city',
    season: 'fall',
    status: 'peak',
    description:
      'Honeycrisp was developed in Minnesota and thrives in the Midwest. Perfect balance of sweet and tart with a satisfying crunch that holds up to both eating raw and light cooking.',
    howToPick:
      'Choose firm apples with bright red-and-yellow skin and no soft spots. A fresh apple feels dense and snaps when you bite it.',
    howToStore:
      'Refrigerate for up to 6 weeks. Keep away from strong-smelling foods — apples absorb odors easily.',
    recipeId: '2',
    sourcingNote:
      'In season now from orchards in southern Illinois and Indiana. Available at Green City Market on Wednesdays and Saturdays.',
  },
  {
    id: '3',
    name: 'Lacinato Kale',
    descriptor: 'Dark, sturdy leaves that sweeten with each cold night',
    season: 'fall',
    status: 'available',
    description:
      'Also called Dinosaur or Tuscan kale, Lacinato has dark blue-green leaves with a pebbled texture. More tender and less bitter than curly kale, and cold weather only improves its flavor.',
    howToPick:
      'Choose bunches with deep color and firm, crisp leaves. Avoid yellowing or wilted tips.',
    howToStore:
      'Wrap unwashed in a damp paper towel and refrigerate in a bag for up to a week. Keeps longer than most greens.',
    recipeId: '3',
    sourcingNote:
      'Widely available at Chicago farmers markets and Whole Foods. Local farms include Leaning Shed Farm.',
  },
  {
    id: '4',
    name: 'Sweet Potato',
    descriptor: 'Cured and sugaring up — holds well through winter',
    season: 'fall',
    status: 'available',
    description:
      'Sweet potatoes are harvested in fall and cured for 1–2 weeks after picking, which converts starches to sugar and deepens the flavor. What you\'re buying now has only gotten better since harvest.',
    howToPick:
      'Choose firm, smooth sweet potatoes without soft spots or sprouting. Medium-sized ones cook more evenly.',
    howToStore:
      'Store in a cool, dark place — not the fridge, which makes them hard and starchy. They\'ll last 3–4 weeks.',
    recipeId: '4',
    sourcingNote:
      'Available year-round but locally cured fall sweet potatoes are worth seeking at farmers markets.',
  },
  {
    id: '5',
    name: 'Leek',
    descriptor: 'Milder than onion, silky when slow-cooked in anything brothy',
    season: 'fall',
    status: 'ending',
    description:
      'Leeks look like oversized scallions but taste completely different — mild, sweet, and silky when cooked. The quiet backbone of fall cooking, adding depth without the sharpness of onion.',
    howToPick:
      'Look for firm stalks with bright white and pale green areas. The darker green tops can be tough but are great for stock.',
    howToStore:
      'Refrigerate unwashed, loosely wrapped, for up to 2 weeks. Don\'t store near strong-smelling foods.',
    recipeId: '5',
    sourcingNote:
      'Still at Green City Market but quantities are dropping — local leek season wraps up in the next few weeks.',
  },
  {
    id: '6',
    name: 'Concord Grape',
    descriptor: 'Intensely jammy with a short window — last few weeks at market',
    season: 'fall',
    status: 'ending',
    description:
      'Concords are a native American grape variety with an intensely fruity, almost jammy flavor unlike anything in a wine store. They have a thick slip-skin and seeds, but the flavor is worth it.',
    howToPick:
      'Look for deeply purple-blue clusters with a dusty bloom on the skin — a sign of freshness. Taste one before buying.',
    howToStore:
      'Refrigerate and use within a week. They don\'t keep long, which is why the window is so short.',
    recipeId: '6',
    sourcingNote:
      'Rare find — typically only at farmers markets, not grocery stores. Check Green City Market on Saturdays.',
  },
];
