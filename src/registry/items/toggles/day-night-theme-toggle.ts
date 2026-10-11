import { ComponentItem } from "../../schema";

export const dayNightThemeToggle: ComponentItem = {
  id: "day-night-theme-toggle",
  slug: "day-night-theme-toggle",
  title: "Day & Night Sky Theme Toggle",
  category: "toggles",
  description: "An interactive morphing sky theme switch featuring spinning sun rays, realistic moon craters, sinking daytime clouds, and twinkling nighttime stars.",
  tags: ["toggle", "theme", "dark-mode", "day-night", "sun-moon", "sky-animation"],
  featured: true,
  webCode: {
    filename: "DayNightThemeToggle.tsx",
    dependencies: {},
    code: `'use client';

import React, { useState } from 'react';

export default function DayNightThemeToggleDemo() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '440px',
        width: '100%',
        backgroundColor: isDark ? '#111827' : '#f3f4f6',
        color: isDark ? '#f3f4f6' : '#1f2937',
        transition: 'background-color 0.8s ease, color 0.8s ease',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        userSelect: 'none',
        padding: '24px',
        borderRadius: '24px',
      }}
    >
      <style>{\`
        @keyframes rotateSun {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 6px #ffffff; }
        }
      \`}</style>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0' }}>
          {isDark ? 'Gece Modu' : 'Gündüz Modu'}
        </h2>
        <p style={{ fontSize: '14px', opacity: 0.75, margin: 0 }}>
          Güneş ve ay gökyüzü animasyonu arasında geçiş yapmak için tıklayın.
        </p>
      </div>

      {/* Sky Pill Toggle Container */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Temayı Değiştir"
        onClick={() => setIsDark(!isDark)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsDark(!isDark);
          }
        }}
        style={{
          position: 'relative',
          width: '150px',
          height: '66px',
          backgroundColor: isDark ? '#1e3a8a' : '#87CEEB',
          borderRadius: '44px',
          cursor: 'pointer',
          border: isDark ? '2px solid #3b82f6' : '2px solid #60a5fa',
          boxShadow: 'inset 0 8px 30px rgba(0, 0, 0, 0.15), inset 0 -4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.8s ease',
          overflow: 'hidden',
          outline: 'none',
        }}
      >
        {/* Gece Yıldızları */}
        {[
          { top: 14, left: 32, size: 3, delay: '0s', dur: '2s' },
          { top: 28, left: 16, size: 2.5, delay: '0.4s', dur: '2.4s' },
          { top: 22, left: 54, size: 4, delay: '0.8s', dur: '3s' },
          { top: 40, left: 42, size: 2.5, delay: '1.2s', dur: '2.2s' },
          { top: 12, left: 74, size: 3.5, delay: '0.6s', dur: '2.6s' },
        ].map((star, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: \`\${star.top}px\`,
              left: \`\${star.left}px\`,
              width: \`\${star.size}px\`,
              height: \`\${star.size}px\`,
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              opacity: isDark ? 0.9 : 0,
              transform: isDark ? 'translateY(0)' : 'translateY(-40px)',
              transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: isDark ? \`twinkle \${star.dur} infinite ease-in-out \${star.delay}\` : 'none',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Gündüz Bulut 1 */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: '60px',
            width: '44px',
            height: '16px',
            backgroundColor: '#ffffff',
            borderRadius: '50px',
            opacity: isDark ? 0 : 0.92,
            transform: isDark ? 'translateY(60px)' : 'translateY(0)',
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              left: '6px',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '-5px',
              left: '24px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
            }}
          />
        </div>

        {/* Gündüz Bulut 2 */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '88px',
            width: '28px',
            height: '11px',
            backgroundColor: '#ffffff',
            borderRadius: '50px',
            opacity: isDark ? 0 : 0.75,
            transform: isDark ? 'translateY(60px)' : 'translateY(0)',
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-7px',
              left: '4px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              left: '14px',
              width: '11px',
              height: '11px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
            }}
          />
        </div>

        {/* Güneş / Ay Göstergesi (Indicator) */}
        <div
          style={{
            position: 'absolute',
            top: '6px',
            left: '6px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: isDark ? '#f3f4f6' : '#fbbf24',
            transform: isDark ? 'translateX(84px)' : 'translateX(0)',
            boxShadow: isDark
              ? '0 4px 12px rgba(243, 244, 246, 0.5), inset 0 -3px 8px rgba(0, 0, 0, 0.2)'
              : '0 4px 12px rgba(251, 191, 36, 0.55), inset 0 -3px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.8s ease, box-shadow 0.8s ease',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Güneş Işınları */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: isDark ? 0 : 1,
              transition: 'opacity 0.5s ease',
              animation: !isDark ? 'rotateSun 14s linear infinite' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <div
                key={angle}
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '10px',
                  backgroundColor: '#fbbf24',
                  borderRadius: '2px',
                  transform: \`rotate(\${angle}deg) translateY(-26px)\`,
                }}
              />
            ))}
          </div>

          {/* Ay Kraterleri (SVG) */}
          <svg
            viewBox="0 0 46 46"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: isDark ? 1 : 0,
              transition: 'opacity 0.5s ease',
              color: '#d1d5db',
            }}
          >
            <circle cx="14" cy="18" r="4.5" fill="currentColor" opacity="0.32" />
            <circle cx="28" cy="12" r="3.2" fill="currentColor" opacity="0.22" />
            <circle cx="24" cy="30" r="5.5" fill="currentColor" opacity="0.32" />
            <circle cx="10" cy="32" r="2.8" fill="currentColor" opacity="0.22" />
            <circle cx="36" cy="24" r="2.2" fill="currentColor" opacity="0.22" />
          </svg>
        </div>
      </div>
    </div>
  );
}
`,
  },
  mobileCode: {
    filename: "DayNightThemeToggle.native.tsx",
    dependencies: {
      "react-native-reanimated": "~3.16.0",
    },
    code: `import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';

export default function DayNightThemeToggleNative() {
  const [isDark, setIsDark] = useState(false);
  const progress = useSharedValue(0);
  const sunRotation = useSharedValue(0);

  React.useEffect(() => {
    sunRotation.value = withRepeat(
      withTiming(360, { duration: 14000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    progress.value = withTiming(next ? 1 : 0, {
      duration: 800,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  };

  const pillStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#87CEEB', '#1e3a8a']
    ),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#60a5fa', '#3b82f6']
    ),
  }));

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 76 }],
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#fbbf24', '#f3f4f6']
    ),
  }));

  const cloudsStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * 50 }],
    opacity: 1 - progress.value,
  }));

  const starsStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - progress.value) * -35 }],
    opacity: progress.value,
  }));

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111827' : '#f3f4f6' }]}>
      <Text style={[styles.title, { color: isDark ? '#f3f4f6' : '#1f2937' }]}>
        {isDark ? 'Gece Modu' : 'Gündüz Modu'}
      </Text>

      <Pressable onPress={toggle}>
        <Animated.View style={[styles.pill, pillStyle]}>
          {/* Gece Yıldızları */}
          <Animated.View style={[styles.starsContainer, starsStyle]}>
            <View style={[styles.star, { top: 12, left: 24, width: 3, height: 3 }]} />
            <View style={[styles.star, { top: 24, left: 14, width: 2.5, height: 2.5 }]} />
            <View style={[styles.star, { top: 18, left: 44, width: 3.5, height: 3.5 }]} />
            <View style={[styles.star, { top: 32, left: 36, width: 2.5, height: 2.5 }]} />
          </Animated.View>

          {/* Gündüz Bulutu */}
          <Animated.View style={[styles.cloud, cloudsStyle]}>
            <View style={styles.cloudPill} />
          </Animated.View>

          {/* Güneş / Ay */}
          <Animated.View style={[styles.indicator, indicatorStyle]} />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 380,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 24,
  },
  pill: {
    width: 140,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  cloud: {
    position: 'absolute',
    right: 20,
    top: 24,
  },
  cloudPill: {
    width: 38,
    height: 14,
    backgroundColor: '#ffffff',
    borderRadius: 7,
    opacity: 0.9,
  },
  indicator: {
    position: 'absolute',
    left: 5,
    width: 48,
    height: 48,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
});
`,
  },
};
