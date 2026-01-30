import AnimatedBackground from '@/components/AnimatedBackground';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LandingScreen() {
    const router = useRouter();

    return (
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => router.push('/login')}>
            <AnimatedBackground />

            {/* Content Overlay */}
            <View style={styles.contentContainer}>

                {/* Logo Section */}
                <View style={styles.topSection}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="leaf" size={90} color="#2E7D32" />
                    </View>

                    {/* App Name */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.appName}>
                            <Text style={styles.greenText}>Green</Text>
                            <Text style={styles.scanText}>Scan</Text>
                        </Text>

                        <Text style={styles.tagline}>
                            Solusi Cerdas Identifikasi Tanaman
                        </Text>
                    </View>
                </View>



            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 60,
    },
    topSection: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(255,255,255,0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
        elevation: 8,
    },
    titleContainer: {
        alignItems: 'center',
    },
    appName: {
        fontSize: 36,
        fontWeight: '800',
        letterSpacing: 1.5,
    },
    greenText: {
        color: '#2E7D32',
    },
    scanText: {
        color: '#dee6deff',
    },
    tagline: {
        marginTop: 8,
        fontSize: 14,
        color: '#4CAF50',
        letterSpacing: 1,
    },
    bottomSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 50,
    },
    hintText: {
        color: '#4CAF50',
        fontSize: 14,
        opacity: 0.8,
    }
});
