export type Market = {
  name: string;
  distanceMiles: number;
  daysOpen: string;
  address: string;
};

export type SourcingInfo = {
  groceryAvailable: boolean;
  groceryNote: string;
  markets: Market[];
};

// Keyed by ingredientId
export const sourcing: Record<string, SourcingInfo> = {
  '1': {
    groceryAvailable: true,
    groceryNote:
      'Available at most Chicago grocery stores. Look for locally grown on the label — Illinois farms ship throughout October.',
    markets: [
      {
        name: 'Green City Market',
        distanceMiles: 1.2,
        daysOpen: 'Wed & Sat, 8am–1pm',
        address: '1817 N Clark St, Chicago',
      },
      {
        name: 'Logan Square Farmers Market',
        distanceMiles: 3.4,
        daysOpen: 'Sundays, 10am–3pm',
        address: '3107 W Logan Blvd, Chicago',
      },
    ],
  },
  '2': {
    groceryAvailable: true,
    groceryNote:
      'In stores now, but farmers market apples from Klug Farm and Nichols Farm are harvested days before market — the difference is noticeable.',
    markets: [
      {
        name: 'Green City Market',
        distanceMiles: 1.2,
        daysOpen: 'Wed & Sat, 8am–1pm',
        address: '1817 N Clark St, Chicago',
      },
      {
        name: 'Evanston Farmers Market',
        distanceMiles: 8.1,
        daysOpen: 'Saturdays, 7:30am–1pm',
        address: 'University Place & Oak Ave, Evanston',
      },
    ],
  },
  '3': {
    groceryAvailable: true,
    groceryNote:
      'Easy to find at Whole Foods, Trader Joe\'s, and most grocery stores. Local bunches from Leaning Shed Farm are worth the extra trip.',
    markets: [
      {
        name: 'Green City Market',
        distanceMiles: 1.2,
        daysOpen: 'Wed & Sat, 8am–1pm',
        address: '1817 N Clark St, Chicago',
      },
      {
        name: 'Logan Square Farmers Market',
        distanceMiles: 3.4,
        daysOpen: 'Sundays, 10am–3pm',
        address: '3107 W Logan Blvd, Chicago',
      },
    ],
  },
  '4': {
    groceryAvailable: true,
    groceryNote:
      'Available year-round at grocery stores. For locally cured Illinois sweet potatoes with the best flavor, check farmers markets through October.',
    markets: [
      {
        name: 'Green City Market',
        distanceMiles: 1.2,
        daysOpen: 'Wed & Sat, 8am–1pm',
        address: '1817 N Clark St, Chicago',
      },
      {
        name: 'Maxwell Street Market',
        distanceMiles: 2.8,
        daysOpen: 'Sundays, 7am–3pm',
        address: '800 S Desplaines St, Chicago',
      },
    ],
  },
  '5': {
    groceryAvailable: true,
    groceryNote:
      'Still available at most grocery stores, but local supply is winding down fast. Worth getting now while they\'re at their best.',
    markets: [
      {
        name: 'Green City Market',
        distanceMiles: 1.2,
        daysOpen: 'Wed & Sat, 8am–1pm',
        address: '1817 N Clark St, Chicago',
      },
    ],
  },
  '6': {
    groceryAvailable: false,
    groceryNote:
      'Unlikely to find at grocery stores — Concords need to be sold within days of picking and most stores won\'t carry them.',
    markets: [
      {
        name: 'Green City Market',
        distanceMiles: 1.2,
        daysOpen: 'Saturdays only, 8am–1pm',
        address: '1817 N Clark St, Chicago',
      },
    ],
  },
};
