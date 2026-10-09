'use client';

import React from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { useTheme } from '@/components/theme/theme-provider';

interface SandpackWebProps {
  filename: string;
  code: string;
  dependencies?: Record<string, string>;
}

export function SandpackWeb({ filename, code, dependencies }: SandpackWebProps) {
  const { theme } = useTheme();

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-xl transition-colors">
      <Sandpack
        template="react-ts"
        theme={theme === 'dark' ? 'dark' : 'light'}
        options={{
          showNavigator: false,
          showTabs: true,
          showLineNumbers: true,
          closableTabs: false,
          editorHeight: 480,
          autorun: true,
        }}
        customSetup={{
          dependencies: {
            "framer-motion": "^12.0.0",
            "lucide-react": "^0.475.0",
            ...(dependencies || {}),
          },
        }}
        files={{
          [`/App.tsx`]: {
            code: `import React from 'react';
import DemoComponent from './${filename.replace(/\.(tsx|ts|js|jsx)$/, '')}';

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '${theme === 'dark' ? '#0b0d13' : '#ffffff'}',
      color: '${theme === 'dark' ? '#f8fafc' : '#1e293b'}',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      padding: '24px'
    }}>
      <DemoComponent />
    </div>
  );
}
`,
          },
          [`/${filename}`]: {
            code: code,
            active: true,
          },
        }}
      />
    </div>
  );
}
