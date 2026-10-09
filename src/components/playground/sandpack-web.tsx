'use client';

import React from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';

interface SandpackWebProps {
  filename: string;
  code: string;
  dependencies?: Record<string, string>;
}

export function SandpackWeb({ filename, code, dependencies }: SandpackWebProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl">
      <Sandpack
        template="react-ts"
        theme="dark"
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
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
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
