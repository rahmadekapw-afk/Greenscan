import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Mock data for recent diagnoses
const RECENT_HISTORY = [
    { id: '1', plant: 'Tomato', diagnosis: 'Early Blight', date: 'Today', risk: 'High' },
    { id: '2', plant: 'Corn', diagnosis: 'Healthy', date: 'Yesterday', risk: 'None' },
    { id: '3', plant: 'Potato', diagnosis: 'Late Blight', date: '2 days ago', risk: 'Medium' },
];

export default function HomeScreen() {
    const router = useRouter();
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#4CAF50', dark: '#1B5E20' }}
            headerImage={
                <Ionicons
                    size={310}
                    name="leaf-outline"
                    style={styles.headerImage}
                />
            }>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.replace('/')}
            >
                <Ionicons name="arrow-back-circle" size={40} color="#4CAF50" />
            </TouchableOpacity>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">GreenScan AI</ThemedText>
                <ThemedText type="subtitle" style={styles.subtitle}>Your Digital Crop Doctor</ThemedText>
            </ThemedView>

            <ThemedView style={styles.actionContainer}>
                <TouchableOpacity style={styles.primaryButton} onPress={() => { /* TODO: Open Camera */ }}>
                    <Ionicons name="camera" size={32} color="#fff" />
                    <ThemedText style={styles.primaryButtonText}>Diagnose Plant</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} onPress={() => { /* TODO: Upload Photo */ }}>
                    <Ionicons name="images" size={24} color="#4CAF50" />
                    <ThemedText style={styles.secondaryButtonText}>Upload Photo</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.sectionContainer}>
                <ThemedText type="subtitle">Recent Diagnoses</ThemedText>
                {RECENT_HISTORY.map((item) => (
                    <View key={item.id} style={styles.historyItem}>
                        <View style={styles.historyIconContainer}>
                            <Ionicons name="nutrition" size={24} color="#4CAF50" />
                        </View>
                        <View style={styles.historyContent}>
                            <ThemedText type="defaultSemiBold">{item.plant}</ThemedText>
                            <ThemedText style={{ color: item.risk === 'None' ? 'green' : item.risk === 'High' ? 'red' : 'orange' }}>
                                {item.diagnosis}
                            </ThemedText>
                        </View>
                        <ThemedText style={styles.dateText}>{item.date}</ThemedText>
                    </View>
                ))}
            </ThemedView>

            <ThemedView style={styles.tipContainer}>
                <View style={styles.tipHeader}>
                    <Ionicons name="bulb-outline" size={24} color="#FBC02D" />
                    <ThemedText type="defaultSemiBold" style={styles.tipTitle}>Tip of the Day</ThemedText>
                </View>
                <ThemedText>
                    Rotate your crops annually to prevent soil depletion and break disease cycles!
                </ThemedText>
            </ThemedView>

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#ffffff80', // semi-transparent white
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 20,
    },
    titleContainer: {
        marginBottom: 20,
    },
    subtitle: {
        color: '#4CAF50',
        marginTop: 4,
    },
    actionContainer: {
        gap: 12,
        marginBottom: 24,
    },
    primaryButton: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        borderRadius: 12,
        gap: 12,
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    secondaryButtonText: {
        color: '#4CAF50',
        fontSize: 16,
        fontWeight: '600',
    },
    sectionContainer: {
        gap: 12,
        marginBottom: 24,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#f5f5f5', // Consider using themed background
        gap: 12,
    },
    historyIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e8f5e9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyContent: {
        flex: 1,
    },
    dateText: {
        fontSize: 12,
        color: '#666',
    },
    tipContainer: {
        backgroundColor: '#fff9c4', // Light yellow for tips
        padding: 16,
        borderRadius: 12,
        gap: 8,
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    tipTitle: {
        color: '#F9A825',
    },
});
