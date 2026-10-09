import { ComponentItem } from "../../schema";

export const magneticButton: ComponentItem = {
  id: "magnetic-button",
  slug: "magnetic-button",
  title: "Magnetic Button",
  category: "buttons",
  description: "A button that smoothly pulls toward the cursor or touch pointer using spring physics.",
  tags: ["framer-motion", "spring-physics", "magnetic", "cursor-interaction"],
  featured: true,
  webCode: {
    filename: "MagneticButton.tsx",
    dependencies: {
      "framer-motion": "^12.0.0",
      "lucide-react": "^0.475.0",
    },
    code: `'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function MagneticButtonDemo() {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Attract towards cursor with 0.35 dampening
    setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="flex min-h-[300px] items-center justify-center bg-neutral-950 p-8">
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex items-center gap-3 rounded-full border border-neutral-700 bg-neutral-900/80 px-8 py-4 font-medium text-white shadow-xl backdrop-blur-md transition-colors hover:border-violet-500 hover:bg-neutral-900"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-400 transition-transform group-hover:rotate-12" />
          <span>Magnetic Glow</span>
        </span>
        <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
      </motion.button>
    </div>
  );
}
`,
  },
  mobileCode: {
    filename: "MagneticButton.native.tsx",
    dependencies: {
      "react-native-reanimated": "~3.16.0",
      "react-native-gesture-handler": "~2.20.0",
      "lucide-react-native": "^0.475.0",
    },
    code: `import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function MagneticButtonMobile() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      // Pull towards touch with dampening factor
      translateX.value = event.translationX * 0.35;
      translateY.value = event.translationY * 0.35;
    })
    .onEnd(() => {
      // Spring back to origin on touch release
      translateX.value = withSpring(0, { damping: 12, stiffness: 180 });
      translateY.value = withSpring(0, { damping: 12, stiffness: 180 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.button, animatedStyle]}>
          <Text style={styles.text}>✨ Drag / Touch Me</Text>
        </Animated.View>
      </GestureDetector>
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
  button: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 999,
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#8b5cf6',
  },
  text: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
`,
  },
};
