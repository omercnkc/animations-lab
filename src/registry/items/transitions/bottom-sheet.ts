import { ComponentItem } from "../../schema";

export const bottomSheet: ComponentItem = {
  id: "bottom-sheet",
  slug: "bottom-sheet",
  title: "Interactive Spring Bottom Sheet",
  category: "transitions",
  description: "A drag-dismissible modal sheet with physics-based spring dampening, backdrop blur, and touch gestures.",
  tags: ["framer-motion", "drag-to-dismiss", "bottom-sheet", "modal", "transitions"],
  featured: true,
  webCode: {
    filename: "BottomSheet.tsx",
    dependencies: {
      "framer-motion": "^12.0.0",
      "lucide-react": "^0.475.0",
    },
    code: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, X, Bell, Shield, Heart } from 'lucide-react';

export default function BottomSheetDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex min-h-[350px] items-center justify-center bg-neutral-950 p-6">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <ChevronUp className="h-4 w-4" />
        <span>Open Bottom Sheet</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80) setIsOpen(false);
              }}
              className="absolute bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t border-neutral-700 bg-neutral-900/95 p-6 shadow-2xl backdrop-blur-xl"
            >
              {/* Drag Handle */}
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-neutral-600" />

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Action Sheet</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-2 text-xs text-neutral-400">
                Drag down or click outside to dismiss with realistic spring physics.
              </p>

              <div className="mt-6 flex flex-col gap-2.5">
                <div className="flex items-center gap-3 rounded-xl bg-neutral-800/60 p-3 text-sm text-neutral-200">
                  <Bell className="h-4 w-4 text-violet-400" />
                  <span>Push Notifications Enabled</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-neutral-800/60 p-3 text-sm text-neutral-200">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <span>Biometric Security On</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
`,
  },
  mobileCode: {
    filename: "BottomSheet.native.tsx",
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

export default function BottomSheetMobile() {
  const translateY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) translateY.value = e.translationY;
    })
    .onEnd(() => {
      translateY.value = withSpring(0, { damping: 20 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.sheet, animatedStyle]}>
          <View style={styles.handle} />
          <Text style={styles.title}>Reanimated Bottom Sheet</Text>
          <Text style={styles.body}>Drag down on mobile to experience 120 FPS gesture physics.</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#0a0a0a',
  },
  sheet: {
    height: 280,
    backgroundColor: '#18181b',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: '#3f3f46',
    padding: 20,
    alignItems: 'center',
  },
  handle: {
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#71717a',
    marginBottom: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  body: {
    color: '#a1a1aa',
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },
});
`,
  },
};
