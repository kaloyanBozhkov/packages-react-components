import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppRegistry } from 'react-native';
import WebDotsLoader from '../src/components/atoms/DotsLoader';
import { DotsLoader as NativeDotsLoader } from '../src/native';
import '../dist/styles.css';

// Register the native component for web
AppRegistry.registerComponent('NativeDotsLoader', () => NativeDotsLoader);

const Demo = () => {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui' }}>
      <h1 style={{ marginBottom: '40px' }}>DotsLoader Comparison</h1>
      
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>Web Version (Tailwind)</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ padding: '20px', background: '#333', borderRadius: '8px' }}>
            <div style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>primary</div>
            <WebDotsLoader modifier="primary" size="md" />
          </div>
          <div style={{ padding: '20px', background: '#333', borderRadius: '8px' }}>
            <div style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>primaryBordered</div>
            <WebDotsLoader modifier="primaryBordered" size="md" />
          </div>
          <div style={{ padding: '20px', background: '#eee', borderRadius: '8px' }}>
            <div style={{ color: 'black', marginBottom: '10px', fontSize: '12px' }}>secondary</div>
            <WebDotsLoader modifier="secondary" size="md" />
          </div>
          <div style={{ padding: '20px', background: '#eee', borderRadius: '8px' }}>
            <div style={{ color: 'black', marginBottom: '10px', fontSize: '12px' }}>tertiary</div>
            <WebDotsLoader modifier="tertiary" size="md" />
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: '20px' }}>Native Version (React Native Web)</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ padding: '20px', background: '#333', borderRadius: '8px' }}>
            <div style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>primary</div>
            <NativeDotsLoader modifier="primary" size="md" />
          </div>
          <div style={{ padding: '20px', background: '#333', borderRadius: '8px' }}>
            <div style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>primaryBordered</div>
            <NativeDotsLoader modifier="primaryBordered" size="md" />
          </div>
          <div style={{ padding: '20px', background: '#eee', borderRadius: '8px' }}>
            <div style={{ color: 'black', marginBottom: '10px', fontSize: '12px' }}>secondary</div>
            <NativeDotsLoader modifier="secondary" size="md" />
          </div>
          <div style={{ padding: '20px', background: '#eee', borderRadius: '8px' }}>
            <div style={{ color: 'black', marginBottom: '10px', fontSize: '12px' }}>tertiary</div>
            <NativeDotsLoader modifier="tertiary" size="md" />
          </div>
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<Demo />);

