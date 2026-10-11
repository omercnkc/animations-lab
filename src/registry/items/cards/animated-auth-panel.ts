import { ComponentItem } from "../../schema";

export const animatedAuthPanel: ComponentItem = {
  id: "animated-auth-panel",
  slug: "animated-auth-panel",
  title: "Animated Split Auth Card",
  category: "cards",
  description: "A modern split-screen authentication card featuring floating glowing orbs, SVG grid background, staggered feature reveals, and smooth Login/Register state transitions.",
  tags: ["auth", "login", "register", "floating-orbs", "split-card", "framer-motion"],
  featured: true,
  webCode: {
    filename: "AnimatedAuthPanel.tsx",
    dependencies: {
      "framer-motion": "^12.0.0",
      "lucide-react": "^0.475.0",
    },
    code: `'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Users, Shield, Mail, Lock, User, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

export default function AnimatedAuthPanelDemo() {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          const baseWidth = 720;
          const computedScale = Math.min((width - 12) / baseWidth, 1);
          setScale(Math.max(computedScale, 0.38));
        }
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2400);
    }, 1200);
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: \`\${Math.round(480 * scale)}px\`,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        userSelect: 'none',
        overflow: 'hidden',
        padding: '8px 0',
      }}
    >
      <style>{\`
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.45; }
          50% { transform: translate(14px, 12px) scale(1.3); opacity: 0.75; }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1.25); opacity: 0.65; }
          50% { transform: translate(-14px, -12px) scale(0.95); opacity: 0.35; }
        }
        @keyframes spinRings {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .auth-input:focus {
          border-color: #4f46e5 !important;
          background-color: #ffffff !important;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15) !important;
        }
      \`}</style>

      {/* Split Card Container (Scale to Fit) */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '720px',
        minHeight: '480px',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.18)',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        transform: \`scale(\${scale})\`,
        transformOrigin: 'center center',
        transition: 'transform 0.15s ease-out',
        flexShrink: 0,
      }}>
        
        {/* Sol Panel: Marka, Hareketli Orblar & Özellikler */}
        <div style={{
          flex: '1.1',
          position: 'relative',
          background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 50%, #6366f1 100%)',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#ffffff',
          overflow: 'hidden',
        }}>
          {/* Arka Plan Izgara Çizgileri */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none' }}>
            <svg style={{ width: '100%', height: '100%' }}>
              <defs>
                <pattern id="grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>

          {/* Yüzen Parlayan Orblar (GPU Donanım Hızlandırmalı) */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '-50px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'rgba(199, 210, 254, 0.45)',
            filter: 'blur(54px)',
            pointerEvents: 'none',
            animation: 'floatOrb1 6s ease-in-out infinite',
            willChange: 'transform',
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: '-60px',
            right: '-60px',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'rgba(165, 180, 252, 0.38)',
            filter: 'blur(58px)',
            pointerEvents: 'none',
            animation: 'floatOrb2 8s ease-in-out infinite',
            willChange: 'transform',
          }} />

          {/* Dönen Konsantrik Dekoratif Çemberler */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            opacity: 0.22,
            pointerEvents: 'none',
            animation: 'spinRings 24s linear infinite',
            willChange: 'transform',
          }}>
            <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
              <circle cx="75" cy="75" r="64" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="75" cy="75" r="46" stroke="white" strokeWidth="1" />
              <circle cx="75" cy="75" r="28" stroke="white" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Marka Başlığı */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}>
                <Sparkles size={22} color="#4f46e5" />
              </div>
              <span style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px' }}>Meet.ai</span>
            </div>
          </div>

          {/* Ana Mesaj */}
          <div style={{ position: 'relative', zIndex: 10, margin: '32px 0' }}>
            <motion.h2
              key={isRegister ? 'reg' : 'login'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{ fontSize: '30px', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.5px', margin: 0 }}
            >
              {isRegister ? 'Geleceğe Katılın.' : 'Yapay Zeka ile Tanışın.'}
            </motion.h2>
            <p style={{ marginTop: '10px', fontSize: '14px', lineHeight: 1.6, opacity: 0.85, margin: '10px 0 0 0' }}>
              {isRegister
                ? 'Dakikalar içinde hesabınızı açın, yapay zeka asistanlarıyla toplantı veriminizi katlayın.'
                : 'Toplantılarınızı otomatik özetleyen ve aksiyon planı çıkaran yeni nesil iş zekası platformu.'}
            </p>
          </div>

          {/* Özellikler */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: Sparkles, text: 'Otomatik Toplantı Özetleri' },
              { icon: Users, text: 'Takım İşbirliği & Canlı Transkript' },
              { icon: Shield, text: 'Uçtan Uca Kurumsal Güvenlik' },
            ].map((feat, i) => (
              <motion.div
                key={feat.text}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.08 }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', opacity: 0.95 }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}>
                  <feat.icon size={16} color="#ffffff" />
                </div>
                <span>{feat.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sağ Panel: İnteraktif Giriş / Kayıt Formu */}
        <div style={{
          flex: '1',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
        }}>
          {/* Mod Değiştirici Butonlar */}
          <div style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '24px',
            border: '1px solid #e2e8f0',
          }}>
            <button
              onClick={() => { setIsRegister(false); setSuccess(false); }}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: !isRegister ? '#ffffff' : 'transparent',
                color: !isRegister ? '#4f46e5' : '#64748b',
                boxShadow: !isRegister ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              Giriş Yap
            </button>
            <button
              onClick={() => { setIsRegister(true); setSuccess(false); }}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: isRegister ? '#ffffff' : 'transparent',
                color: isRegister ? '#4f46e5' : '#64748b',
                boxShadow: isRegister ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              Kayıt Ol
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isRegister ? 'register' : 'login'}
              initial={{ opacity: 0, x: isRegister ? 16 : -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRegister ? -16 : 16 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  {isRegister ? 'Hesap Oluşturun' : 'Tekrar Hoş Geldiniz'}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', margin: '4px 0 0 0' }}>
                  {isRegister ? 'Bilgilerinizi girerek saniyeler içinde başlayın.' : 'Lütfen hesabınıza giriş yapın.'}
                </p>
              </div>

              {isRegister && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Ad Soyad</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px' }} />
                    <input
                      type="text"
                      required
                      placeholder="Ahmet Yılmaz"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="auth-input"
                      style={{
                        width: '100%',
                        height: '42px',
                        paddingLeft: '40px',
                        paddingRight: '14px',
                        borderRadius: '10px',
                        border: '1.5px solid #e2e8f0',
                        backgroundColor: '#f8fafc',
                        fontSize: '13px',
                        color: '#0f172a',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>E-Posta Adresi</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px' }} />
                  <input
                    type="email"
                    required
                    placeholder="ornek@meet.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                    style={{
                      width: '100%',
                      height: '42px',
                      paddingLeft: '40px',
                      paddingRight: '14px',
                      borderRadius: '10px',
                      border: '1.5px solid #e2e8f0',
                      backgroundColor: '#f8fafc',
                      fontSize: '13px',
                      color: '#0f172a',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Şifre</label>
                  {!isRegister && (
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#4f46e5', cursor: 'pointer' }}>
                      Şifremi unuttum?
                    </span>
                  )}
                </div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px' }} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                    style={{
                      width: '100%',
                      height: '42px',
                      paddingLeft: '40px',
                      paddingRight: '14px',
                      borderRadius: '10px',
                      border: '1.5px solid #e2e8f0',
                      backgroundColor: '#f8fafc',
                      fontSize: '13px',
                      color: '#0f172a',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  />
                </div>
              </div>

              {/* Aksiyon Butonu */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: '8px',
                  width: '100%',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: success ? '#059669' : '#4f46e5',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: success ? '0 4px 14px rgba(5, 150, 105, 0.35)' : '0 4px 14px rgba(79, 70, 229, 0.3)',
                }}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : success ? (
                  <>
                    <CheckCircle2 size={16} color="#ffffff" />
                    <span>Başarıyla Giriş Yapıldı!</span>
                  </>
                ) : (
                  <>
                    <span>{isRegister ? 'Hesap Oluştur' : 'Giriş Yap'}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
`,
  },
  mobileCode: {
    filename: "AnimatedAuthPanel.native.tsx",
    dependencies: {
      "react-native-reanimated": "~3.16.0",
      "lucide-react-native": "^0.475.0",
    },
    code: `import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react-native';

export default function AnimatedAuthPanelNative() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const orbScale = useSharedValue(1);

  React.useEffect(() => {
    orbScale.value = withRepeat(
      withTiming(1.25, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const orbStyle = useAnimatedStyle(() => ({
    transform: [{ scale: orbScale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Top Banner with Floating Orbs */}
      <View style={styles.banner}>
        <Animated.View style={[styles.orb, orbStyle]} />
        <View style={styles.brandRow}>
          <View style={styles.brandIcon}>
            <Sparkles size={20} color="#4648d4" />
          </View>
          <Text style={styles.brandTitle}>Meet.ai</Text>
        </View>
        <Text style={styles.bannerHeadline}>
          {isRegister ? 'Geleceğe Katılın' : 'Yapay Zeka ile Tanışın'}
        </Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Mode Switcher */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, !isRegister && styles.activeTab]}
            onPress={() => setIsRegister(false)}
          >
            <Text style={[styles.tabText, !isRegister && styles.activeTabText]}>
              Giriş Yap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, isRegister && styles.activeTab]}
            onPress={() => setIsRegister(true)}
          >
            <Text style={[styles.tabText, isRegister && styles.activeTabText]}>
              Kayıt Ol
            </Text>
          </TouchableOpacity>
        </View>

        {/* Inputs */}
        <View style={styles.inputWrapper}>
          <Mail size={18} color="#94a3b8" />
          <TextInput
            placeholder="E-Posta"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Lock size={18} color="#94a3b8" />
          <TextInput
            placeholder="Şifre"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="#94a3b8"
          />
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
          </Text>
          <ArrowRight size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
  },
  banner: {
    backgroundColor: '#4648d4',
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  brandIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  bannerHeadline: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
  formContainer: {
    padding: 24,
    gap: 14,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  activeTabText: {
    color: '#4648d4',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
  },
  button: {
    backgroundColor: '#4648d4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
`,
  },
};
