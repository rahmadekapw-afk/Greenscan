import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// Floating Bubble Component
const Bubble = ({ size, color, startX, startY, duration }: any) => {
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    useEffect(() => {
        translateY.value = withRepeat(
            withSequence(
                withTiming(-50, { duration: duration, easing: Easing.inOut(Easing.ease) }),
                withTiming(50, { duration: duration, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        );
        scale.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: duration * 1.5, easing: Easing.linear }),
                withTiming(0.9, { duration: duration * 1.5, easing: Easing.linear })
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }, { scale: scale.value }],
        };
    });

    return (
        <Animated.View
            style={[
                styles.bubble,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: color,
                    left: startX,
                    top: startY,
                    opacity: 0.2, // Subtle transparency
                },
                animatedStyle,
            ]}
        />
    );
};

export default function AnimatedBackground() {
    return (
        <View style={StyleSheet.absoluteFill}>
            {/* Background Gradient */}
            <LinearGradient
                colors={['#E8F5E9', '#A5D6A7', '#66BB6A']} // Light to Medium Green
                style={StyleSheet.absoluteFill}
            />

            {/* Animated Bubbles (Background Elements) */}
            <View style={StyleSheet.absoluteFill}>
                <Bubble size={200} color="#4CAF50" startX={-50} startY={50} duration={6000} />
                <Bubble size={250} color="#81C784" startX={width - 150} startY={100} duration={7000} />
                <Bubble size={180} color="#C8E6C9" startX={50} startY={height / 2} duration={8000} />
                <Bubble size={300} color="#43A047" startX={width / 2 - 150} startY={height - 200} duration={9000} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bubble: {
        position: 'absolute',
    },
});
