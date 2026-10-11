import { ComponentItem } from "../../schema";

export const orbitingBubbleLoader: ComponentItem = {
  id: "orbiting-bubble-loader",
  slug: "orbiting-bubble-loader",
  title: "Orbiting Bubble Device Loader",
  category: "loaders",
  description: "A dynamic loading spinner featuring orbital device bubbles rotating in a ring with smooth spring transitions, periodic center attraction, and auto-balancing orbital distribution.",
  tags: ["loader", "spinner", "orbit", "bubble", "device-icons", "micro-interaction"],
  featured: true,
  webCode: {
    filename: "OrbitingBubbleLoader.tsx",
    dependencies: {
      "lucide-react": "^0.475.0",
    },
    code: `'use client';

import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Tv,
  Laptop,
  Speaker,
  Camera,
  Monitor,
  Headphones,
} from 'lucide-react';

const ICONS = [
  { id: 'mobile', icon: Smartphone, label: 'Telefon' },
  { id: 'tv', icon: Tv, label: 'Televizyon' },
  { id: 'laptop', icon: Laptop, label: 'Dizüstü' },
  { id: 'speaker', icon: Speaker, label: 'Hoparlör' },
  { id: 'camera', icon: Camera, label: 'Kamera' },
  { id: 'pc', icon: Monitor, label: 'Masaüstü' },
  { id: 'headphones', icon: Headphones, label: 'Kulaklık' },
];

export default function OrbitingBubbleLoaderDemo() {
  const [centerIdx, setCenterIdx] = useState(0);
  const numBubbles = ICONS.length;
  const orbitRadius = 110;

  useEffect(() => {
    const timer = setInterval(() => {
      setCenterIdx((prev) => (prev + 1) % numBubbles);
    }, 1800);
    return () => clearInterval(timer);
  }, [numBubbles]);

  // Orbitteki baloncukların dengeli açılarını hesapla
  const orbitingItems = ICONS.filter((_, idx) => idx !== centerIdx);
  const numOrbiting = orbitingItems.length;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        width: '100%',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        userSelect: 'none',
      }}
    >
      <style>{\`
        @keyframes spinOrbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes counterSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes textPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1.02); }
        }
      \`}</style>

      {/* Dönen Çember Kapsayıcısı */}
      <div
        style={{
          position: 'relative',
          width: '280px',
          height: '280px',
          animation: 'spinOrbit 22s linear infinite',
        }}
      >
        {ICONS.map((item, idx) => {
          const Icon = item.icon;
          const isCenter = idx === centerIdx;

          let x = 0;
          let y = 0;

          if (!isCenter) {
            const orbitPos = orbitingItems.findIndex((it) => it.id === item.id);
            const angle = (orbitPos / numOrbiting) * (2 * Math.PI);
            x = Math.cos(angle) * orbitRadius;
            y = Math.sin(angle) * orbitRadius;
          }

          return (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '56px',
                height: '56px',
                marginTop: '-28px',
                marginLeft: '-28px',
                transform: \`translate(\${x}px, \${y}px)\`,
                transition: 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: isCenter ? 25 : 5,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'counterSpin 22s linear infinite',
                  transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  backgroundColor: isCenter ? '#4648d4' : '#ffffff',
                  color: isCenter ? '#ffffff' : '#64748b',
                  border: isCenter ? '2px solid #4648d4' : '2px solid rgba(226, 232, 240, 0.8)',
                  transform: isCenter ? 'scale(1.45)' : 'scale(1)',
                  boxShadow: isCenter
                    ? '0 0 28px rgba(70, 72, 212, 0.55), 0 8px 18px rgba(70, 72, 212, 0.3)'
                    : '0 6px 14px rgba(18, 28, 42, 0.08)',
                }}
              >
                <Icon size={isCenter ? 26 : 22} strokeWidth={2.2} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Yükleniyor Metni */}
      <div
        style={{
          marginTop: '28px',
          fontWeight: 600,
          fontSize: '15px',
          color: '#4648d4',
          letterSpacing: '0.5px',
          animation: 'textPulse 1.6s ease-in-out infinite',
        }}
      >
        Cihazlar Senkronize Ediliyor...
      </div>
    </div>
  );
}
`,
  },
  mobileCode: {
    filename: "OrbitingBubbleLoader.native.tsx",
    dependencies: {
      "react-native-reanimated": "~3.16.0",
      "lucide-react-native": "^0.475.0",
    },
    code: `import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import {
  Smartphone,
  Tv,
  Laptop,
  Speaker,
  Camera,
  Monitor,
  Headphones,
} from 'lucide-react-native';

const ICONS = [
  { id: 'mobile', icon: Smartphone },
  { id: 'tv', icon: Tv },
  { id: 'laptop', icon: Laptop },
  { id: 'speaker', icon: Speaker },
  { id: 'camera', icon: Camera },
  { id: 'pc', icon: Monitor },
  { id: 'headphones', icon: Headphones },
];

const ORBIT_RADIUS = 95;
const NUM_BUBBLES = ICONS.length;

export default function OrbitingBubbleLoaderNative() {
  const [centerIdx, setCenterIdx] = useState(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 22000, easing: Easing.linear }),
      -1,
      false
    );

    const interval = setInterval(() => {
      setCenterIdx((prev) => (prev + 1) % NUM_BUBBLES);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: \`\${rotation.value}deg\` }],
  }));

  const counterStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: \`-\${rotation.value}deg\` }],
  }));

  const orbitingItems = ICONS.filter((_, idx) => idx !== centerIdx);
  const numOrbiting = orbitingItems.length;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.orbitContainer, containerStyle]}>
        {ICONS.map((item, idx) => {
          const Icon = item.icon;
          const isCenter = idx === centerIdx;

          let targetX = 0;
          let targetY = 0;

          if (!isCenter) {
            const orbitPos = orbitingItems.findIndex((it) => it.id === item.id);
            const angle = (orbitPos / numOrbiting) * (2 * Math.PI);
            targetX = Math.cos(angle) * ORBIT_RADIUS;
            targetY = Math.sin(angle) * ORBIT_RADIUS;
          }

          return (
            <BubbleItem
              key={item.id}
              Icon={Icon}
              isCenter={isCenter}
              targetX={targetX}
              targetY={targetY}
              counterStyle={counterStyle}
            />
          );
        })}
      </Animated.View>

      <Text style={styles.loadingText}>Yükleniyor...</Text>
    </View>
  );
}

function BubbleItem({
  Icon,
  isCenter,
  targetX,
  targetY,
  counterStyle,
}: {
  Icon: any;
  isCenter: boolean;
  targetX: number;
  targetY: number;
  counterStyle: any;
}) {
  const scale = useSharedValue(isCenter ? 1.4 : 1);
  const posX = useSharedValue(targetX);
  const posY = useSharedValue(targetY);

  useEffect(() => {
    scale.value = withSpring(isCenter ? 1.4 : 1, { damping: 14, stiffness: 120 });
    posX.value = withSpring(targetX, { damping: 16, stiffness: 110 });
    posY.value = withSpring(targetY, { damping: 16, stiffness: 110 });
  }, [isCenter, targetX, targetY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: posX.value },
      { translateY: posY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.bubbleWrapper,
        animatedStyle,
        { zIndex: isCenter ? 20 : 5 },
      ]}
    >
      <Animated.View
        style={[
          styles.bubble,
          counterStyle,
          isCenter ? styles.bubbleCenter : styles.bubbleOrbit,
        ]}
      >
        <Icon
          size={isCenter ? 24 : 19}
          color={isCenter ? '#ffffff' : '#64748b'}
          strokeWidth={2.2}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 360,
  },
  orbitContainer: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleWrapper: {
    position: 'absolute',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#121c2a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  bubbleOrbit: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  bubbleCenter: {
    backgroundColor: '#4648d4',
    borderWidth: 1.5,
    borderColor: '#4648d4',
    shadowColor: '#4648d4',
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 8,
  },
  loadingText: {
    marginTop: 24,
    fontSize: 14,
    fontWeight: '600',
    color: '#4648d4',
    letterSpacing: 0.5,
  },
});
`,
  },
};
