import { ComponentItem } from "../../schema";

export const edisonBulbPullChain: ComponentItem = {
  id: "edison-bulb-pull-chain",
  slug: "edison-bulb-pull-chain",
  title: "Vintage Bulb Pull-Chain Switch",
  category: "toggles",
  description: "Dark ve Light temalar arasındaki geçişleri nostaljik ve son derece estetik bir dokunuşa dönüştüren; interaktif fizik tabanlı salınan boncuklu zincir, pirinç duy ve kor filaman parlamasına sahip tema şalteri.",
  tags: ["toggle", "theme", "dark-mode", "light-mode", "pull-chain", "physics", "verlet-integration", "vintage", "glow", "canvas"],
  featured: true,
  webCode: {
    filename: "EdisonBulbPullChain.tsx",
    dependencies: {},
    code: `'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function EdisonBulbPullChainDemo() {
  const [isLit, setIsLit] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const anchor = anchorRef.current;
    if (!canvas || !container || !anchor) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const numPoints = 20;
    const segmentLength = 11;
    const gravity = 0.55;
    const friction = 0.992;
    const pullThreshold = 35;

    let points: { x: number; y: number; oldX: number; oldY: number; locked: boolean }[] = [];
    let isDragging = false;
    let dragPoint: { x: number; y: number; oldX: number; oldY: number; locked: boolean } | null = null;
    let startPullY = 0;
    let toggledThisPull = false;

    function resize() {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    function initChain() {
      points = [];
      const cRect = container?.getBoundingClientRect() || { left: 0, top: 0 };
      const aRect = anchor?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
      const startX = aRect.left - cRect.left + aRect.width / 2;
      const startY = aRect.top - cRect.top + aRect.height / 2;

      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: startX,
          y: startY + i * segmentLength,
          oldX: startX,
          oldY: startY + i * segmentLength,
          locked: i === 0,
        });
      }
    }

    function updatePhysics() {
      if (points.length === 0) return;
      const cRect = container?.getBoundingClientRect() || { left: 0, top: 0 };
      const aRect = anchor?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
      points[0].x = aRect.left - cRect.left + aRect.width / 2;
      points[0].y = aRect.top - cRect.top + aRect.height / 2;

      // Verlet Integration
      for (let i = 0; i < numPoints; i++) {
        const p = points[i];
        if (!p.locked) {
          const vx = (p.x - p.oldX) * friction;
          const vy = (p.y - p.oldY) * friction;
          p.oldX = p.x;
          p.oldY = p.y;
          p.x += vx;
          p.y += vy + gravity;
        }
      }

      // Constraints relaxation
      for (let iter = 0; iter < 5; iter++) {
        for (let i = 0; i < numPoints - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist === 0) continue;
          const diff = segmentLength - dist;
          const percent = diff / dist / 2;
          const ox = dx * percent;
          const oy = dy * percent;

          if (!p1.locked) {
            p1.x -= ox;
            p1.y -= oy;
          }
          if (!p2.locked) {
            p2.x += ox;
            p2.y += oy;
          }
        }
      }
    }

    function draw() {
      if (!ctx || !canvas || points.length === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connecting thread
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < numPoints; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = '#5c4013';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Brass beads
      for (let i = 0; i < numPoints; i++) {
        const p = points[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x - 1, p.y - 1, 0, p.x, p.y, 3.5);
        grad.addColorStop(0, '#e0b976');
        grad.addColorStop(0.6, '#b38842');
        grad.addColorStop(1, '#3a2709');
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Ceramic / Brass Pull Tassel Handle
      const lastP = points[numPoints - 1];
      const preP = points[numPoints - 2];
      const angle = Math.atan2(lastP.y - preP.y, lastP.x - preP.x);

      ctx.save();
      ctx.translate(lastP.x, lastP.y);
      ctx.rotate(angle - Math.PI / 2);

      ctx.beginPath();
      ctx.roundRect(-6, 0, 12, 22, [3, 3, 7, 7]);
      const handleGrad = ctx.createLinearGradient(-6, 0, 6, 0);
      handleGrad.addColorStop(0, '#f5f5f5');
      handleGrad.addColorStop(0.5, '#e0e0e0');
      handleGrad.addColorStop(1, '#9e9e9e');
      ctx.fillStyle = handleGrad;
      ctx.fill();
      ctx.strokeStyle = '#2d2d2d';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    }

    function loop() {
      updatePhysics();
      draw();
      animId = requestAnimationFrame(loop);
    }

    function getPos(e: MouseEvent | TouchEvent) {
      const cRect = container?.getBoundingClientRect() || { left: 0, top: 0 };
      if ('touches' in e && e.touches.length > 0) {
        return { x: e.touches[0].clientX - cRect.left, y: e.touches[0].clientY - cRect.top };
      }
      if ('changedTouches' in e && e.changedTouches.length > 0) {
        return { x: e.changedTouches[0].clientX - cRect.left, y: e.changedTouches[0].clientY - cRect.top };
      }
      const me = e as MouseEvent;
      return { x: me.clientX - cRect.left, y: me.clientY - cRect.top };
    }

    function onDown(e: MouseEvent | TouchEvent) {
      if (points.length === 0) return;
      const pos = getPos(e);
      const lastP = points[numPoints - 1];
      const dx = pos.x - lastP.x;
      const dy = pos.y - lastP.y;
      if (Math.sqrt(dx * dx + dy * dy) < 45) {
        isDragging = true;
        dragPoint = lastP;
        startPullY = pos.y;
        toggledThisPull = false;
        container?.style.setProperty('cursor', 'grabbing');
      }
    }

    function onMove(e: MouseEvent | TouchEvent) {
      if (points.length === 0) return;
      const pos = getPos(e);
      const lastP = points[numPoints - 1];

      if (!isDragging) {
        const dx = pos.x - lastP.x;
        const dy = pos.y - lastP.y;
        if (Math.sqrt(dx * dx + dy * dy) < 45) {
          canvas?.style.setProperty('cursor', 'grab');
        } else {
          canvas?.style.setProperty('cursor', 'default');
        }
        return;
      }

      if (dragPoint) {
        dragPoint.x = pos.x;
        dragPoint.y = pos.y;
        const pullDist = pos.y - startPullY;
        if (pullDist > pullThreshold && !toggledThisPull) {
          setIsLit((prev) => !prev);
          toggledThisPull = true;
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(40);
          }
        }
      }
    }

    function onUp(e: MouseEvent | TouchEvent) {
      if (isDragging) {
        isDragging = false;
        dragPoint = null;
        container?.style.setProperty('cursor', 'default');
        const pos = getPos(e);
        const pullDist = pos.y - startPullY;
        if (pullDist < 15 && !toggledThisPull) {
          setIsLit((prev) => !prev);
          points[numPoints - 1].oldX = points[numPoints - 1].x - 18;
          points[numPoints - 1].y += 35;
        } else if (toggledThisPull) {
          points[numPoints - 1].oldX = points[numPoints - 1].x - 14;
        }
      }
    }

    resize();
    initChain();
    loop();

    window.addEventListener('resize', () => {
      resize();
      initChain();
    });

    const c = canvas;
    c.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    c.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);

    return () => {
      cancelAnimationFrame(animId);
      c.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      c.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '480px',
        backgroundColor: isLit ? '#121216' : '#f4f4f9',
        color: isLit ? '#f0f0f0' : '#2c2c35',
        transition: 'background-color 0.7s ease, color 0.5s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '24px',
        padding: '32px 20px',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Ambient Room Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isLit
            ? 'radial-gradient(circle at 65% 180px, rgba(255, 120, 0, 0.22) 0%, rgba(255, 60, 0, 0.08) 45%, transparent 75%)'
            : 'none',
          pointerEvents: 'none',
          opacity: isLit ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Info Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: '440px',
          backgroundColor: isLit ? 'rgba(30, 30, 36, 0.85)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '28px',
          border: isLit ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
          boxShadow: isLit ? '0 12px 36px rgba(0,0,0,0.45)' : '0 10px 30px rgba(0,0,0,0.05)',
          transition: 'all 0.5s ease',
          textAlign: 'center',
          marginTop: '60px',
        }}
      >
        <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>
          {isLit ? 'Karanlık Mod (Kor Filaman)' : 'Aydınlık Mod (Nostaljik)'}
        </h2>
        <p style={{ fontSize: '13.5px', opacity: 0.78, margin: '0 0 16px 0', lineHeight: 1.6 }}>
          Sağdaki pirinç zinciri aşağı çekip bırakın. Dark ve Light temalar arasındaki geçişleri nostaljik ve estetik bir dokunuşa dönüştürür.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <span
            style={{
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '20px',
              backgroundColor: isLit ? 'rgba(255, 120, 0, 0.15)' : 'rgba(0,0,0,0.05)',
              color: isLit ? '#ff8c00' : '#666',
              fontWeight: 600,
            }}
          >
            Vintage ST64
          </span>
          <span
            style={{
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '20px',
              backgroundColor: isLit ? 'rgba(255, 120, 0, 0.15)' : 'rgba(0,0,0,0.05)',
              color: isLit ? '#ff8c00' : '#666',
              fontWeight: 600,
            }}
          >
            Verlet Physics
          </span>
          <span
            style={{
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '20px',
              backgroundColor: isLit ? 'rgba(255, 120, 0, 0.15)' : 'rgba(0,0,0,0.05)',
              color: isLit ? '#ff8c00' : '#666',
              fontWeight: 600,
            }}
          >
            Pull-Chain Switch
          </span>
        </div>
      </div>

      {/* Vintage Lamp Fixture */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '22%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* Fabric Cable */}
        <div
          style={{
            width: '6px',
            height: '50px',
            background: 'repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 2px, #2a2a2a 2px, #2a2a2a 4px)',
            boxShadow: 'inset -2px 0 3px rgba(0,0,0,0.5)',
          }}
        />

        {/* Chain Ceiling Anchor Mount */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: '-54px',
            width: '20px',
            height: '14px',
            background: 'linear-gradient(to bottom, #5c4013, #e0b976, #5c4013)',
            borderRadius: '0 0 10px 10px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.4)',
          }}
        >
          <div
            ref={anchorRef}
            style={{
              position: 'absolute',
              bottom: '-2px',
              left: '7px',
              width: '6px',
              height: '6px',
              backgroundColor: '#111',
              borderRadius: '50%',
            }}
          />
        </div>

        {/* Brass Socket Top Base */}
        <div
          style={{
            width: '42px',
            height: '12px',
            background: 'linear-gradient(to right, #5c4013, #e0b976, #5c4013)',
            borderRadius: '4px 4px 0 0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
          }}
        />

        {/* Ribbed Socket Body */}
        <div
          style={{
            width: '48px',
            height: '38px',
            background: 'repeating-linear-gradient(to bottom, #5c4013 0px, #e0b976 3px, #5c4013 5px)',
            borderRadius: '2px',
            boxShadow: 'inset 8px 0 8px rgba(0,0,0,0.3), inset -4px 0 4px rgba(255,255,255,0.2), 0 3px 5px rgba(0,0,0,0.3)',
          }}
        />

        {/* Brass Socket Rim */}
        <div
          style={{
            width: '54px',
            height: '10px',
            background: 'linear-gradient(to right, #5c4013, #e0b976, #5c4013)',
            borderRadius: '2px 2px 4px 4px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
          }}
        />

        {/* Teardrop ST64 Glass Bulb */}
        <div style={{ position: 'relative', marginTop: '-4px', display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              position: 'relative',
              width: '82px',
              height: '126px',
              borderRadius: '40% 40% 50% 50% / 30% 30% 65% 65%',
              background: isLit
                ? 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.4) 0%, rgba(255, 160, 50, 0.25) 60%, rgba(150, 80, 20, 0.4) 100%)'
                : 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.4) 0%, rgba(255, 230, 200, 0.35) 60%, rgba(150, 80, 20, 0.2) 100%)',
              border: isLit ? '1px solid rgba(255, 180, 50, 0.8)' : '1px solid rgba(255, 200, 100, 0.4)',
              boxShadow: isLit
                ? 'inset -5px -5px 15px rgba(0,0,0,0.1), inset 10px 10px 20px rgba(255,255,255,0.4), 0 0 70px 25px rgba(255, 120, 0, 0.8), 0 0 30px 8px rgba(255, 160, 0, 0.7)'
                : 'inset -5px -5px 12px rgba(0,0,0,0.08), inset 8px 8px 16px rgba(255,255,255,0.3)',
              transition: 'all 0.5s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Filament Structure */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                height: '92px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Cage Wires (Edison loops) */}
              <div style={{ position: 'relative', width: '38px', height: '68px', marginTop: '6px' }}>
                {[1, 0.6, 0.25].map((scale, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: isLit ? '1.5px solid #ff5e00' : '1px solid rgba(0,0,0,0.3)',
                      borderBottom: 'none',
                      borderRadius: '18px 18px 0 0',
                      transform: 'scaleX(' + scale + ')',
                      boxShadow: isLit
                        ? '0 0 6px #ff4500, inset 0 0 6px #ff4500, 0 0 12px #ff8c00'
                        : 'none',
                      filter: isLit ? 'drop-shadow(0 0 2px #fff)' : 'none',
                      transition: 'all 0.25s ease',
                    }}
                  />
                ))}
              </div>

              {/* Glass Stem */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-14px',
                  width: '6px',
                  height: '40px',
                  background: 'linear-gradient(to right, rgba(0,0,0,0.1), rgba(255,255,255,0.25), rgba(0,0,0,0.1))',
                  borderRadius: '3px',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Verlet Physics Chain Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 20,
          pointerEvents: 'auto',
        }}
      />
    </div>
  );
}
`,
  },
  mobileCode: {
    filename: "EdisonBulbPullChain.native.tsx",
    dependencies: {
      "react-native-reanimated": "^3.16.0",
      "react-native-gesture-handler": "~2.20.2",
    },
    code: `import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function EdisonBulbPullChainNative() {
  const [isLit, setIsLit] = useState(false);
  const pullY = useSharedValue(0);

  const toggleBulb = () => {
    setIsLit((prev) => !prev);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        pullY.value = Math.min(e.translationY, 60);
      }
    })
    .onEnd(() => {
      if (pullY.value > 30) {
        runOnJS(toggleBulb)();
      }
      pullY.value = withSpring(0, { damping: 8, stiffness: 120 });
    });

  const chainAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pullY.value }],
  }));

  const bulbGlowStyle = useAnimatedStyle(() => ({
    opacity: withSpring(isLit ? 1 : 0),
  }));

  return (
    <View style={[styles.container, { backgroundColor: isLit ? '#121216' : '#f4f4f9' }]}>
      {/* Title */}
      <Text style={[styles.title, { color: isLit ? '#f0f0f0' : '#2c2c35' }]}>
        {isLit ? 'Karanlık Mod (Kor Filaman)' : 'Aydınlık Mod'}
      </Text>
      <Text style={[styles.subtitle, { color: isLit ? '#aaa' : '#666' }]}>
        Pirinç zinciri aşağı çekip bırakın.
      </Text>

      {/* Fixture Container */}
      <View style={styles.fixture}>
        {/* Cable */}
        <View style={styles.cable} />

        {/* Brass Socket */}
        <View style={styles.socketBase} />
        <View style={styles.socketBody} />
        <View style={styles.socketRim} />

        {/* Vintage Bulb */}
        <View style={[styles.bulbGlass, isLit && styles.bulbGlassLit]}>
          <Animated.View style={[styles.glowOverlay, bulbGlowStyle]} />
          {/* Filaments */}
          <View style={[styles.filament, isLit && styles.filamentLit]} />
          <View style={[styles.filamentInner, isLit && styles.filamentLit]} />
        </View>

        {/* Beaded Chain */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.chainContainer, chainAnimatedStyle]}>
            <View style={styles.chainMount} />
            {[...Array(14)].map((_, i) => (
              <View key={i} style={styles.bead} />
            ))}
            {/* Tassel Handle */}
            <View style={styles.tasselHandle} />
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 40,
  },
  fixture: {
    alignItems: 'center',
    position: 'relative',
    height: 320,
    width: 200,
  },
  cable: {
    width: 6,
    height: 40,
    backgroundColor: '#222',
  },
  socketBase: {
    width: 40,
    height: 10,
    backgroundColor: '#b38842',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  socketBody: {
    width: 46,
    height: 32,
    backgroundColor: '#8a6428',
  },
  socketRim: {
    width: 52,
    height: 8,
    backgroundColor: '#b38842',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  bulbGlass: {
    width: 80,
    height: 120,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 230, 200, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 200, 100, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bulbGlassLit: {
    borderColor: '#ff8c00',
    backgroundColor: 'rgba(255, 140, 0, 0.2)',
  },
  glowOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 120, 0, 0.25)',
  },
  filament: {
    width: 34,
    height: 60,
    borderWidth: 1,
    borderColor: '#555',
    borderBottomWidth: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  filamentInner: {
    position: 'absolute',
    width: 18,
    height: 60,
    borderWidth: 1,
    borderColor: '#555',
    borderBottomWidth: 0,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  filamentLit: {
    borderColor: '#ff4500',
    borderWidth: 1.5,
    shadowColor: '#ff8c00',
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  chainContainer: {
    position: 'absolute',
    top: 2,
    right: 18,
    alignItems: 'center',
  },
  chainMount: {
    width: 14,
    height: 8,
    backgroundColor: '#b38842',
    borderRadius: 3,
    marginBottom: 4,
  },
  bead: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e0b976',
    marginVertical: 1,
  },
  tasselHandle: {
    width: 12,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#666',
    marginTop: 2,
  },
});
`,
  },
};
