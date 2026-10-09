import { ComponentItem } from "../../schema";

export const tiltCard: ComponentItem = {
  id: "tilt-card",
  slug: "tilt-card",
  title: "3D Perspective Tilt Card",
  category: "cards",
  description: "An interactive card that calculates pointer angle to tilt in 3D space with a reactive holographic glare reflection.",
  tags: ["framer-motion", "3d-transform", "tilt", "glare", "cards"],
  featured: true,
  webCode: {
    filename: "TiltCard.tsx",
    dependencies: {
      "framer-motion": "^12.0.0",
      "lucide-react": "^0.475.0",
    },
    code: `'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function TiltCardDemo() {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17deg', '-17deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17deg', '17deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex min-h-[360px] items-center justify-center bg-neutral-950 p-8 [perspective:1000px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-80 w-64 rounded-2xl border border-neutral-700/80 bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 p-6 shadow-2xl backdrop-blur-xl"
      >
        <div style={{ transform: 'translateZ(50px)' }} className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="rounded-lg bg-violet-500/20 p-2 text-violet-400">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <Sparkles className="h-4 w-4 text-neutral-400" />
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400">
              Founder Pass
            </span>
            <h3 className="mt-1 text-xl font-bold text-white">Quantum Access</h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-400">
              Move your mouse around to trigger 3D perspective rotation and lighting.
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-neutral-800 pt-3">
            <span className="text-[10px] font-mono text-neutral-500">ID: #4092-X</span>
            <span className="text-xs font-semibold text-emerald-400">Verified</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
`,
  },
  mobileCode: {
    filename: "TiltCard.native.tsx",
    dependencies: {
      "react-native-reanimated": "~3.16.0",
      "react-native-gesture-handler": "~2.20.0",
    },
    code: `import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export default function TiltCardMobile() {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      rotateX.value = -event.translationY * 0.15;
      rotateY.value = event.translationX * 0.15;
    })
    .onEnd(() => {
      rotateX.value = withSpring(0, { damping: 14 });
      rotateY.value = withSpring(0, { damping: 14 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { rotateX: \`\${rotateX.value}deg\` },
      { rotateY: \`\${rotateY.value}deg\` },
    ],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Text style={styles.badge}>FOUNDER CARD</Text>
          <Text style={styles.title}>3D Tilt Pan</Text>
          <Text style={styles.subtitle}>Drag to tilt this card</Text>
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
  card: {
    width: 240,
    height: 320,
    borderRadius: 20,
    backgroundColor: '#18181b',
    borderWidth: 1.5,
    borderColor: '#6366f1',
    padding: 24,
    justifyContent: 'space-between',
  },
  badge: {
    color: '#818cf8',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: 14,
  },
});
`,
  },
};
