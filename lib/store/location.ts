import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@szn/location';

type LocationData = {
  lat: number;
  lng: number;
  regionName: string;
  source: 'gps' | 'manual';
};

type LocationStore = {
  lat: number | null;
  lng: number | null;
  regionName: string;
  source: 'gps' | 'manual' | null;
  setLocation: (data: LocationData) => Promise<void>;
  setManualLocation: (regionName: string) => Promise<void>;
  loadFromStorage: () => Promise<void>;
};

export const useLocationStore = create<LocationStore>((set) => ({
  lat: null,
  lng: null,
  regionName: 'Chicago',
  source: null,

  setLocation: async ({ lat, lng, regionName, source }) => {
    set({ lat, lng, regionName, source });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ lat, lng, regionName, source }));
  },

  setManualLocation: async (regionName) => {
    set({ lat: null, lng: null, regionName, source: 'manual' });
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ lat: null, lng: null, regionName, source: 'manual' })
    );
  },

  loadFromStorage: async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored) as LocationData;
      set(data);
    }
  },
}));
