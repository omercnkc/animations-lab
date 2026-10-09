import { ComponentItem } from "../../schema";

export const smartLockInput: ComponentItem = {
  id: "smart-lock-input",
  slug: "smart-lock-input",
  title: "Interactive Padlock & Password Validator",
  category: "inputs",
  description: "An animated padlock with realistic shackle pivot rotation, shake on error, and live rule-based password strength validation.",
  tags: ["authentication", "inputs", "padlock", "validation", "shake-animation", "password-strength"],
  featured: true,
  webCode: {
    filename: "SmartLockInput.tsx",
    dependencies: {
      "lucide-react": "^0.475.0",
      "framer-motion": "^12.0.0",
    },
    code: `'use client';

import React, { useState } from 'react';

const colors = {
  primary: '#2196F3',
  primaryDark: '#0D47A1',
  tertiary: '#006c49',
  warning: '#d97706',
  error: '#ba1a1a',
};

const rules = [
  { id: 'length', text: 'En az 8 karakter uzunluğunda olmalı', test: (pw: string) => pw.length >= 8 },
  { id: 'upper', text: 'En az 1 büyük harf içermeli', test: (pw: string) => /[A-Z]/.test(pw) },
  { id: 'number', text: 'En az 1 rakam içermeli', test: (pw: string) => /[0-9]/.test(pw) },
  { id: 'special', text: 'En az 1 özel karakter (@, #, $, vb.)', test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
];

export default function SmartLockInputDemo() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [password, setPassword] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });
  const [animState, setAnimState] = useState<'idle' | 'shake' | 'bounce' | 'unlock'>('idle');
  const [registerFailed, setRegisterFailed] = useState(false);

  const handleLogin = () => {
    if (password === 'Core2026!') {
      setStatusMsg({ text: 'Giriş başarılı! Kilit açıldı.', type: 'success' });
      setAnimState('unlock');
    } else if (password.length === 0) {
      setStatusMsg({ text: 'Lütfen şifrenizi girin.', type: 'warning' });
      setAnimState('bounce');
      setTimeout(() => setAnimState('idle'), 300);
    } else {
      setStatusMsg({ text: 'Hatalı şifre. (İpucu: Core2026!)', type: 'error' });
      setAnimState('shake');
      setTimeout(() => setAnimState('idle'), 500);
    }
  };

  const handleRegister = () => {
    const validCount = rules.filter((r) => r.test(password)).length;
    if (validCount === 4) {
      setStatusMsg({ text: 'Harika! Şifreniz başarıyla oluşturuldu.', type: 'success' });
      setRegisterFailed(false);
    } else {
      setStatusMsg({ text: 'Lütfen tüm şifre kurallarını karşılayın.', type: 'error' });
      setRegisterFailed(true);
      setAnimState('shake');
      setTimeout(() => setAnimState('idle'), 500);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setStatusMsg({ text: '', type: '' });
    setRegisterFailed(false);
    if (mode === 'login' && animState === 'unlock') {
      setAnimState('idle');
    }
  };

  let lockColor = colors.primary;
  if (statusMsg.type === 'success') lockColor = colors.tertiary;
  if (statusMsg.type === 'error') lockColor = colors.error;
  if (statusMsg.type === 'warning') lockColor = colors.warning;

  const validCount = rules.filter((r) => r.test(password)).length;
  const strengthPercent = password.length === 0 ? 0 : (validCount / 4) * 100;
  let strengthColor = '#CBD5E1';
  if (password.length > 0) {
    if (validCount === 1) strengthColor = colors.error;
    else if (validCount === 2 || validCount === 3) strengthColor = colors.warning;
    else if (validCount === 4) strengthColor = colors.tertiary;
  }

  return (
    <div className="flex w-full items-center justify-center p-4">
      <style>{\`
        @keyframes custom-shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: custom-shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      \`}</style>

      <div className="w-full max-w-[400px] rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-6 shadow-xl transition-all">
        {/* Sekme Geçişleri */}
        <div className="mb-6 flex rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] p-1">
          <button
            className={\`flex-1 rounded-lg py-2 text-xs font-semibold transition-all \${
              mode === 'login'
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)]'
            }\`}
            onClick={() => {
              setMode('login');
              setPassword('');
              setStatusMsg({ text: '', type: '' });
              setAnimState('idle');
            }}
          >
            Giriş Yap
          </button>
          <button
            className={\`flex-1 rounded-lg py-2 text-xs font-semibold transition-all \${
              mode === 'register'
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)]'
            }\`}
            onClick={() => {
              setMode('register');
              setPassword('');
              setStatusMsg({ text: '', type: '' });
            }}
          >
            Kayıt Ol
          </button>
        </div>

        {/* Başlık Alanı */}
        <div className="mb-5 text-center">
          <h2 className="text-lg font-bold text-[var(--color-text-main)]">
            {mode === 'login' ? 'Sisteme Giriş Yap' : 'Güvenli Şifre Oluştur'}
          </h2>
          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            {mode === 'login'
              ? 'Devam etmek için şifrenizi girin.'
              : 'Hesabınızı korumak için güçlü bir şifre belirleyin.'}
          </p>
        </div>

        {/* GİRİŞ MODU */}
        {mode === 'login' && (
          <div>
            {/* Animasyonlu Kilit Bölümü */}
            <div
              className={\`mb-6 flex h-20 flex-col items-center justify-end transition-transform \${
                animState === 'shake' ? 'animate-shake' : ''
              }\`}
            >
              <div className="relative flex flex-col items-center">
                {/* Kilit Halkası */}
                <div
                  className="absolute z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{
                    width: '28px',
                    height: '36px',
                    top: '-26px',
                    transformOrigin: '15% 100%',
                    transform:
                      animState === 'unlock'
                        ? 'translateY(-14px) rotate(-22deg)'
                        : animState === 'bounce'
                        ? 'translateY(4px)'
                        : 'translateY(0)',
                  }}
                >
                  <div
                    className="relative h-[32px] w-full rounded-t-xl border-[5px] border-b-0 transition-colors duration-300"
                    style={{ borderColor: lockColor }}
                  >
                    <div className="absolute -bottom-[4px] -right-[5px] h-[7px] w-[5px] bg-[var(--color-bg-panel)]" />
                  </div>
                  <div
                    className="absolute bottom-[-8px] left-0 h-[12px] w-[5px] rounded-b-sm transition-colors duration-300"
                    style={{ backgroundColor: lockColor }}
                  />
                </div>

                {/* Kilit Gövdesi */}
                <div
                  className="relative z-20 flex h-10 w-14 flex-col items-center justify-center rounded-lg shadow-sm transition-colors duration-300"
                  style={{ backgroundColor: lockColor }}
                >
                  <div className="relative z-30 h-2 w-2 rounded-full bg-white" />
                  <div className="relative z-30 -mt-0.5 h-2.5 w-1 rounded-b-sm bg-white" />
                </div>
              </div>
            </div>

            {/* Input Alanı */}
            <div className="relative mb-4">
              <input
                type={isRevealed ? 'text' : 'password'}
                className="w-full rounded-xl border border-[var(--color-border-medium)] bg-[var(--color-bg-page)] py-3 pl-3.5 pr-10 text-xs text-[var(--color-text-main)] outline-none transition-all focus:border-[var(--color-primary)]"
                placeholder="Şifreniz (Deneme: Core2026!)"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
                onClick={() => setIsRevealed(!isRevealed)}
              >
                {isRevealed ? '🙈' : '👁️'}
              </button>
            </div>

            <button
              className="w-full rounded-xl py-3 text-xs font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: lockColor }}
              onClick={handleLogin}
            >
              {statusMsg.type === 'success' ? 'Sisteme Giriliyor...' : 'Giriş Yap'}
            </button>
          </div>
        )}

        {/* KAYIT MODU */}
        {mode === 'register' && (
          <div>
            <div className={\`relative mb-4 \${animState === 'shake' ? 'animate-shake' : ''}\`}>
              <input
                type={isRevealed ? 'text' : 'password'}
                className="w-full rounded-xl border border-[var(--color-border-medium)] bg-[var(--color-bg-page)] py-3 pl-3.5 pr-10 text-xs text-[var(--color-text-main)] outline-none transition-all focus:border-[var(--color-primary)]"
                placeholder="Yeni şifrenizi girin"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
                onClick={() => setIsRevealed(!isRevealed)}
              >
                {isRevealed ? '🙈' : '👁️'}
              </button>
            </div>

            {/* Güç Çubuğu */}
            <div className="mb-4">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-border-subtle)]">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: \`\${strengthPercent}%\`, backgroundColor: strengthColor }}
                />
              </div>
            </div>

            {/* Kural Listesi */}
            <ul className="mb-6 space-y-2">
              {rules.map((rule, idx) => {
                const isValid = rule.test(password);
                const isFailed = registerFailed && !isValid;
                return (
                  <li
                    key={idx}
                    className={\`flex items-center text-xs font-medium transition-colors \${
                      isValid ? 'text-emerald-600 dark:text-emerald-400' : isFailed ? 'text-rose-600 dark:text-rose-400' : 'text-[var(--color-text-secondary)]'
                    }\`}
                  >
                    <span className="mr-2 font-bold">{isValid ? '✓' : '•'}</span>
                    {rule.text}
                  </li>
                );
              })}
            </ul>

            <button
              className="w-full rounded-xl bg-[var(--color-primary)] py-3 text-xs font-semibold text-white shadow-md transition-all hover:bg-[var(--color-primary-hover)] active:scale-[0.98]"
              onClick={handleRegister}
            >
              Şifreyi Kaydet
            </button>
          </div>
        )}

        {/* Mesaj Kutusu */}
        {statusMsg.text && (
          <div
            className={\`mt-4 rounded-xl border p-2.5 text-center text-xs font-semibold \${
              statusMsg.type === 'error'
                ? 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300'
                : statusMsg.type === 'success'
                ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300'
            }\`}
          >
            {statusMsg.text}
          </div>
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
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export default function SmartLockMobile() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const shackleRotation = useSharedValue(0);
  const shackleY = useSharedValue(0);
  const shakeX = useSharedValue(0);

  const handleTest = () => {
    if (password === 'Core2026!') {
      setUnlocked(true);
      shackleY.value = withSpring(-14);
      shackleRotation.value = withSpring(-22);
    } else {
      setUnlocked(false);
      shackleY.value = withSpring(0);
      shackleRotation.value = withSpring(0);
      shakeX.value = withSequence(
        withTiming(-8, { duration: 60 }),
        withTiming(8, { duration: 60 }),
        withTiming(-6, { duration: 60 }),
        withTiming(6, { duration: 60 }),
        withTiming(0, { duration: 60 })
      );
    }
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

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, shakeStyle]}>
        {/* Padlock */}
        <View style={styles.lockArea}>
          <Animated.View style={[styles.shackle, shackleStyle]} />
          <View style={[styles.lockBody, { backgroundColor: unlocked ? '#006c49' : '#2196F3' }]} />
        </View>

        <Text style={styles.title}>Akıllı Kilit Testi</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Şifre (Core2026!)"
          placeholderTextColor="#71717a"
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={styles.button} onPress={handleTest}>
          <Text style={styles.btnText}>Kilidi Aç</Text>
        </Pressable>
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
  lockArea: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  shackle: {
    width: 28,
    height: 36,
    borderWidth: 5,
    borderBottomWidth: 0,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderColor: '#2196F3',
    marginBottom: -4,
  },
  lockBody: {
    width: 50,
    height: 34,
    borderRadius: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },
  input: {
    width: '100%',
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#30374c',
    backgroundColor: '#0b0d13',
    paddingHorizontal: 14,
    color: '#ffffff',
    marginBottom: 16,
    fontSize: 14,
  },
  button: {
    width: '100%',
    height: 44,
    borderRadius: 12,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
`,
  },
};
