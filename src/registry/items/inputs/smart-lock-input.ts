import { ComponentItem } from "../../schema";

export const smartLockInput: ComponentItem = {
  id: "smart-lock-input",
  slug: "smart-lock-input",
  title: "Interactive Animated Padlock",
  category: "inputs",
  description: "Realistic padlock animation with shackle pivot open rotation on success and sequence shake physics on error.",
  tags: ["authentication", "inputs", "padlock", "micro-interaction", "shake-animation"],
  featured: true,
  webCode: {
    filename: "SmartLockInput.tsx",
    dependencies: {},
    code: `'use client';

import React, { useState } from 'react';

export default function SmartLockDemo() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [shaking, setShaking] = useState(false);

  const handleSuccess = () => {
    setStatus('success');
  };

  const handleError = () => {
    setStatus('error');
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
    }, 450);
  };

  const handleReset = () => {
    setStatus('idle');
  };

  const isUnlocked = status === 'success';
  const lockColor = status === 'success' ? '#006c49' : status === 'error' ? '#ba1a1a' : '#2196F3';

  return (
    <div style={{
      width: '100%',
      maxWidth: '360px',
      margin: '0 auto',
      padding: '28px 24px',
      borderRadius: '20px',
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      textAlign: 'center',
      boxSizing: 'border-box'
    }}>
      <style>{\`
        @keyframes lock-shake {
          0%, 100% { transform: translateX(0); }
          15%, 45%, 75% { transform: translateX(-8px); }
          30%, 60%, 90% { transform: translateX(8px); }
        }
        .anim-shake {
          animation: lock-shake 0.45s ease-in-out both;
        }
        .btn-success:hover { background-color: #00563b !important; }
        .btn-error:hover { background-color: #9c1515 !important; }
        .btn-reset:hover { color: #1e293b !important; }
      \`}</style>

      {/* Başlık */}
      <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0' }}>
        Akıllı Kilit Simülasyonu
      </h2>
      <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px 0' }}>
        Animasyonu tetiklemek için aşağıdaki butonlara basın.
      </p>

      {/* Kilit Alanı */}
      <div
        className={shaking ? 'anim-shake' : ''}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '110px',
          marginBottom: '20px',
          userSelect: 'none'
        }}
      >
        <svg
          width="80"
          height="88"
          viewBox="0 0 80 88"
          fill="none"
          style={{ overflow: 'visible', filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.12))' }}
        >
          {/* Kilit Halkası (Shackle Pivot) */}
          <g
            style={{
              transformOrigin: '24px 40px',
              transform: isUnlocked ? 'translateY(-10px) rotate(-28deg)' : 'translateY(0) rotate(0)',
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <path
              d="M 24 50 L 24 24 A 16 16 0 0 1 56 24 L 56 40"
              stroke={lockColor}
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: 'stroke 0.3s ease' }}
            />
          </g>

          {/* Kilit Gövdesi (Body) */}
          <rect
            x="10"
            y="36"
            width="60"
            height="46"
            rx="12"
            fill={lockColor}
            style={{ transition: 'fill 0.3s ease' }}
          />

          {/* Anahtar Deliği (Keyhole) */}
          <circle cx="40" cy="54" r="4.5" fill="#ffffff" />
          <rect x="38.5" y="54" width="3" height="11" rx="1.5" fill="#ffffff" />
        </svg>
      </div>

      {/* Durum Bildirimi */}
      <div style={{ minHeight: '26px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {status === 'success' && (
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#006c49' }}>
            ✓ Giriş Başarılı — Kilit Açıldı
          </span>
        )}
        {status === 'error' && (
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#ba1a1a' }}>
            ✕ Hatalı Giriş — Kilit Sarsıldı
          </span>
        )}
        {status === 'idle' && (
          <span style={{ fontSize: '13px', fontWeight: '500', color: '#94a3b8' }}>
            Kilit Kapalı (Bekleniyor)
          </span>
        )}
      </div>

      {/* Butonlar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={handleSuccess}
          className="btn-success"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '12px',
            backgroundColor: '#006c49',
            color: '#ffffff',
            border: 'none',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 108, 73, 0.25)',
            transition: 'all 0.2s ease'
          }}
        >
          Doğru Giriş Yap
        </button>

        <button
          onClick={handleError}
          className="btn-error"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '12px',
            backgroundColor: '#ba1a1a',
            color: '#ffffff',
            border: 'none',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(186, 26, 26, 0.25)',
            transition: 'all 0.2s ease'
          }}
        >
          Yanlış Giriş Yap
        </button>

        {status !== 'idle' && (
          <button
            onClick={handleReset}
            className="btn-reset"
            style={{
              background: 'none',
              border: 'none',
              padding: '6px',
              fontSize: '12px',
              fontWeight: '500',
              color: '#64748b',
              cursor: 'pointer',
              marginTop: '4px',
              transition: 'color 0.2s ease'
            }}
          >
            Sıfırla
          </button>
        )}
      </div>
    </div>
  );
}
`,
  },
  mobileCode: {
    filename: "SmartLockInput.native.tsx",
    dependencies: {
      "react-native-reanimated": "~3.16.0",
    },
    code: `import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export default function SmartLockMobile() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const shackleRotation = useSharedValue(0);
  const shackleY = useSharedValue(0);
  const shakeX = useSharedValue(0);

  const handleSuccess = () => {
    setStatus('success');
    shackleY.value = withSpring(-16);
    shackleRotation.value = withSpring(-24);
  };

  const handleError = () => {
    setStatus('error');
    shackleY.value = withSpring(0);
    shackleRotation.value = withSpring(0);
    shakeX.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(-8, { duration: 50 }),
      withTiming(8, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  };

  const handleReset = () => {
    setStatus('idle');
    shackleY.value = withSpring(0);
    shackleRotation.value = withSpring(0);
  };

  const shackleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: shackleY.value },
      { rotate: \`\${shackleRotation.value}deg\` },
    ],
  }));

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const isUnlocked = status === 'success';
  const lockColor = isUnlocked ? '#006c49' : status === 'error' ? '#ba1a1a' : '#2196F3';

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, shakeStyle]}>
        <Text style={styles.title}>Akıllı Kilit Simülasyonu</Text>
        <Text style={styles.subtitle}>Animasyonu tetiklemek için butonlara basın.</Text>

        {/* Padlock */}
        <View style={styles.lockArea}>
          <Animated.View style={[styles.shackle, shackleStyle, { borderColor: lockColor }]} />
          <View style={[styles.lockBody, { backgroundColor: lockColor }]}>
            <View style={styles.keyholeTop} />
            <View style={styles.keyholeBottom} />
          </View>
        </View>

        {/* Durum Bildirimi */}
        <View style={styles.statusBox}>
          <Text style={[styles.statusText, { color: lockColor }]}>
            {status === 'success'
              ? '✓ Giriş Başarılı — Kilit Açıldı'
              : status === 'error'
              ? '✕ Hatalı Giriş — Kilit Sarsıldı'
              : 'Kilit Kapalı (Hazır)'}
          </Text>
        </View>

        {/* Butonlar */}
        <View style={styles.btnGroup}>
          <Pressable style={[styles.button, styles.btnSuccess]} onPress={handleSuccess}>
            <Text style={styles.btnText}>Doğru Giriş Yap</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.btnError]} onPress={handleError}>
            <Text style={styles.btnText}>Yanlış Giriş Yap</Text>
          </Pressable>
          {status !== 'idle' && (
            <Pressable onPress={handleReset} style={styles.resetBtn}>
              <Text style={styles.resetText}>Sıfırla</Text>
            </Pressable>
          )}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b0d13',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 20,
    backgroundColor: '#161a26',
    borderWidth: 1,
    borderColor: '#232838',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  lockArea: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  shackle: {
    width: 32,
    height: 42,
    borderWidth: 6,
    borderBottomWidth: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: -6,
  },
  lockBody: {
    width: 56,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyholeTop: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  keyholeBottom: {
    width: 4,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#ffffff',
    marginTop: -2,
  },
  statusBox: {
    height: 24,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  btnGroup: {
    width: '100%',
    gap: 10,
  },
  button: {
    width: '100%',
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSuccess: {
    backgroundColor: '#006c49',
  },
  btnError: {
    backgroundColor: '#ba1a1a',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  resetBtn: {
    marginTop: 4,
    alignItems: 'center',
  },
  resetText: {
    color: '#94a3b8',
    fontSize: 11,
  },
});
`,
  },
};
