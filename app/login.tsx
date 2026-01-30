import AnimatedBackground from '@/components/AnimatedBackground';
import Config from '@/constants/Config';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function LoginScreen() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Semua kolom wajib diisi');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${Config.API_URL}/login.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                router.replace('/(tabs)');
            } else {
                Alert.alert('Gagal Masuk', data.message || 'Nama pengguna atau kata sandi salah');
            }
        } catch (error) {
            Alert.alert('Error', 'Terjadi kesalahan. Periksa koneksi internet Anda.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <AnimatedBackground />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >

                <View style={styles.headerContainer} />

                <View style={styles.bottomCard}>
                    <Text style={styles.cardTitle}>Mulai Sekarang</Text>
                    <Text style={styles.subtitle}>Masukkan data Anda untuk masuk</Text>

                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nama Pengguna</Text>
                            <TextInput
                                style={styles.input}
                                value={username}
                                onChangeText={setUsername}
                                placeholder="Masukkan nama pengguna"
                                placeholderTextColor="#999"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Kata Sandi</Text>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="••••••••"
                                placeholderTextColor="#999"
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.forgotContainer}>
                            <Text style={styles.forgotPassword}>Lupa Kata Sandi?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.loginButtonText}>Masuk</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Atau masuk dengan</Text>
                        <View style={styles.socialRow}>
                            <View style={styles.socialIcon}>
                                <Ionicons name="logo-google" size={20} color="#555" />
                            </View>
                            <View style={styles.socialIcon}>
                                <Ionicons name="logo-apple" size={20} color="#555" />
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    headerContainer: {
        flex: 1,
    },
    bottomCard: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30,
        paddingBottom: 50,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 20,
    },
    cardTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    formContainer: {
        width: '100%',
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
        marginLeft: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 15,
        padding: 18,
        fontSize: 16,
        backgroundColor: '#F7F9F7',
    },
    forgotContainer: {
        alignItems: 'flex-end',
    },
    forgotPassword: {
        color: '#4CAF50',
        fontWeight: '600',
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        padding: 18,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    loginButtonDisabled: {
        opacity: 0.7,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        alignItems: 'center',
        marginTop: 30,
        gap: 15,
    },
    footerText: {
        color: '#999',
        fontSize: 14,
    },
    socialRow: {
        flexDirection: 'row',
        gap: 20,
    },
    socialIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
