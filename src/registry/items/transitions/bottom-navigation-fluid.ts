import { ComponentItem } from "../../schema";

export const bottomNavigationFluid: ComponentItem = {
  id: "bottom-navigation-fluid",
  slug: "bottom-navigation-fluid",
  title: "Fluid Shooting-Line Bottom Navigation",
  category: "transitions",
  description: "An interactive tab bar with a shooting SVG stroke that travels between tabs, encircles the target icon, and lifts it with spring physics.",
  tags: ["navigation", "bottom-bar", "svg-path-animation", "shooting-line", "micro-interaction"],
  featured: true,
  webCode: {
    filename: "FluidBottomNav.tsx",
    dependencies: {
      "lucide-react": "^0.475.0",
    },
    code: `'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Home, Package, Plus, Bell, User } from 'lucide-react';

const COLORS = {
  primary: '#4648d4',
  onPrimary: '#ffffff',
  primaryContainer: '#6063ee',
  tertiary: '#006c49',
  warning: '#d97706',
  error: '#ba1a1a',
  background: '#f8f9ff',
  onSurface: '#121c2a',
  secondary: '#5c5f60',
  surfaceContainerLowest: '#ffffff',
};

const TABS = [
  { id: 'home', title: 'Ana Sayfa', icon: Home, color: COLORS.primary },
  { id: 'products', title: 'Ürünler', icon: Package, color: COLORS.tertiary },
  { id: 'add', title: 'Ekle', icon: Plus, color: COLORS.primaryContainer },
  { id: 'notifications', title: 'Bildirimler', icon: Bell, color: COLORS.error },
  { id: 'profile', title: 'Profil', icon: User, color: COLORS.warning },
];

const TAB_BAR_WIDTH = 380;
const TAB_WIDTH = TAB_BAR_WIDTH / TABS.length;

const SPRING_TRANSITION = 'all 0.5s cubic-bezier(0.34, 1.3, 0.64, 1)';
const SMOOTH_TRANSITION = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

const cssStyles = \`
  .bead-wrapper {
    position: absolute;
    bottom: 36px;
    left: 50%;
    margin-left: -24px;
    width: 48px;
    height: 48px;
    pointer-events: none;
    z-index: 10;
  }

  .glow-bead {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    border-radius: 50%;
    transform: scale(0);
    opacity: 0;
    transition: transform 0.2s, opacity 0.2s;
  }
  .glow-bead.active {
    transform: scale(1.3);
    opacity: 0.25;
    transition: transform 0.5s cubic-bezier(0.34, 1.3, 0.64, 1) 0.3s, opacity 0.5s 0.3s;
  }

  .solid-bead {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    border-radius: 50%;
    transform: scale(0);
    opacity: 0;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s;
  }
  .solid-bead.active {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 4px 12px rgba(18, 28, 42, 0.2);
    transition: transform 0.4s cubic-bezier(0.34, 1.3, 0.64, 1) 0.3s, opacity 0.2s 0.3s;
  }
\`;

export default function FluidBottomNavDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '380px', width: '100%', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{cssStyles}</style>

      <div style={{ marginBottom: '44px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: TABS[activeIndex].color, transition: 'color 0.3s ease' }}>
          {TABS[activeIndex].title}
        </h3>
        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
          Sekmeler arasında geçiş yaparak uçan çizgi animasyonunu deneyimleyin.
        </p>
      </div>

      <TabBar activeIndex={activeIndex} onTabPress={setActiveIndex} />
    </div>
  );
}

function TabBar({ activeIndex, onTabPress }: { activeIndex: number; onTabPress: (index: number) => void }) {
  const [lines, setLines] = useState<any[]>([]);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;

    const startX = activeIndex * TAB_WIDTH + TAB_WIDTH / 2;
    const endX = index * TAB_WIDTH + TAB_WIDTH / 2;
    const newId = Date.now();

    setLines((prev) => [...prev, { id: newId, x1: startX, x2: endX, color: TABS[index].color }]);

    setTimeout(() => {
      setLines((prev) => prev.filter((l) => l.id !== newId));
    }, 700);

    onTabPress(index);
  };

  return (
    <div style={{ position: 'relative', width: TAB_BAR_WIDTH, height: '90px' }}>
      {/* Beyaz Kapsayıcı Zemin */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '72px',
          backgroundColor: COLORS.surfaceContainerLowest,
          borderRadius: '36px',
          boxShadow: '0 12px 28px rgba(18, 28, 42, 0.08), 0 2px 6px rgba(18, 28, 42, 0.04)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
        }}
      />

      {/* Sürekli Çizgi Overlay'i */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 15 }}>
        {lines.map((line) => (
          <ShootingLine key={line.id} x1={line.x1} x2={line.x2} color={line.color} />
        ))}
      </svg>

      {/* Tıklanabilir Sekme Alanları */}
      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '72px', display: 'flex', zIndex: 20 }}>
        {TABS.map((tab, index) => (
          <TabItem
            key={tab.id}
            tab={tab}
            isActive={activeIndex === index}
            onPress={() => handleTabClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

function TabItem({ tab, isActive, onPress }: { tab: any; isActive: boolean; onPress: () => void }) {
  const Icon = tab.icon;

  return (
    <button
      onClick={onPress}
      style={{
        flex: 1,
        height: '100%',
        position: 'relative',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <div className="bead-wrapper">
        <div className={\`glow-bead \${isActive ? 'active' : ''}\`} style={{ backgroundColor: tab.color }} />
        <div className={\`solid-bead \${isActive ? 'active' : ''}\`} style={{ backgroundColor: tab.color }} />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          marginLeft: '-20px',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isActive ? 'translateY(-28px) scale(1.05)' : 'translateY(0) scale(1)',
          transition: SPRING_TRANSITION,
          zIndex: 30,
        }}
      >
        <div
          style={{
            position: 'absolute',
            opacity: isActive ? 0 : 1,
            transition: \`opacity 0.2s \${isActive ? '0.3s' : '0s'}\`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={24} color={COLORS.secondary} strokeWidth={2.5} />
        </div>

        <div
          style={{
            position: 'absolute',
            opacity: isActive ? 1 : 0,
            transition: \`opacity 0.2s \${isActive ? '0.3s' : '0s'}\`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={24} color={COLORS.onPrimary} strokeWidth={2.5} />
        </div>
      </div>

      <span
        style={{
          position: 'absolute',
          bottom: '8px',
          fontSize: '11px',
          fontWeight: 700,
          color: COLORS.onSurface,
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(12px)',
          transition: SMOOTH_TRANSITION,
          whiteSpace: 'nowrap',
        }}
      >
        {tab.title}
      </span>
    </button>
  );
}

function ShootingLine({ x1, x2, color }: { x1: number; x2: number; color: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const isRight = x2 > x1;
  const lineLength = Math.abs(x2 - x1);
  const circleCircumference = 141.37;

  const pathData = isRight
    ? \`M \${x1} 52.5 L \${x2} 52.5 A 22.5 22.5 0 1 0 \${x2 - 0.01} 52.5\`
    : \`M \${x1} 52.5 L \${x2} 52.5 A 22.5 22.5 0 1 1 \${x2 + 0.01} 52.5\`;

  useEffect(() => {
    if (!pathRef.current) return;
    const anim = pathRef.current.animate(
      [
        { strokeDashoffset: \`\${circleCircumference}px\`, opacity: 1 },
        { strokeDashoffset: \`-\${lineLength}px\`, opacity: 1, offset: 0.72 },
        { strokeDashoffset: \`-\${lineLength}px\`, opacity: 0, offset: 1 },
      ],
      {
        duration: 450,
        easing: 'cubic-bezier(0.35, 0.1, 0.25, 1)',
        fill: 'forwards',
      }
    );
    return () => anim.cancel();
  }, [x1, x2, lineLength]);

  return (
    <path
      ref={pathRef}
      d={pathData}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      style={{
        strokeDasharray: \`\${circleCircumference} 9999\`,
        strokeDashoffset: circleCircumference,
      }}
    />
  );
}
`,
  },
  mobileCode: {
    filename: "FluidBottomNav.native.tsx",
    dependencies: {
      "react-native-reanimated": "~3.16.0",
      "lucide-react-native": "^0.475.0",
    },
    code: `import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Home, Package, Plus, Bell, User } from 'lucide-react-native';

const TABS = [
  { id: 'home', title: 'Ana Sayfa', icon: Home, color: '#4648d4' },
  { id: 'products', title: 'Ürünler', icon: Package, color: '#006c49' },
  { id: 'add', title: 'Ekle', icon: Plus, color: '#6063ee' },
  { id: 'notifications', title: 'Bildirimler', icon: Bell, color: '#ba1a1a' },
  { id: 'profile', title: 'Profil', icon: User, color: '#d97706' },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const TAB_BAR_WIDTH = Math.min(SCREEN_WIDTH - 32, 380);
const TAB_WIDTH = TAB_BAR_WIDTH / TABS.length;

export default function FluidBottomNavMobile() {
  const [activeIndex, setActiveIndex] = useState(0);
  const indicatorX = useSharedValue(TAB_WIDTH / 2);

  const handleTabPress = (index: number) => {
    setActiveIndex(index);
    indicatorX.value = withSpring(index * TAB_WIDTH + TAB_WIDTH / 2, {
      stiffness: 240,
      damping: 20,
    });
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value - 24 }],
  }));

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: TABS[activeIndex].color }]}>
        {TABS[activeIndex].title}
      </Text>

      <View style={[styles.tabBar, { width: TAB_BAR_WIDTH }]}>
        {/* Animated Active Bead */}
        <Animated.View
          style={[
            styles.bead,
            indicatorStyle,
            { backgroundColor: TABS[activeIndex].color },
          ]}
        />

        {/* Tab Items */}
        {TABS.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeIndex === index;

          return (
            <Pressable
              key={tab.id}
              style={styles.tabItem}
              onPress={() => handleTabPress(index)}
            >
              <View style={[styles.iconWrap, isActive && styles.iconActive]}>
                <Icon
                  size={22}
                  color={isActive ? '#ffffff' : '#5c5f60'}
                  strokeWidth={2.5}
                />
              </View>
              {isActive && (
                <Text style={styles.tabTitle}>{tab.title}</Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b0d13',
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 40,
  },
  tabBar: {
    height: 72,
    backgroundColor: '#ffffff',
    borderRadius: 36,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    position: 'relative',
  },
  bead: {
    position: 'absolute',
    top: -12,
    width: 48,
    height: 48,
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  tabItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconActive: {
    transform: [{ translateY: -16 }],
  },
  tabTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#121c2a',
    position: 'absolute',
    bottom: 8,
  },
});
`,
  },
};
