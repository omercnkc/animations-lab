import { ComponentItem } from "../../schema";

export const themeToggle: ComponentItem = {
  id: "theme-toggle",
  slug: "theme-toggle",
  title: "Morphing Theme Switch",
  category: "toggles",
  description: "A smooth spring switch that morphs between Sun and Moon states with rotating rays and a crescent mask.",
  tags: ["framer-motion", "svg-morphing", "theme-toggle", "micro-interaction"],
  featured: true,
  webCode: {
    filename: "ThemeToggle.tsx",
    dependencies: {
      "framer-motion": "^12.0.0",
      "lucide-react": "^0.475.0",
    },
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggleDemo() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 bg-neutral-950 p-8">
      <button
        onClick={() => setIsDark(!isDark)}
        className="relative flex h-14 w-28 items-center rounded-full border border-neutral-700 bg-neutral-900 p-1.5 shadow-2xl transition-colors hover:border-neutral-500"
        aria-label="Toggle theme"
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 text-white shadow-lg"
          style={{ marginLeft: isDark ? 'auto' : '0' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="h-5 w-5 text-indigo-100" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="h-5 w-5 text-amber-200" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </button>
      <span className="text-xs uppercase tracking-wider text-neutral-400">
        Current Mode: {isDark ? 'Dark (Night)' : 'Light (Day)'}
      </span>
    </div>
  );
}
`,
  },
  mobileCode: {
    filename: "ThemeToggle.native.tsx",
    dependencies: {
      "react-native-reanimated": "~3.16.0",
      "lucide-react-native": "^0.475.0",
    },
    code: `import React, { useState } from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

export default function ThemeToggleMobile() {
  const [isDark, setIsDark] = useState(true);
  const offset = useSharedValue(44);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    offset.value = withSpring(next ? 44 : 0, { damping: 15, stiffness: 220 });
  };

  const animatedThumb = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <View style={styles.container}>
      <Pressable onPress={toggle} style={styles.track}>
        <Animated.View style={[styles.thumb, animatedThumb]}>
          <Text style={styles.icon}>{isDark ? '🌙' : '☀️'}</Text>
        </Animated.View>
      </Pressable>
      <Text style={styles.statusText}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
    gap: 12,
  },
  track: {
    width: 96,
    height: 52,
    borderRadius: 999,
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#3f3f46',
    padding: 4,
    justifyContent: 'center',
  },
  thumb: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  statusText: {
    color: '#a1a1aa',
    fontSize: 13,
  },
});
`,
  },
};
