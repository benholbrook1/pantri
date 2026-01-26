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
        const token = await SecureStore.getItemAsync('access_token');
        
        // Check if user is inside the 'auth' folder
        const inAuthGroup = segments[0] === 'login';

        if (token && inAuthGroup) {
          // ✅ Logged in, so kick them out of Login -> go to Tabs
          router.replace('/(tabs)');
        } else if (!token && !inAuthGroup) {
          // ❌ Not logged in, so kick them out of Tabs -> go to Login
          // Make sure this matches your folder name: 'auth/login'
          router.replace('/login');
        }
      } catch (e) {
        console.error("Auth check failed", e);
      } finally {
        setIsReady(true);
      }
    };

    checkAuth();
  }, [segments]); 

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}