import { ComponentItem } from "../../schema";

export const shimmerButton: ComponentItem = {
  id: "shimmer-button",
  slug: "shimmer-button",
  title: "Neon Shimmer & Border Glow Button",
  category: "buttons",
  description: "A futuristic button with continuous rotating conic border shimmer and radiant glow effects.",
  tags: ["framer-motion", "conic-gradient", "glow", "neon", "button"],
  featured: true,
  webCode: {
    filename: "ShimmerButton.tsx",
    dependencies: {
      "framer-motion": "^12.0.0",
      "lucide-react": "^0.475.0",
    },
    code: `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function ShimmerButtonDemo() {
  return (
    <div className="flex min-h-[300px] items-center justify-center bg-neutral-950 p-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full p-[2px] focus:outline-none"
      >
        {/* Animated rotating border shimmer */}
        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e2e8f0_0%,#a855f7_50%,#6366f1_100%)] opacity-80 group-hover:opacity-100" />

        {/* Button body */}
        <span className="inline-flex h-full w-full items-center gap-2.5 rounded-full bg-neutral-950 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-3xl transition-colors group-hover:bg-neutral-900">
          <Zap className="h-4 w-4 text-violet-400 transition-transform group-hover:scale-125" />
          <span>Activate Shimmer</span>
        </span>

        {/* Ambient shadow glow */}
        <span className="absolute inset-0 -z-10 rounded-full bg-violet-600/30 blur-xl transition-all duration-300 group-hover:bg-violet-600/60" />
      </motion.button>
    </div>
  );
}
`,
  },
  mobileCode: {
    filename: "ShimmerButton.native.tsx",
    dependencies: {
      "react-native-reanimated": "~3.16.0",
    },
    code: `import React, { useEffect } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

export default function ShimmerButtonMobile() {
  const glowOpacity = useSharedValue(0.4);

  useEffect(() => {
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, [glowOpacity]);

  const animatedGlow = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.glowBackground, animatedGlow]} />
      <Pressable style={styles.button}>
        <Text style={styles.text}>⚡ Neon Pulse Button</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
  },
  glowBackground: {
    position: 'absolute',
    width: 220,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8b5cf6',
    shadowColor: '#a855f7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 15,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
    backgroundColor: '#09090b',
    borderWidth: 1.5,
    borderColor: '#c084fc',
    zIndex: 1,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
`,
  },
};
