import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, gestureEnabled: true, animation: 'default' }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
}
