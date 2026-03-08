import '../global.css';
import { useEffect, useRef, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from '@/lib/hooks';
import { useLocationStore } from '@/lib/store/location';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav({ fontsLoaded }: { fontsLoaded: boolean }) {
  const router = useRouter();
  const segments = useSegments();
  const [ready, setReady] = useState(false);
  const hasRedirected = useRef(false);
  const loadFromStorage = useLocationStore((s) => s.loadFromStorage);

  useEffect(() => {
    if (!fontsLoaded) return;
    loadFromStorage().finally(() => {
      SplashScreen.hideAsync();
      setReady(true);
    });
  }, [fontsLoaded, loadFromStorage]);

  useEffect(() => {
    if (!ready || hasRedirected.current) return;
    const inFlow =
      segments[0] === 'welcome' ||
      (segments[0] as string) === 'onboarding';
    if (!inFlow) {
      hasRedirected.current = true;
      router.replace('/welcome');
    }
  }, [ready, router, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const { mode } = useColorScheme();
  const [fontsLoaded] = useFonts({
    Geist: require('../assets/Geist[wght].ttf'),
    'Geist-Italic': require('../assets/Geist-Italic[wght].ttf'),
  });

  return (
    <SafeAreaProvider>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <RootLayoutNav fontsLoaded={fontsLoaded ?? false} />
    </SafeAreaProvider>
  );
}
