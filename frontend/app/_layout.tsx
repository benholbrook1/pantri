import { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Check for the token
        const token = await SecureStore.getItemAsync('access_token');
        
        // 2. Check where the user is currently trying to go
        // segments[0] is the top-level route (e.g., "(tabs)" or "login")
        const inLoginGroup = segments[0] === 'login';

        if (token && inLoginGroup) {
          // If logged in but on login page, go to tabs
          router.replace('/(tabs)');
        } else if (!token && !inLoginGroup) {
          // If NOT logged in and NOT on login page, go to login
          router.replace('/login');
        }
      } catch (e) {
        console.error("Auth check failed", e);
      } finally {
        setIsReady(true);
      }
    };

    checkAuth();
  }, [segments]); // Re-run this check whenever the route changes

  // Show a loading spinner while we check the token
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // <Slot /> renders the current child route (Login or Tabs)
  return <Slot />;
}
