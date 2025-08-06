// components/ScreenLayout.tsx
import React from 'react';
import { View } from 'react-native';
import { SafeAreaWrapper } from './safeArea';

interface ScreenLayoutProps {
  children: React.ReactNode;
  withFooter?: boolean;
}

export const ScreenLayout = ({ children}: ScreenLayoutProps) => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaWrapper 
        style={{ 
          paddingBottom: undefined, 
          flex: 1 
        }}
      >
        {children}
      </SafeAreaWrapper>
    
    </View>
  );
};